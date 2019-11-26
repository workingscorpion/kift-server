import Koa from 'koa';
import {route, GET, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import * as password from 'secure-random-password';
import * as nodemailer from 'nodemailer';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface User {
    email?: string;
    pw?: string;
    joindate?: Date;
    name?: string;
    birth?: Date;
    isMale?: boolean;
    address?: string;
}

/**
 * @api {post} /api/v1/auth/join sign up
 * @apiName join
 * @apiGroup Owners
 *
 * @api {post} /api/v1/auth/login login check
 * @apiName login
 * @apiGroup Owners
 *
 * @api {post} /api/v1/auth/signout signout
 * @apiName signout
 * @apiGroup Owners
 *
 *
 * @api {get} /api/v1/auth/findid findid
 * @apiName findid
 * @apiGroup Owners
 *
 * @api {post} /api/v1/auth/findpw findpw
 * @apiName findpw
 * @apiGroup Owners
 *
 * @api {post} /api/v1/auth/changepw changepw
 * @apiName changepw
 * @apiGroup Owners
 */

@route('/api/v1/auth')
export default class AuthAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
        this.DB = this.envService.get().DB_NAME;
    }

    DB: string;

    @route('/join')
    @POST()
    async join(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);

            const findResult = await col.findOne({email: body.email});
            if (findResult) {
                if (findResult.email === body.email) {
                    ctx.response.body = '해당 계정이 이미 존재합니다.';
                    ctx.response.status = HttpStatus.OK;
                }
            } else {
                const result = await col.insert({
                    email: body.email,
                    pw: body.pw,
                    name: body.name,
                    birth: new Date(body.birth),
                    isMale: body.isMale,
                    address: body.address,
                    joindate: new Date(Date.now())
                });
                ctx.response.body = {result};
                ctx.response.status = HttpStatus.OK;
            }
        });
    }

    @route('/login')
    @POST()
    async login(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);
            const result = await col.findOne({email: body.email});
            if (!result) {
                ctx.response.body = false;
            } else {
                ctx.response.body = body.pw === result.pw ? true : false;
            }
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/findid')
    @GET()
    async findid(ctx: Koa.Context) {
        const query = ctx.request.query;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);
            const result = await col.findOne({name: query.name, birth: query.birth, address: query.address});
            if (result) {
                ctx.response.body = result.email;
                ctx.response.status = HttpStatus.OK;
            }
        });
    }

    @route('/findpw')
    @POST()
    async findpw(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);
            const newpw = await password.randomPassword({characters: [password.upper, password.symbols, password.lower, password.digits]});
            await col.findOneAndUpdate({email: body.email, name: body.name, birth: body.birth, address: body.address}, {$set: {pw: newpw}});
            const newinfo = await col.findOne({email: body.email});
            console.log('newpw :', newpw);
            // ctx.response.body = result.email;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: this.envService.env.SENDER,
                    pass: this.envService.env.SENDERPW
                }
            });
            if (newinfo) {
                const email = {
                    from: this.envService.env.SENDER,
                    to: newinfo.email,
                    subject: 'Login Secret for PHR',
                    html: `Hello! Your login secret is <h2>${newinfo.pw}</h2>.<br /> Copy and paste on the app/website to log in`
                } as nodemailer.SendMailOptions;
                await transporter.sendMail(email, (err, info) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info);
                    }
                });
            }
            // sendSecretMail();

            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/changepw')
    @POST()
    async changepw(ctx: Koa.Context) {}

    @route('/signout')
    @POST()
    async signout(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);
            const result = await col.findOne({email: body.email});
            if (result) {
                ctx.response.body = body.pw === result.pw;
                ctx.response.status = HttpStatus.OK;
            }
        });
    }

    dbService: DBService;
    appServer: AppServer;
    envService: EnvService;
}

// const sendMail = email => null;

// const sendSecretMail = (address: string, secret: string) => {
//     const email = {
//         from: 'PHRadmin@gmail.com',
//         to: address,
//         subject: 'Login Secret for PHR',
//         html: `Hello! Your login secret is ${secret}.<br /> Copy and paste on the app/website to log in`
//     };
// };
