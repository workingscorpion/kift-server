import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import 'sqlite3';
import { MemberModel } from '../models/member.model';
import { KeyValModel } from '../models/keyval.model';
import { MessageBoardModel } from '../models/messageboard.model';
import { EnvService } from './env.service';

export class DBService {

    constructor({ envService }: any) {
        this.envService = envService;

        if (this.envService.get().USE_SQLITE) {
            // 파일이 없으면 DB 초기화를 못하는 문제 때문에 빈 파일이을 만들어줌. #TODO: 최신 버전 SQLite에서도 해결 안된 문제인지 확인
            if (!fs.existsSync(this.envService.get().SQLITE_STORAGE)) {
                let f = fs.openSync(this.envService.get().SQLITE_STORAGE, 'w');
                fs.closeSync(f);
            }
        }
        const sequelize = new Sequelize({
            database: 'db',
            username: this.envService.get().DB_ID,
            password: this.envService.get().DB_PW,
            host: this.envService.get().DB_HOST,
            port: this.envService.get().PORT,
            operatorsAliases: false,
            dialect: this.envService.get().USE_SQLITE ? 'sqlite' : 'mysql',
            storage: this.envService.get().SQLITE_STORAGE
        });
        this.sequelize = sequelize;

        const models = [MemberModel, KeyValModel, MessageBoardModel];
        sequelize.addModels(models);
        const birds: PromiseLike<any>[] = [];
        for (let model of models) {
            birds.push(model.sync());
        }
        Promise.all(birds).then(() => {
            this.initialized = true;
            this.postInitCallbacks.forEach(c => c());
            this.postInitCallbacks = [];
        });
    }

    async cleanupDb() {
        await this.sequelize.close();
    }

    // DB 싱크 이후에 실행할 작업 지정
    // DB 싱크(model.sync)는 비동기 작업이기 때문에 기다려야 한다.
    // DB를 액세스 하는 작업은 이 이후에 해야하기 때문에, 작업 실행 시점이 DB 싱크보다 나중일지 애매하다면
    // 이 함수를 통해 확실히 싱크 이후에 호출되도록 보장할 수 있다.
    //
    // e.g., SettingService는 DBService처럼 앱 시동시에 생성되는데, 생성되면서 DB 설정을 로드한다.
    //       'DB싱크 이후'를 보장하기 위해서 이 함수를 이용한다.
    //
    setPostInitCallback(callback: CallableFunction) {
        if (this.initialized) {
            callback();
        } else {
            this.postInitCallbacks.push(callback);
        }
    }

    envService: EnvService;
    sequelize: Sequelize;
    initialized = false;
    postInitCallbacks: CallableFunction[] = [];
}
