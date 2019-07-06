import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { AwilixContainer } from 'awilix';
import { constructGraphQLSChema } from './graphql/schema';
import { EnvService } from './services/env.service';
import { DBService } from './services/db.service';

export class AppServer {

    constructor({ envService, dbService }: any) {
        this.envService = envService;
        this.dbService = dbService;
    }

    async start(container: AwilixContainer) {

        const server = new ApolloServer({ schema: constructGraphQLSChema(container) });

        const app = new Koa();
        server.applyMiddleware({ app });
        // alternatively you can get a composed middleware from the apollo server
        // app.use(server.getMiddleware());

        app.listen({ port: this.envService.get().PORT }, () => {
            const msg = 'Typescript + Koa + Apollo API Server starts!' + 
                ` (NODE_ENV: ${process.env.NODE_ENV}, port: ${this.envService.get().PORT}, GraphQL Endpoint: ${server.graphqlPath})`;
            console.log(msg);
        });

        process.title = this.envService.get().APP_TITLE + `${process.env.NODE_ENV} - ${this.envService.get().PORT}`;
    }
    
    envService: EnvService;
    dbService: DBService;
}
