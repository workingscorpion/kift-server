import Koa from 'koa';
import {route, GET, DELETE, POST, PUT} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import mongodb from 'mongodb';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface Teeth {
    childrenId?: string;
    description?: string;
    isCreatedTime?: string;
}

@route('/api/v1/teeth')
export default class TeethAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
    }

    @route('/create')
    @POST()
    async create(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col.insert({
                childrenId: body.childrenId,
                description: body.description,
                isCreatedTime: body.isCreatedTime
            });
            ctx.response.body = result;
            ctx.response.status = HttpStatus.OK;
        });
    }

    //모든 치아 정보 보기
    @route('/lists')
    @GET()
    async list(ctx: Koa.Context) {
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col.find({}).toArray();
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //아이 하나의 정보 보기
    @route('/list')
    @GET()
    async read(ctx: Koa.Context) {
        const query = ctx.request.query;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col.find({childrenId: query.childrenId}, {sort: {isCreatedTime: 1}}).toArray();
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/update')
    @POST()
    async update(ctx: Koa.Context) {
        const body = ctx.request.body;
        const updatequery = JSON.parse(JSON.stringify(body));
        delete updatequery._id;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col.findOneAndUpdate(
                {_id: new mongodb.ObjectId(body._id)},
                {
                    $set: updatequery
                }
            );
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/delete/:id')
    @DELETE()
    async delete(ctx: Koa.Context) {
        const params = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col.remove({_id: new mongodb.ObjectID(params.id)});
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}
