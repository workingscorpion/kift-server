import Koa from 'koa';
import { AwilixContainer } from 'awilix';
import { ApolloServer } from 'apollo-server-koa';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import jwt from 'koa-jwt';
import { constructGraphQLSChema, QueryMemberByEmail, QuerySettings, MutationLogin, MutationCreateTestMembers, MutationUpdateMember } from './graphql/schema';
import { EnvService } from './services/env.service';
import { DBService } from './services/db.service';

export class AppServer {

    constructor({ envService, dbService }: any) {
        this.envService = envService;
        this.dbService = dbService;
    }

    async start(container: AwilixContainer) {

        const schema = constructGraphQLSChema(container);
        const server = new ApolloServer({ schema, 
            context: async ({ ctx }) => {
                return {
                    user: ctx ? ctx.state ? ctx.state.user : undefined : undefined
                };
            },
            playground: {
            endpoint: '/graphql',
            subscriptionEndpoint: '/subscriptions',
            tabs: [ // playground 각 탭에 종류별 테스트 쿼리를 띄운다.
                {
                    endpoint: '/graphql',
                    query: MutationLogin,
                },
                {
                    endpoint: '/graphql',
                    query: QueryMemberByEmail,
                },
                {
                    endpoint: '/graphql',
                    query: QuerySettings
                },
                {
                    endpoint: '/graphql',
                    query: MutationCreateTestMembers,
                },
                {
                    endpoint: '/graphql',
                    query: MutationUpdateMember,
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AZW1haWwuY29tIiwiaWF0IjoxNTYyNjcxNzg3LCJleHAiOjE1OTQyMDc3ODd9.vPinSTiWyrkY3xZ2P8Du4JnBwBkMhd7nfmgeDYzvLMA"
                    }
                }
            ],
        }, });

        const app = new Koa();

        app.use(jwt({
            passthrough: true,
            secret: this.envService.get().SECRET_KEY,
        }));

        server.applyMiddleware({ app });
        // alternatively you can get a composed middleware from the apollo server
        // app.use(server.getMiddleware());

        const ws = app.listen({ port: this.envService.get().PORT }, () => {
            const msg = 'Typescript + Koa + Apollo API Server starts!' + 
                ` (NODE_ENV: ${process.env.NODE_ENV}, port: ${this.envService.get().PORT}, GraphQL Endpoint: ${server.graphqlPath})`;
            console.log(msg);

            new SubscriptionServer({
                execute, subscribe, schema
            }, {
                server: ws,
                path: '/subscriptions'
            });
        });

        process.title = this.envService.get().APP_TITLE + `${process.env.NODE_ENV} - ${this.envService.get().PORT}`;
    }
    
    envService: EnvService;
    dbService: DBService;
}
