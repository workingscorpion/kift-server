import Koa from 'koa';
import {route, GET, POST, PUT, findControllers, DELETE} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import {MongoClient, Db, Collection, Cursor} from 'mongodb';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface User {
    email?: string;
    pw?: string;
    joindate?: number;
    name?: string;
    birth?: string;
    isMale?: boolean;
    address?: string;
}

/**
 * @api {post} /api/v1/auth/join sign up
 * @apiName join
 * @apiGroup Owners
 *
 * @api {post} /api/v1/auth/login login check
 * @apiName login
 * @apiGroup Owners
 *
 * @api {post} /api/v1/auth/signout signout
 * @apiName signout
 * @apiGroup Owners
 *
 */

@route('/api/v1/auth')
export default class AuthAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
        this.DBUrl = 'mongodb://' + this.envService.get().DB_HOST + ':' + this.envService.get().DB_PORT;
        this.DB = this.envService.get().DB_NAME;
        this.CollectionName = 'magpie';
    }

    DBUrl: string;
    DB: string;
    CollectionName: string;

    @route('/join')
    @POST()
    async join(ctx: Koa.Context) {
        const body = ctx.request.body;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection<User>(this.CollectionName);

        const findResult = await col.findOne({email: body.email});
        console.log('findResult :', findResult);
        if (findResult) {
            if (findResult.email === body.email) {
                console.log('check');
                ctx.response.body = '해당 계정이 이미 존재합니다.';
                ctx.response.status = HttpStatus.OK;
            }
        } else {
            console.log('else2');
            const result = await col.insert({email: body.email, pw: body.pw, name: body.name, birth: body.birth, isMale: body.isMale, address: body.address, joindate: Date.now()});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        }
    }

    @route('/login')
    @POST()
    async login(ctx: Koa.Context) {
        const body = ctx.request.body;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection(this.CollectionName);
        const result = await col.findOne({email: body.email});
        ctx.response.body = body.pw === result.pw ? 'true' : 'false';
        ctx.response.status = HttpStatus.OK;
    }

    @route('/signout')
    @POST()
    async signout(ctx: Koa.Context) {
        const body = ctx.request.body;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection(this.CollectionName);
        const result = await col.findOne({email: body.email});
        ctx.response.body = body.pw === result.pw ? 'true' : 'false';
        ctx.response.status = HttpStatus.OK;
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}
