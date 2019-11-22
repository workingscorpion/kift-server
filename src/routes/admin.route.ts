import Koa from 'koa';
import {route, GET, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import {MongoClient} from 'mongodb';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface UserList {
    email?: string;
}

@route('/api/v1/admin')
export default class AdminAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
        this.DBUrl = 'mongodb://' + this.envService.get().DB_HOST + ':' + this.envService.get().DB_PORT;
        this.DB = this.envService.get().DB_NAME;
        this.CollectionName = '';
    }

    DBUrl: string;
    DB: string;
    CollectionName: string;

    @route('/queryuser')
    @GET()
    async queryuser(ctx: Koa.Context) {
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        this.CollectionName = 'user';
        const col = await db.collection<UserList>(this.CollectionName);
        const results = await col.find({}).toArray();
        const result = results.map(doc => doc.email);
        ctx.response.body = {result};
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.response.status = HttpStatus.OK;
    }

    @route('/queryuser/:user')
    @GET()
    async querysuser(ctx: Koa.Context) {
        // #TODO: 특정 유저의 정보를 가져오는 routing
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
    envService: EnvService;
}
