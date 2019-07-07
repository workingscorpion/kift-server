import { gql, makeExecutableSchema, PubSub } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { AwilixContainer, asValue } from 'awilix';
import { GraphQLResolver } from './resolver';
import { ResolverModules } from '../modules';

export function constructGraphQLSChema(container: AwilixContainer): GraphQLSchema {

    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
    type Query {
        member(id: Int): Member
        memberByEmail(email: String): Member
        members: [Member]

        webLoggingEnabled: Boolean
        webLogs: [String]
    }

    type Mutation {
        addMember(email: String!, name: String!, password: String!, phone: String): MemberResult

        setWebLoggingEnabled(enabled: Boolean): BooleanValueResult
        addWebLog(log: String): SimpleResult
    }

    type Subscription {
        webLoggingEnabled: Boolean
        webLogAdded: String
    }

    interface Result {
        error: Int
    }

    type SimpleResult implements Result {
        error: Int
    }

    type BooleanValueResult implements Result {
        error: Int
        value: Boolean
    }

    type Member {
        id: Int
        email: String
        name: String
    }

    type MemberResult implements Result {
        error: Int
        data: Member
    }
    `;

    const pubsub = new PubSub();
    container.register('pubSub', asValue(pubsub));

    // Provide resolver functions for your schema fields
    function createResolver(name: keyof ResolverModules) {
        return async (context: any, args: any) => {
            const resolver = container.resolve(name) as GraphQLResolver;
            return await resolver.resolve(args);
        };
    }

    const resolvers = {
        Query: {
            member: createResolver('memberResolver'),
            memberByEmail: createResolver('memberByEmailResolver'),
            members: createResolver('membersResolver'),
            webLoggingEnabled: createResolver('webLoggingEnabledResolver'),
            webLogs: createResolver('webLogsResolver'),
        },
        Mutation: {
            addMember: createResolver('addMemberResolver'),
            addWebLog: createResolver('addWebLogResolver'),
            setWebLoggingEnabled: createResolver('setWebLoggingEnabledResolver'),
        },
        Subscription: {
            webLoggingEnabled: {
                subscribe: () => pubsub.asyncIterator('webLoggingEnabled')
            },
            webLogAdded: {
                subscribe: () => pubsub.asyncIterator('webLogAdded')
            },
        }
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    return schema;
}
