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
    _id: mongodb.ObjectID;
    title: string;
    description?: string;
    writer: string;
    writedate: number;
    fix: Boolean;
    count: number;
    isDeletedTime?: number;
    isCreatedTime?: number;
    isUpdatedTime?: number;
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
                fix: body.fix,
                count: 0
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
            // let result = await col.find({}).toArray();
            const trueresults = {trueresult: await col.find({fix: true, isDeletedTime: undefined}, {sort: {writedate: -1}}).toArray()};
            const allresults = {allresults: await col.find({isDeletedTime: undefined}, {sort: {writedate: -1}}).toArray()};
            const result = Object.assign(trueresults, allresults);
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
            const trueresults = {trueresult: await col.find({fix: true, isDeletedTime: undefined}, {projection: {title: 1, writedate: 1}, sort: {writedate: -1}}).toArray()};
            const allresults = {allresult: await col.find({isDeletedTime: undefined}, {projection: {title: 1, writedate: 1}, sort: {writedate: -1}}).toArray()};

            const result = Object.assign(trueresults, allresults);
            ctx.set('Access-Control-Allow-Origin', '*');
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
            const col = await db.collection<Board>(DBService.BoardCollection);
            await col.updateOne({_id: new mongodb.ObjectId(id)}, {$inc: {count: 1}});
            const result = await col.findOne({_id: new mongodb.ObjectId(id)});
            ctx.set('Access-Control-Allow-Origin', '*');
            console.log('result :', result);
            const finalresult = result;
            ctx.response.body = {finalresult};
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
            await col.updateOne(
                {_id: new mongodb.ObjectId(params.id)},
                {
                    $set: {
                        title: body.title,
                        description: body.description,
                        writer: body.writer,
                        fix: body.fix,
                        isUpdatedTime: Date.now()
                    }
                }
            );
            const result = await col.find({}, {sort: {writedate: -1}}).toArray();
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
            const result = await col.updateOne({_id: new mongodb.ObjectId(params.id)}, {$set: {isDeletedTime: Date.now()}});
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //리스트에서 삭제할 경우
    @route('/delete')
    @POST()
    async delete(ctx: Koa.Context) {
        ctx.set('Access-Control-Allow-Origin', '*');
        const body = ctx.request.body;
        console.log('body :', body);
        console.log('typeof body :', typeof body);
        // console.log('typeof body.deletelist :', typeof body.deletelist);
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Board>(DBService.BoardCollection);
            for (let oid in body) {
                console.log('oid :', oid);
                console.log('body[oid] :', body[oid]);
                await col.update({_id: new mongodb.ObjectId(body[oid])}, {$set: {isDeletedTime: Date.now()}});
            }
            const trueresults = {trueresult: await col.find({fix: true, isDeletedTime: undefined}, {sort: {writedate: -1}}).toArray()};
            const allresults = {allresults: await col.find({isDeletedTime: undefined}, {sort: {writedate: -1}}).toArray()};
            const result = Object.assign(trueresults, allresults);
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}
