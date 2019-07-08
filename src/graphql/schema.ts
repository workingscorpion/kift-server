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

        setting(key: String!): String
        settings: [Setting]
    }

    type Mutation {
        addMember(email: String!, name: String!, password: String!, phone: String): MemberResult

        setWebLoggingEnabled(enabled: Boolean): BooleanValueResult
        addWebLog(log: String): SimpleResult

        setSetting(key: String!, value: String!): SettingResult
    }

    type Subscription {
        webLoggingEnabled: Boolean
        webLogAdded: String

        settingChanged(key: String!): String
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

    type Setting {
        key: String
        value: String
    }

    type SettingResult implements Result {
        error: Int
        data: Setting
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
            setting: createResolver('settingResolver'),
            settings: createResolver('settingsResolver'),
        },
        Mutation: {
            addMember: createResolver('addMemberResolver'),
            addWebLog: createResolver('addWebLogResolver'),
            setWebLoggingEnabled: createResolver('setWebLoggingEnabledResolver'),
            setSetting: createResolver('setSettingResolver'),
        },
        Subscription: {
            webLoggingEnabled: {
                subscribe: () => pubsub.asyncIterator('webLoggingEnabled')
            },
            webLogAdded: {
                subscribe: () => pubsub.asyncIterator('webLogAdded')
            },
            settingChanged: {
                subscribe: (context: any, { key }: { key: string }) => pubsub.asyncIterator(`settingChanged_${key}`)
            }
        }
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    return schema;
}

// 테스트 쿼리들
export const QueryMemberByEmail = `# 멤버 조회 쿼리 예시
query {
    memberByEmail(email: "foo@email.com") {
        id
        email
        name
    }
}`;

export const QuerySettings = `# 설정 조회 쿼리 예시
query {
    setting(key: "AdminEmail")
    
    settings {
        key
        value
    }
}`;
