import Koa from 'koa';
import {route, GET, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {DBServiceClient, AppServerClient} from '../modules';
import {AppServer} from '../server';
import {MongoClient, Db, Collection, Cursor} from 'mongodb';

type MyDependencies = DBServiceClient & AppServerClient;

interface inbody {
    id: string;
    childNum?: number;
    height?: number;
    weight?: number;
    BMI?: number;
    headround?: number;
    sight?: number;
    waist?: number;
    foot?: number;
    bodyfat?: number;
    muscle?: number;
    Moisture?: number;
    protein?: number;
    internalfat?: number;
    metabolism?: number;
    bonemass?: number;
}

const DBUrl = 'mongodb://localhost:27017';
const DB = 'macpie';
const CollectionName = 'inbody';

@route('/api/v1/data')
export default class DataControlAPI implements MyDependencies {
    constructor({dbService, appServer}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
    }

    @route('/insert')
    @POST()
    async insert(ctx: Koa.Context) {
        const body = ctx.request.body;
        const client = await MongoClient.connect(DBUrl);
        const db = await client.db(DB);
        const col = await db.collection<inbody>(CollectionName);
        const result = await col.insert({
            id: body.id,
            childNum: body.childNum,
            height: body.height,
            weight: body.weight,
            BMI: body.BMI,
            headround: body.headround,
            sight: body.sight,
            waist: body.waist,
            foot: body.foot,
            bodyfat: body.bodyfat,
            muscle: body.muscle,
            Moisture: body.Moisture,
            protein: body.protein,
            internalfat: body.internalfat,
            metabolism: body.metabolism,
            bonemass: body.bonemass
        });
        ctx.response.body = {result};
        ctx.response.status = HttpStatus.OK;
    }

    @route('/query')
    @POST()
    async query(ctx: Koa.Context) {
        const {id} = ctx.request.body;
        const {childNum} = ctx.request.body;
        const client = await MongoClient.connect(DBUrl);
        const db = await client.db(DB);
        const col = await db.collection<inbody>(CollectionName);
        const result = await col.find({id: id, childNum: childNum});
        console.log('result :', result);
        ctx.response.body = {result};
        ctx.response.status = HttpStatus.OK;
    }

    @route('/update')
    @POST()
    async update(ctx: Koa.Context) {
        const {id} = ctx.request.body;
        const {pw} = ctx.request.body;
        const client = await MongoClient.connect(DBUrl);
        const db = await client.db(DB);
        const col = await db.collection<inbody>(CollectionName);
        // const result = await col.insert({id: id, pw: pw});
        // console.log('result :', result);
        // ctx.response.body = {result};
        ctx.response.status = HttpStatus.OK;
    }

    @route('/delete')
    @POST()
    async delete(ctx: Koa.Context) {
        // const {id} = ctx.request.body;
        const body = ctx.request.body;
        const client = await MongoClient.connect(DBUrl);
        const db = await client.db(DB);
        const col = await db.collection<inbody>(CollectionName);
        const result = await col.insert({
            id: body.id,
            childNum: body.childNum,
            height: body.height,
            weight: body.weight,
            BMI: body.BMI,
            headround: body.headround,
            sight: body.sight,
            waist: body.waist,
            foot: body.foot
        });
        console.log('result :', result);
        ctx.response.body = {result};
        ctx.response.status = HttpStatus.OK;
    }

    dbService: DBService;
    appServer: AppServer;
}
