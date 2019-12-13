import Koa from 'koa';
import {route, GET, POST, DELETE} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import multer from 'koa-multer';
import mongodb from 'mongodb';
import {Http2Stream} from 'http2';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface Inbody {
    // email: string;
    childrenId?: string;
    height?: number;
    weight?: number;
    BMI?: number;
    BPD?: number;
    sight?: object;
    waist?: number;
    foot?: number;
    bodyFatRate?: number;
    muscleRate?: number;
    bodyWaterRate?: number;
    protein?: number;
    visceralFat?: number;
    BMR?: number;
    bonemass?: number;
    measureTime?: number;
}

interface Children {
    parent?: string;
    name?: string;
    // measureTime?: number;
}

@route('/api/v1/data')
export default class DataAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;

        const storageImage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, `${this.envService.get().UPLOAD_DIR}/`);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            }
        });
        this.singleUploadMiddleware = multer({storage: storageImage}).single('file');
    }

    @route('/create')
    @POST()
    async create(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            //추후 비만 여부를 확인하기 위해 성별을 가져올 구문
            // const findcol = await db.collection('user');
            // const findresult = await findcol.findOne({email: body.email}).then(json => json.isMale);
            // console.log('findresult :', findresult);
            // if(findresult === true){

            // }
            const col = await db.collection<Inbody>(DBService.InbodyCollection);
            console.log('body :', body);
            const result = await col.insert({
                childrenId: body.childrenId,
                height: Number(body.height),
                weight: Number(body.weight),
                BMI: Number((body.weight / (body.height * 0.01 * (body.height * 0.01))).toFixed(2)),
                BPD: Number(body.BPD),
                sight: {left: Number(body.leftSight), right: Number(body.rightSight)},
                waist: Number(body.waist),
                foot: Number(body.foot),
                bodyFatRate: Number(body.bodyFatRate),
                muscleRate: Number(body.muscleRate),
                bodyWaterRate: Number(body.bodyWaterRate),
                protein: Number(body.protein),
                visceralFat: Number(body.visceralFat),
                BMR: Number(body.BMR),
                bonemass: Number(body.bonemass),
                measureTime: Date.now()
            });
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/list')
    @GET()
    async list(ctx: Koa.Context) {
        console.log('data list');
        await this.dbService.performWithDB(async db => {
            // const col = await db.collection(DBService.ChildrenCollection);
            // const result = await col
            //     .aggregate([{$project: {_id: {$toString: '$_id'}, parent: 1, name: 1}}, {$lookup: {from: DBService.InbodyCollection, localField: '_id', foreignField: 'childrenId', as: 'inbodydata'}}])
            //     .toArray();
            const col = await db.collection(DBService.InbodyCollection);
            const result = await col
                .aggregate([
                    {$project: {childrenId: {$toObjectId: '$childrenId'}, measureTime: 1}},
                    {$lookup: {from: DBService.ChildrenCollection, localField: 'childrenId', foreignField: '_id', as: 'childrenData'}}
                ])
                .toArray();
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/select')
    @GET()
    async select(ctx: Koa.Context) {
        const query = ctx.request.query;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Inbody>(DBService.InbodyCollection);
            const col1 = await db.collection<Children>(DBService.ChildrenCollection);
            let result;
            const result1 = await col.findOne({_id: new mongodb.ObjectId(query.id)});
            // console.log('result1 :', result1);
            if (result1) {
                const result2 = await col1.findOne({_id: new mongodb.ObjectId(result1.childrenId)});
                // console.log('result2 :', result2);

                if (result2) {
                    result = await Object.assign(result1, {name: `${result2.name}`});
                    result = await Object.assign(result1, {parent: `${result2.parent}`});
                }
            }
            // console.log('result :', result);
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/read/:payload')
    @GET()
    async read(ctx: Koa.Context) {
        const params = ctx.params;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Inbody>(DBService.InbodyCollection);
            const result = await col.find({childrenId: params.payload}).toArray();
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/update')
    @POST()
    async update(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Inbody>(DBService.InbodyCollection);
            const result = await col.updateOne({email: body.childrenId, childrenId: body.childrenId}, {$set: {body, measureTime: Date.now()}});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    //추후에 리코드를 뿌려줄때 ID도 같이 보내줬다가 삭제할때 RecordID도 같이 받아서 해당 리코드만 삭제할 수 있게 수정
    //현재는 한 아이의 정보를 통째로 삭제하도록 작성
    @route('/delete')
    @DELETE()
    async delete(ctx: Koa.Context) {
        const body = ctx.request.query;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Inbody>(DBService.InbodyCollection);
            const result = await col.remove({email: body.email, childrenId: body.childrenId});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/createChild')
    @POST()
    async createChild(ctx: Koa.Context, next: () => Promise<any>) {
        const body = ctx.request.body;
        await this.singleUploadMiddleware(ctx, next);
        await this.dbService.performWithDB(async db => {
            const col1 = await db.collection(DBService.ChildrenCollection);
            let gender = false;
            if (body.isMale === 'true') {
                gender = true;
            }
            const childId = await col1.insert({parent: body.email, name: body.name, birth: new Date(body.birth), profile: body.image, isMale: gender}).then(json => json.insertedIds);

            const col = await db.collection(DBService.UserCollection);
            let childrenresult = await col.findOne({email: body.email}).then(json => json.children);
            if (childrenresult === (null || undefined)) {
                childrenresult = [];
            }
            childrenresult.push(childId);
            const result = await col.updateOne({email: body.email}, {$set: {children: childrenresult}});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/search')
    @POST()
    async search(ctx: Koa.Context) {
        const {searchWay} = ctx.request.body;
        const {payload} = ctx.request.body;
        console.log('searchWay :', searchWay);
        console.log('payload :', payload);
        await this.dbService.performWithDB(async db => {
            const col = await db.collection(DBService.ChildrenCollection);
            const col1 = await db.collection(DBService.InbodyCollection);
            let result1;
            let result2;
            let result = [];
            if (searchWay === 'childrenName') {
                // result = await col
                //     .aggregate([
                //         {$match: {name: new RegExp(payload)}},
                //         {$project: {_id: {$toString: '$_id'}, name: 1, parent: 1}},
                //         {$lookup: {from: DBService.InbodyCollection, localField: '_id', foreignField: 'childrenId', as: 'childrenData'}}
                //     ])
                //     .toArray();
                result1 = await col.find({name: new RegExp(payload)}, {projection: {parent: 1, name: 1}}).toArray();
                // console.log('result1 :', result1);
                if (result1) {
                    for (let i = 0; i < result1.length; i++) {
                        result2 = await col1.find({childrenId: String(result1[i]._id)}, {projection: {measureTime: 1}}).toArray();
                        console.log('result2 :', result2);
                        if (result2) {
                            for (let j = 0; j < result2.length; j++) {
                                // console.log('result2[j] :', result2[j]);
                                const sum = JSON.parse(JSON.stringify(Object.assign(result1[i], result2[j])));
                                await result.push(sum);
                                console.log('result :', result);
                            }
                        }
                    }
                }
            } else {
                // result = await col
                //     .aggregate([
                //         {$match: {parent: new RegExp(payload)}},
                //         {$project: {_id: {$toString: '$_id'}, name: 1, parent: 1}},
                //         {$lookup: {from: DBService.InbodyCollection, localField: '_id', foreignField: 'childrenId', as: 'childrenData'}}
                //     ])
                //     .toArray();
            }

            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
    singleUploadMiddleware: Koa.Middleware;
}
