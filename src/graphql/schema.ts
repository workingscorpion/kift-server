import { gql, makeExecutableSchema, PubSub } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { AwilixContainer, asValue } from 'awilix';
import { GraphQLResolver } from './resolver';
import { ResolverModules } from '../modules';

export function constructGraphQLSChema(container: AwilixContainer): GraphQLSchema {

    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`

    scalar Upload

    type Query {
        member(id: Int): Member
        memberByEmail(email: String): Member
        members: [Member]

        messages(boardId: String!, offset: Int, limit: Int): MessageListResult
        messageBoardInfo(boardId: String!): BoardInfoResult
        message(id: Int!): MessageResult

        webLoggingEnabled: Boolean
        webLogs: [String]

        uploads: [File]

        setting(key: String!): String
        settings: [Setting]
    }

    type Mutation {
        login(email: String!, password: String!): LoginResult

        addMember(email: String!, name: String!, password: String!, phone: String): MemberResult
        updateMember(id: Int!, name: String, password: String): MemberResult

        uploadMessage(boardId: String!, subject: String!, content: String!): MessageResult
        updateMessage(id: Int!, subject: String, content: String): MessageResult
        removeMessage(id: Int!): SimpleResult

        setWebLoggingEnabled(enabled: Boolean): BooleanValueResult
        addWebLog(log: String): SimpleResult

        upload(file: Upload!): File!

        setSetting(key: String!, value: String!): SettingResult

        clearDb: SimpleResult
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

    type LoginResult implements Result {
        error: Int
        data: Member
        token: String
    }

    type MemberResult implements Result {
        error: Int
        data: Member
    }

    type MessageListResult implements Result {
        error: Int
        messages: [Message]
    }

    type BoardInfoResult implements Result {
        error: Int
        count: Int
    }

    type Message {
        id: Int
        subject: String
        content: String
        date: Int
    }

    type MessageResult implements Result {
        error: Int
        message: Message
    }

    type Setting {
        key: String
        value: String
    }

    type SettingResult implements Result {
        error: Int
        data: Setting
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    `;

    const pubsub = new PubSub();
    container.register('pubSub', asValue(pubsub));

    // Provide resolver functions for your schema fields
    function createResolver(name: keyof ResolverModules) {
        return async (root: any, args: any, context: any) => {
            const resolver = container.resolve(name) as GraphQLResolver;
            return await resolver.resolve(context, args);
        };
    }

    const resolvers = {
        Query: {
            member: createResolver('memberResolver'),
            memberByEmail: createResolver('memberByEmailResolver'),
            members: createResolver('membersResolver'),
            messages: createResolver('messageListResolver'),
            messageBoardInfo: createResolver('messageBoardInfoResolver'),
            message: createResolver('messageDataResolver'),
            webLoggingEnabled: createResolver('webLoggingEnabledResolver'),
            webLogs: createResolver('webLogsResolver'),
            setting: createResolver('settingResolver'),
            settings: createResolver('settingsResolver'),
        },
        Mutation: {
            login: createResolver('loginResolver'),
            addMember: createResolver('addMemberResolver'),
            updateMember: createResolver('updateMemberResolver'),
            addWebLog: createResolver('addWebLogResolver'),
            uploadMessage: createResolver('uploadMessageResolver'),
            updateMessage: createResolver('updateMessageResolver'),
            removeMessage: createResolver('removeMessageResolver'),
            upload: createResolver('uploadResolver'),
            setWebLoggingEnabled: createResolver('setWebLoggingEnabledResolver'),
            setSetting: createResolver('setSettingResolver'),
            clearDb: createResolver('clearDbResolver'),
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
