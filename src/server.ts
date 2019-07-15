import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import { AwilixContainer } from 'awilix';
import { GraphQLResolver } from './graphql/resolver';
import { ResolverModules } from './modules';
import { EnvService } from './services/env.service';
import { DBService } from './services/db.service';

export class AppServer {

    constructor({ envService, dbService }: any) {
        this.envService = envService;
        this.dbService = dbService;
    }

    async start(container: AwilixContainer) {
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

        function createResolver(name: keyof ResolverModules) {
            return async (context: any, args: any) => {
                const resolver = container.resolve(name) as GraphQLResolver;
                return await resolver.resolve(args);
            };
        }

        // Provide resolver functions for your schema fields
        const resolvers = {
            Query: {
                member: createResolver('memberResolver'),
                memberByEmail: createResolver('memberByEmailResolver'),
                members: createResolver('membersResolver'),
            },
            Mutation: {
                addMember: createResolver('addMemberResolver'),
            }
        };

        const server = new ApolloServer({ typeDefs, resolvers });

        const app = new Koa();
        server.applyMiddleware({ app });
        // alternatively you can get a composed middleware from the apollo server
        // app.use(server.getMiddleware());

        app.listen({ port: this.envService.get().PORT }, () => {
            console.log(`Typescript + Koa + Apollo API Server starts! (NODE_ENV: ${process.env.NODE_ENV}, port: ${this.envService.get().PORT}, GraphQL Endpoint: ${server.graphqlPath})`);
        });

        process.title = this.envService.get().APP_TITLE + `${process.env.NODE_ENV} - ${this.envService.get().PORT}`;
    }
    
    envService: EnvService;
    dbService: DBService;
}