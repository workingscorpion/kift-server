import Koa from 'koa';
import {route, GET, POST, DELETE} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import {MongoClient} from 'mongodb';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface Inbody {
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

@route('/api/v1/data')
export default class DataControlAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
        this.DBUrl = 'mongodb://' + this.envService.get().DB_HOST + ':' + this.envService.get().DB_PORT;
        this.DB = this.envService.get().DB_NAME;
        this.CollectionName = 'inbody';
    }

    DBUrl: string;
    DB: string;
    CollectionName: string;

    @route('/insert')
    @POST()
    async insert(ctx: Koa.Context) {
        const body = ctx.request.body;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection<Inbody>(this.CollectionName);
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
    @GET()
    async query(ctx: Koa.Context) {
        const {id} = ctx.request.query;
        const {childNum} = ctx.request.query;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection<Inbody>(this.CollectionName);
        const result = await col.findOne({id: id, childNum: childNum});
        ctx.response.body = {result};
        ctx.response.status = HttpStatus.OK;
    }

    @route('/update')
    @POST()
    async update(ctx: Koa.Context) {
        const body = ctx.request.body;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection<Inbody>(this.CollectionName);
        const result = await col.findOneAndUpdate(
            {id: body.id, childNum: body.childNum},
            {
                $set: {
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
                }
            }
        );
        ctx.response.body = {result};
        ctx.response.status = HttpStatus.OK;
    }

    //추후에 리코드를 뿌려줄때 ID도 같이 보내줬다가 삭제할때 RecordID도 같이 받아서 해당 리코드만 삭제할 수 있게 수정
    //현재는 한 아이의 정보를 통째로 삭제하도록 작성
    @route('/delete')
    @DELETE()
    async delete(ctx: Koa.Context) {
        const body = ctx.request.query;
        const client = await MongoClient.connect(this.DBUrl);
        const db = await client.db(this.DB);
        const col = await db.collection<Inbody>(this.CollectionName);
        const result = await col.remove({id: body.id, childNum: body.childNum});
        ctx.response.body = {result};
        ctx.response.status = HttpStatus.OK;
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}
