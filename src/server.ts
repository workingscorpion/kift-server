import Koa from 'koa';
import {Server} from 'http';
import {AwilixContainer} from 'awilix';
import {scopePerRequest, loadControllers} from 'awilix-koa';
import {ApolloServer} from 'apollo-server-koa';
import {execute, subscribe} from 'graphql';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import jwt from 'koa-jwt';
import {EnvService} from './services/env.service';
import {DBService} from './services/db.service';
import {constructGraphQLSChema} from './graphql/schema';
import {TestQueries} from './graphql/testqueries';
import cors from 'koa-cors';
// import bodyParser from 'body-parser';
import * as bodyparser from 'koa-bodyparser';
// import * as cors from '@koa/cors';

export class AppServer {
    constructor({envService, dbService}: any) {
        this.envService = envService;
        this.dbService = dbService;
    }

    async start(container: AwilixContainer) {
        const schema = constructGraphQLSChema(container);
        const server = new ApolloServer({
            schema,
            context: async ({ctx}) => {
                return {
                    user: ctx ? (ctx.state ? ctx.state.user : undefined) : undefined
                };
            },
            playground: {
                endpoint: '/graphql',
                subscriptionEndpoint: '/subscriptions',
                tabs: [
                    // playground 각 탭에 종류별 테스트 쿼리를 띄운다.
                    {
                        endpoint: '/graphql',
                        query: TestQueries.MutationLogin
                    },
                    {
                        endpoint: '/graphql',
                        query: TestQueries.QueryMemberByEmail
                    },
                    {
                        endpoint: '/graphql',
                        query: TestQueries.QueryMessages
                    },
                    {
                        endpoint: '/graphql',
                        query: TestQueries.MutationUploadMessages
                    },
                    {
                        endpoint: '/graphql',
                        query: TestQueries.MutationUpdateMessages
                    },
                    {
                        endpoint: '/graphql',
                        query: TestQueries.QuerySettings
                    },
                    {
                        endpoint: '/graphql',
                        query: TestQueries.MutationCreateTestMembers
                    },
                    {
                        endpoint: '/graphql',
                        query: TestQueries.MutationUpdateMember,
                        headers: {
                            Authorization:
                                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AZW1haWwuY29tIiwiaWF0IjoxNTYyNjcxNzg3LCJleHAiOjE1OTQyMDc3ODd9.vPinSTiWyrkY3xZ2P8Du4JnBwBkMhd7nfmgeDYzvLMA'
                        }
                    }
                ]
            }
        });
        this.apolloServer = server;

        const app = new Koa();

        app.use(
            jwt({
                passthrough: true,
                secret: this.envService.get().SECRET_KEY
            })
        );

        app.use(bodyparser.default());
        app.use(scopePerRequest(container));
        app.use(loadControllers('routes/*.route.js', {cwd: __dirname}));

        server.applyMiddleware({app});
        // alternatively you can get a composed middleware from the apollo server
        // app.use(server.getMiddleware());

        // 테스트 모드일 때는 포트를 열지 않는다. Apollo 테스트 도구는 포트를 거치지 않고 직접 쿼리를 호출하기 때문에 필요가 없고,
        // 포트 충돌이 발생한다.
        if (!this.envService.isTestMode()) {
            const ws = app.listen({port: this.envService.get().PORT}, () => {
                const msg =
                    'Macpie-Tech Server starts! ' +
                    ` (NODE_ENV: ${process.env.NODE_ENV}, port: ${this.envService.get().PORT}, GraphQL Endpoint: ${server.graphqlPath}), BodyData: ${this.envService.get().BODYDATA_PATH}`;
                console.log(msg);

                new SubscriptionServer(
                    {
                        execute,
                        subscribe,
                        schema
                    },
                    {
                        server: ws,
                        path: '/subscriptions'
                    }
                );
            });
            this.httpServer = ws;
        }

        if (this.envService.isDevelopmentMode()) {
            // const option: cors.CorsOptions = {
            //     origin: '*',
            //     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
            //     methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']
            // };
            app.use(
                cors({
                    origin: '*',
                    headers: 'Origin, X-Requested-With, Content-Type, Accept',
                    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']
                })
            );
            // app.use(cors(option));
        }

        process.title = this.envService.get().APP_TITLE + `${process.env.NODE_ENV} - ${this.envService.get().PORT}`;
    }

    public httpServer: Server | undefined;
    public apolloServer: ApolloServer | undefined;
    envService: EnvService;
    dbService: DBService;
}
