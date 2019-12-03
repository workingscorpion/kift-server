import Koa from 'koa';
import {route, GET, POST, DELETE} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import multer from 'koa-multer';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface Inbody {
    email: string;
    childrenId?: number;
    // bodydata?:[]
    height?: number;
    weight?: number;
    BMI?: number;
    headround?: number;
    sight?: number;
    waist?: number;
    foot?: number;
    bodyfat?: number;
    muscle?: number;
    moisture?: number;
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
            const result = await col.insert({
                email: body.email,
                childrenId: Number(body.childrenId),
                height: Number(body.height),
                weight: Number(body.weight),
                BMI: Number((body.weight / (body.height * 0.01 * (body.height * 0.01))).toFixed(2)),
                headround: Number(body.headround),
                sight: Number(body.sight),
                waist: Number(body.waist),
                foot: Number(body.foot),
                bodyfat: Number(body.bodyfat),
                muscle: Number(body.muscle),
                moisture: Number(body.moisture),
                protein: Number(body.protein),
                internalfat: Number(body.internalfat),
                metabolism: Number(body.metabolism),
                bonemass: Number(body.bonemass)
            });
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/read')
    @GET()
    async read(ctx: Koa.Context) {
        const {email} = ctx.request.query;
        const {childrenId} = ctx.request.query;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<Inbody>(DBService.InbodyCollection);
            const result = await col.find({email: email, childrenId: childrenId}).toArray();
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
            const result = await col.findOneAndUpdate(
                {email: body.email, childrenId: body.childrenId},
                {
                    $set: {
                        email: body.email,
                        childrenId: body.childrenId,
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
    @GET()
    async createChild(ctx: Koa.Context, next: () => Promise<any>) {
        const query = ctx.request.query;
        await this.singleUploadMiddleware(ctx, next);
        await this.dbService.performWithDB(async db => {
            const col1 = await db.collection(DBService.ChildrenCollection);
            let gender = false;
            if (query.isMale === 'true') {
                gender = true;
            }
            const childId = await col1.insert({parent: query.email, name: query.name, birth: new Date(query.birth), profile: query.image, isMale: gender}).then(json => json.insertedIds);

            const col = await db.collection(DBService.UserCollection);
            let childrenresult = await col.findOne({email: query.email}).then(json => json.children);
            if (childrenresult === (null || undefined)) {
                childrenresult = [];
            }
            childrenresult.push(childId);
            const result = await col.findOneAndUpdate({email: query.email}, {$set: {children: childrenresult}});
            ctx.response.body = {result};
            ctx.response.status = HttpStatus.OK;
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
    singleUploadMiddleware: Koa.Middleware;
}
