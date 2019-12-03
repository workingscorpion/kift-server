import Koa from 'koa';
import {route, GET, DELETE, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import mongodb from 'mongodb';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface Board {
    _id?: mongodb.ObjectID;
    title?: string;
    description?: string;
    writer?: string;
    writedate?: number;
    fix?: Boolean;
}

@route('/api/v1/board')
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
            const col = await db.collection<Board>(DBService.BoardCollection);
            const result = await col.insert({
                title: body.title,
                description: body.description,
                writer: body.writer,
                writedate: Date.now(),
                fix: body.fix === 'true' ? true : false
            });
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //공지사항 목록을 위한 리스트 생성 for 관리자
    @route('/adlist')
    @GET()
    async adlist(ctx: Koa.Context) {
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            const result = await col
                .find({})
                .sort({writedate: -1})
                .toArray();
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
            ctx.set('Access-Control-Allow-Origin', '*');
        });
    }

    @route('/list')
    @GET()
    async list(ctx: Koa.Context) {
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            const result = await col
                .find({}, {projection: {title: 1, writedate: 1}})
                .sort({writedate: -1})
                .toArray();
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
            ctx.set('Access-Control-Allow-Origin', '*');
        });
    }

    //공지사항 상세보기
    @route('/read/:id')
    @GET()
    async read(ctx: Koa.Context) {
        const {id} = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            const result = await col.findOne({_id: new mongodb.ObjectId(id)});
            ctx.set('Access-Control-Allow-Origin', '*');
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
            const col = await db.collection<Board>(DBService.BoardCollection);
            await col.findOneAndUpdate(
                {_id: new mongodb.ObjectId(params.id)},
                {
                    $set: {
                        title: body.title,
                        description: body.description,
                        writer: body.writer,
                        // writedate: Date.now(),
                        fix: body.fix === 'true' ? true : false
                    }
                }
            );
            const result = await col.findOne({_id: new mongodb.ObjectId(params.id)});
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //상세보기에서 삭제할 경우
    @route('/delete/:id')
    @DELETE()
    async deleteone(ctx: Koa.Context) {
        const params = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            const result = await col.remove({_id: new mongodb.ObjectId(params.id)});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //리스트에서 삭제할 경우
    @route('/delete')
    @DELETE()
    async delete(ctx: Koa.Context) {
        const {id} = ctx.request.query;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            for (let i in id) {
                await col.remove({_id: new mongodb.ObjectId(id[i])});
            }
            const result = await col.find({}).toArray();
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}
