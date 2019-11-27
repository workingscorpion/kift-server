import Koa from 'koa';
import {route, GET, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface UserList {
    email?: string;
    name?: string;
    isMale?: Boolean;
    joindate?: Date;
}

interface User {
    email?: string;
    pw?: string;
    joindate?: Date;
    name?: string;
    birth?: Date;
    isMale?: Boolean;
    address?: string;
}

/**
 *
 * @api {get} /api/v1/admin/queryuser userlist
 * @apiName queryuser
 * @apiGroup Owners
 *
 * @api {get} /api/v1/admin/queryuser/:user userdata
 * @apiName querysuser
 * @apiGroup Owners
 *
 * @api {get} /api/v1/admin/shutdown shutdown
 * @apiName shutdown
 * @apiGroup Owners
 */

@route('/api/v1/admin')
export default class AdminAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
    }

    @route('/queryuser')
    @GET()
    async queryuser(ctx: Koa.Context) {
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<UserList>(DBService.UserCollection);
            const results = await col.find({}).toArray();
            console.log('results.length :', results.length);
            ctx.response.body = {results};
            // ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            ctx.set('Access-Control-Allow-Origin', '*');
            // ctx.set('Access-COntrol-Allow-Credentials', 'true');

            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/queryuser/:email')
    @GET()
    async querysuser(ctx: Koa.Context) {
        // #TODO: 특정 유저의 정보를 가져오는 routing
        const params = ctx.params;
        console.log('params :', params);
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);
            const result1 = await col.findOne({email: params.email});
            const col1 = await db.collection<User>(DBService.ChildrenCollection);
            let result2;
            let result;
            if (result1) {
                result2 = {childrenInfo: await col1.find({parent: result1.email}).toArray()};
                console.log('result2 :', result2);
                // result = JSON.stringify(result1) + `,{"children": "${result2}"}`;
                // result = JSON.parse(JSON.stringify(result1) + `{children: ${result2}}`);
                result = Object.assign(result1, result2);
            }
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/search/:payload')
    @GET()
    async search(ctx: Koa.Context) {
        // #TODO: 특정 유저의 정보를 가져오는 routing
        const params = ctx.params;
        const query = ctx.request.query;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);
            let result;
            // if (params.payload.indexOf('@') === -1) {
            if (query.searchWay === 'name') {
                result = await col.find({name: new RegExp(params.payload)}).toArray();
            } else if (query.searchWay === 'email') {
                result = await col.find({email: new RegExp(params.payload)}).toArray();
            }
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
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
