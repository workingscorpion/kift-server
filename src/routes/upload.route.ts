import Koa from 'koa';
import {route, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import multer from 'koa-multer';
import mongodb from 'mongodb';
import fs from 'fs';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

@route('/api/v1/upload')
export default class UploadAPI implements MyDependencies {
    filename: string = '';
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
                this.filename = String(Date.now()) + file.originalname;
                console.log('this.filename :', this.filename);
                // callback(null, file.originalname);
                callback(null, this.filename);
            }
        });
        this.singleUploadMiddleware = multer({storage: storageImage}).single('file');

        this.multiUploadMiddleware = multer({storage: storageImage}).array('files');
    }

    @route('/single')
    @POST()
    async uploadSingle(ctx: Koa.Context, next: () => Promise<any>) {
        const a = await this.singleUploadMiddleware(ctx, next);

        this.dbService.performWithDB(async db => {
            // const bucket = new mongodb.GridFSBucket(db, {
            //     chunkSizeBytes: 1024,
            //     bucketName: 'images'
            // });
            // fs.createReadStream(`C:\\Users\\ydlam\\Desktop\\fox.jpg`)
            //     .pipe(bucket.openUploadStream('fox.jpg'))
            //     .on('err', err => {
            //         console.log('err :', err);
            //     })
            //     .on('finish', () => {
            //         console.log('File Inserted!!');
            //     });
            // ctx.request.body = 'File Inserted!!';
            // ctx.response.status = HttpStatus.OK;
        });
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
