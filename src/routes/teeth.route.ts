import Koa from 'koa';
import {route, GET, DELETE, POST, PUT} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import mongodb from 'mongodb';
import {get} from 'http';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface Teeth {
    isUp?: boolean;
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
                isUp: body.isUp === 'true' ? true : false,
                childrenId: body.childrenId,
                description: body.description,
                isCreatedTime: body.isCreatedTime
            });
            ctx.response.body = result;
            ctx.response.status = HttpStatus.OK;
        });
    }

    //모든 치아 정보 보기(관리자)
    @route('/lists')
    @GET()
    async list(ctx: Koa.Context) {
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const col1 = await db.collection(DBService.ChildrenCollection);
            const result1 = await col.find({}).toArray();
            let result = [];
            for (let i = 0; i < result1.length; i++) {
                const result2 = await col1.findOne({_id: new mongodb.ObjectId(result1[i].childrenId)}, {projection: {parent: 1, name: 1}});
                result.push(Object.assign(result2, result1[i]));
                console.log('result :', result);
            }
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
            const result = await col.updateOne(
                {_id: new mongodb.ObjectId(body._id)},
                {
                    $set: updatequery
                }
            );
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
            console.log('params.id :', params.id);
            const result = await col.remove({_id: new mongodb.ObjectID(params.id)});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/search/:payload')
    @GET()
    async search(ctx: Koa.Context) {
        console.log('search');
        const params = ctx.params;
        const {searchWay} = ctx.request.query;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Teeth>(DBService.TeethCollection);
            const col1 = await db.collection(DBService.ChildrenCollection);
            console.log('params :', params);
            console.log('searchWay :', searchWay);
            let result1;
            let result2;
            let result = [];
            if (searchWay === 'description') {
                result1 = await col.find({description: new RegExp(params.payload)}).toArray();
                for (let i = 0; i < result1.length; i++) {
                    const result2 = await col1.find({_id: new mongodb.ObjectId(result1[i].childrenId)}, {projection: {parent: 1, name: 1}}).toArray();
                    console.log('result2 in for :', result2);
                    if (result2) {
                        for (let j = 0; j < result2.length; j++) {
                            result.push(Object.assign(result2[j], result1[i]));
                            console.log('result :', result);
                        }
                    }
                }
            } else {
                if (searchWay === 'childrenName') {
                    result2 = await col1.find({name: new RegExp(params.payload)}, {projection: {parent: 1, name: 1}}).toArray();
                } else {
                    result2 = await col1.find({parent: new RegExp(params.payload)}, {projection: {parent: 1, name: 1}}).toArray();
                }
                console.log('result2 :', result2);

                for (let i = 0; i < result2.length; i++) {
                    // console.log('result2[i]._id :', result2[i]._id);
                    // console.log('typesof result2[i]._id :', typeof String(result2[i]._id));
                    const result1 = await col.find({childrenId: String(result2[i]._id)}).toArray();
                    if (result1) {
                        for (let j = 0; j < result1.length; j++) {
                            console.log('result1 :', result1);
                            result.push(Object.assign(result2[i], result1[j]));
                            console.log('result :', result);
                        }
                    }
                }
            }

            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}
