import Koa from 'koa';
import {route, GET, POST} from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import {DBService} from '../services/db.service';
import {EnvService} from '../services/env.service';
import {DBServiceClient, AppServerClient, EnvServiceClient} from '../modules';
import {AppServer} from '../server';
import * as password from 'secure-random-password';
import * as nodemailer from 'nodemailer';
import {Collection} from 'mongodb';
import bcrypt from 'bcrypt';

type MyDependencies = DBServiceClient & AppServerClient & EnvServiceClient;

interface User {
    email?: string;
    pw?: string;
    joindate?: number;
    name?: string;
    birth?: Date;
    isMale?: Boolean;
    children?: string[];
}

@route('/api/v1/auth')
export default class AuthAPI implements MyDependencies {
    constructor({dbService, appServer, envService}: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
        this.envService = envService;
    }

    @route('/join')
    @POST()
    async join(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);

            //bcrypt 적용
            // let hspw;
            // await bcrypt.hash(body.pw, 10).then(newpw => (hspw = newpw));
            // console.log('hspw :', hspw);

            const findResult = await col.findOne({email: body.email});
            if (findResult) {
                if (findResult.email === body.email) {
                    ctx.response.body = '해당 계정이 이미 존재합니다.';
                    ctx.response.status = HttpStatus.OK;
                }
            } else {
                const result = await col.insert({
                    email: body.email,
                    // pw: hspw,
                    pw: body.pw,
                    name: body.name,
                    birth: new Date(body.birth),
                    isMale: body.isMale === 'true' ? true : false,
                    joindate: Date.now(),
                    children: []
                });
                console.log('join result :', result);
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
            const result = await col.findOne({name: query.name, birth: query.birth});
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
            await setpw(col, body, newpw);
            // await col.findOneAndUpdate({email: body.email, name: body.name, birth: body.birth}, {$set: {pw: newpw}});
            const newinfo = await col.findOne({email: body.email});
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
                    subject: 'Login Password for PHR',
                    html: `Hello! Your login Password is <h2>${newinfo.pw}</h2>.<br /> Copy and paste on the app/website to log in`
                } as nodemailer.SendMailOptions;
                await transporter.sendMail(email, (err, info) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info);
                    }
                });
            }
            ctx.response.body = `email : ${body.email}<br /> newpw : ${newpw}`;
            ctx.response.status = HttpStatus.OK;
        });
    }

    @route('/changepw')
    @POST()
    async changepw(ctx: Koa.Context) {
        const body = ctx.request.body;
        await this.dbService.performWithDB(async db => {
            const col = await db.collection<User>(DBService.UserCollection);
            const result = await setpw(col, body, body.newpw);
            if (result) {
                console.log('result :', result);
            }
        });
    }

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

const setpw = (col: Collection<User>, body: any, newpw: string): any => {
    return col.findOneAndUpdate({email: body.email, name: body.name, birth: body.birth, pw: body.pw}, {$set: {pw: newpw}});
};
