import Koa from 'koa';
import { route, GET, POST, PUT, findControllers, DELETE } from 'awilix-koa';
import * as HttpStatus from 'http-status-codes';
import { DBService } from '../services/db.service';
import { DBServiceClient, AppServerClient } from '../modules';
import { AppServer } from '../server';
import { MongoClient, Db, Collection, Cursor } from 'mongodb';
import { requiredSubselectionMessage } from 'graphql/validation/rules/ScalarLeafs';

type MyDependencies = DBServiceClient & AppServerClient;

interface User {
    id: string;
    pw: string;
}

const DBUrl = 'mongodb://localhost:27017';
const DB = 'macpie';
const CollectionName = 'user';

@route('/api/v1/auth')
export default class AuthAPI implements MyDependencies {
    constructor({ dbService, appServer }: MyDependencies) {
        this.dbService = dbService;
        this.appServer = appServer;
    }

    @route('/join')
    @PUT()
    async join(ctx: Koa.Context) {
        // const { id } = ctx.request.body;
        // const { pw } = ctx.request.body;
        const { id } = ctx.request.query;
        const { pw } = ctx.request.query;
        // const { hspw } = ctx.request.body;
        // const enpw =
        const client = await MongoClient.connect(DBUrl);
        const db = await client.db(DB);
        const col = await db.collection<User>(CollectionName);
        const result = await col.insert({ id: id, pw: pw });
        console.log('result :', result);
        ctx.response.body = { result };
        ctx.response.status = HttpStatus.OK;
    }

    @route('/login')
    @GET()
    async login(ctx: Koa.Context) {
        const { id } = ctx.request.query;
        const { pw } = ctx.request.query;
        const client = await MongoClient.connect(DBUrl);
        const db = await client.db(DB);
        const col = await db.collection(CollectionName);
        const result = await col.findOne({ id: id });
        ctx.response.body = pw === result.pw ? 'true' : 'false';
        ctx.response.status = HttpStatus.OK;
    }

    dbService: DBService;
    appServer: AppServer;
}
