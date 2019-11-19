import Koa from 'koa';
import {route, GET} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {DBServiceClient, AppServerClient} from '../modules';
import {AppServer} from '../server';

type MyDependencies = DBServiceClient & AppServerClient;

@route('/api/v1/admin')
export default class AdminAPI implements MyDependencies {
    constructor({dbService, appServer}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
    }

    // #TODO: 한 번 호출하면 잘 종료가 안되고, 두 번 호출해야 종료 되는데 이유 조사할 것.
    @route('/shutdown')
    @GET()
    async shutdown(ctx: Koa.Context) {
        this.appServer.httpServer!.close(async () => {
            process.exit(0);
        });
        ctx.response.body = {};
        ctx.response.status = HttpStatus.OK;
    }

    dbService: DBService;
    appServer: AppServer;
}
