import Koa from 'koa';
import { route, GET, PUT } from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import { DBService } from '../services/db.service';
import { EnvService } from '../services/env.service';
import { DBServiceClient, AppServerClient, EnvServiceClient } from '../modules';
import { AppServer } from '../server';
import multer from 'koa-multer';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

@route('/api/v1/upload')
export default class UploadAPI implements MyDependencies {

    constructor({ dbService, appServer, envService }: MyDependencies) {
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
        this.singleUploadMiddleware = multer({ storage: storageImage }).single('file');
        this.multiUploadMiddleware = multer({ storage: storageImage }).array('files');
    }

    @route('/single')
    @PUT()
    async uploadSingle(ctx: Koa.Context, next: () => Promise<any>) {
        await this.singleUploadMiddleware(ctx, next);
        ctx.response.body = { };
        ctx.response.status = HttpStatus.OK;
    }

    @route('/multi')
    @PUT()
    async uploadMulti(ctx: Koa.Context, next: () => Promise<any>) {
        await this.multiUploadMiddleware(ctx, next);
        ctx.response.body = { };
        ctx.response.status = HttpStatus.OK;
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
    singleUploadMiddleware: Koa.Middleware;
    multiUploadMiddleware: Koa.Middleware;
}
