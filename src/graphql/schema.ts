import { gql, makeExecutableSchema } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { AwilixContainer } from 'awilix';
import { GraphQLResolver } from './resolver';
import { ResolverModules } from '../modules';

export function constructGraphQLSChema(container: AwilixContainer): GraphQLSchema {

    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
    type Query {
        member(id: Int): Member
        memberByEmail(email: String): Member
        members: [Member]
    }

    type Member {
        id: Int
        email: String
        name: String
    }

    type Mutation {
        addMember(email: String!, name: String!, password: String!, phone: String): MemberResult
    }

    interface Result {
        error: Int
    }

    type MemberResult implements Result {
        error: Int
        data: Member
    }
    `;

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
        },
        Mutation: {
            addMember: createResolver('addMemberResolver'),
        },
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    return schema;
}
