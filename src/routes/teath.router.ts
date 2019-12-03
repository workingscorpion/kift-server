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
    _id?: mongodb.ObjectID;
    title?: string;
    writedate?: number;
}

@route('/api/v1/teeth')
export default class BoardAPI implements MyDependencies {
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
                title: body.title,
                writedate: Date.now()
            });
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/list')
    @GET()
    async list(ctx: Koa.Context) {
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col
                .find({}, {projection: {title: 1, writedate: 1}})
                .sort({writedate: -1})
                .toArray();
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //공지사항 상세보기
    @route('/read/:id')
    @GET()
    async read(ctx: Koa.Context) {
        const {id} = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col.findOne({_id: new mongodb.ObjectId(id)});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/update/:id')
    @POST()
    async update(ctx: Koa.Context) {
        const params = ctx.params;
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col.findOneAndUpdate(
                {_id: new mongodb.ObjectId(params.id)},
                {
                    $set: {
                        _id: new mongodb.ObjectID('id'),
                        title: body.title,
                        writedate: Date.now()
                    }
                }
            );
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //상세보기에서 삭제할 경우
    @route('/delete/?id')
    @DELETE()
    async delete(ctx: Koa.Context) {
        const params = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const result = await col.remove({_id: new mongodb.ObjectID(params.id)});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}
