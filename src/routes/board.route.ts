import Koa from 'koa';
import {route, GET, DELETE, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface Board {
    _id?: string;
    title?: string;
    description?: string;
    writer?: string;
    writedate?: number;
    fix?: Boolean;
}

/**
 *
 * @api {get} /api/v1/admin/queryuser userlist
 * @apiName queryuser
 * @apiGroup Owners
 *
 */

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
        });
    }

    //공지사항 상세보기
    @route('/read/:id')
    @GET()
    async read(ctx: Koa.Context) {
        const params = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            const result = await col.findOne({_id: params.id});
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
            const result = await col.findOneAndUpdate(
                {_id: params.id},
                {
                    $set: {
                        title: body.title,
                        description: body.description,
                        writer: body.writer,
                        writedate: Date.now(),
                        fix: body.fix === 'true' ? true : false
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
    async deleteone(ctx: Koa.Context) {
        const params = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            const result = await col.remove({_id: params.id});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //리스트에서 삭제할 경우
    @route('/delete')
    @DELETE()
    async delete(ctx: Koa.Context) {
        const params = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            const result = await col.remove({_id: params.id});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}