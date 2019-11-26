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

/**
 *
 * @api {post} /api/v1/upload/single single image upload
 * @apiName uploadSingle
 * @apiGroup Owners
 *
 * @api {post} /api/v1/upload/multi images upload more than 2
 * @apiName uploadMulti
 * @apiGroup Owners
 */

@route('/api/v1/upload')
export default class UploadAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;

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
        ctx.response.status = HttpStatus.OK;
    }

    @route('/multi')
    @POST()
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
