import {MongoClient, Db} from 'mongodb';
import {EnvService} from './env.service';

export class DBService {
    constructor({envService}: any) {
        this.envService = envService;
        this.MongodbUri = `mongodb://${this.envService.get().DB_HOST}:${this.envService.get().DB_PORT}`;
        this.dbName = envService.get().DB_NAME;
    }

    // MongoDB 커넥션을 얻는다. 작업이 끝나면 커넥션을 닫아주어야 한다. 안그러면 누수가 발생한다.
    async connect() {
        return MongoClient.connect(this.MongodbUri);
    }

    async perform(fn: (client: MongoClient) => Promise<any>) {
        const conn = await MongoClient.connect(this.MongodbUri);
        try {
            await fn(conn);
        } finally {
            await conn.close();
        }
    }

    async performWithDB(fn: (db: Db) => Promise<any>) {
        const conn = await MongoClient.connect(this.MongodbUri);
        try {
            const db = await conn.db(this.dbName);
            await fn(db);
        } finally {
            await conn.close();
        }
    }

    envService: EnvService;

    initialized = false;
    postInitCallbacks: CallableFunction[] = [];
    MongodbUri: string;
    dbName = 'magpie';
    static readonly InbodyCollection = 'inbody';
    static readonly UserCollection = 'user';
    static readonly SettingCollection = 'setting';
    static readonly ChildrenCollection = 'children';
    static readonly BoardCollection = 'board';
}
