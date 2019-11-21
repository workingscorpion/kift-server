import Koa from 'koa';
import {route, GET, PUT, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import multer from 'koa-multer';
import {MongoClient} from 'mongodb';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

@route('/api/v1/upload')
export default class UploadAPI implements MyDependencies {
    DBUrl: string;
    DB: string;
    CollectionName: string;

    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
        this.DBUrl = 'mongodb://' + this.envService.get().DB_HOST + ':' + this.envService.get().DB_PORT;
        this.DB = this.envService.get().DB_NAME;
        this.CollectionName = 'images';

        // 프로필 이미지 업로드 미들웨어 설정
        const storageImage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, `${this.envService.get().UPLOAD_DIR}/`);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            }
        });
        this.singleUploadMiddleware = multer({storage: storageImage}).single('file');
        this.multiUploadMiddleware = multer({storage: storageImage}).array('files');
    }

    @route('/single')
    @POST()
    async uploadSingle(ctx: Koa.Context, next: () => Promise<any>) {
        await this.singleUploadMiddleware(ctx, next);
        ctx.request.body = 'done';
        // console.log('ctx.request :', ctx);
        // // ctx.response.body = ctx.request.body;
        // console.log('ctx.response.req :', ctx.response.req);
        // // console.log('ctx.response.res :', ctx.response.res);
        // console.log('ctx.response.socket :', ctx.response.socket);

        // const body = ctx.request.body;

        // ctx.response.body = name;
        ctx.response.status = HttpStatus.OK;
        // const {name} = ctx.reqeust.body;
        // const {upload} = ctx.request.body;
        // const client = await MongoClient.connect(this.DBUrl);
        // const db = await client.db(this.DB);
        // const col = await db.collection(this.CollectionName);
        // const result = await col.insert({imagename: name, image: upload});
        // ctx.response.body = {result};
        // ctx.response.status = HttpStatus.OK;
    }

    @route('/multi')
    @PUT()
    async uploadMulti(ctx: Koa.Context, next: () => Promise<any>) {
        await this.multiUploadMiddleware(ctx, next);
        ctx.response.body = {};
        ctx.response.status = HttpStatus.OK;
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
    singleUploadMiddleware: Koa.Middleware;
    multiUploadMiddleware: Koa.Middleware;
}
