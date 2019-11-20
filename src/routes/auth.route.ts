import Koa from 'koa';
import {route, GET, POST, PUT, findControllers, DELETE} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import {MongoClient, Db, Collection, Cursor} from 'mongodb';
import {requiredSubselectionMessage} from 'graphql/validation/rules/ScalarLeafs';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface UserAuth {
    id?: string;
    pw?: string;
}

@route('/api/v1/auth')
export default class AuthAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
        this.DBUrl = 'mongodb://' + this.envService.get().DB_HOST + ':' + this.envService.get().DB_PORT;
        this.DB = this.envService.get().DB_NAME;
        this.CollectionName = 'user';
    }

    DBUrl: string;
    DB: string;
    CollectionName: string;

    @route('/join')
    @POST()
    async join(ctx: Koa.Context) {
        const {id} = ctx.request.body;
        const {pw} = ctx.request.body;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection<UserAuth>(this.CollectionName);
        const result = await col.insert({id: id, pw: pw});
        ctx.response.body = {result};
        ctx.response.status = HttpStatus.OK;
    }

    @route('/login')
    @POST()
    async login(ctx: Koa.Context) {
        const {id} = ctx.request.body;
        const {pw} = ctx.request.body;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection(this.CollectionName);
        const result = await col.findOne({id: id});
        ctx.response.body = pw === result.pw ? 'true' : 'false';
        ctx.response.status = HttpStatus.OK;
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}
