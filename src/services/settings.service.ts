import _ from 'lodash';
import { DBServiceClient } from '../modules';
import { DBService } from './db.service';
import { KeyValModel } from '../models/keyval.model';

type MyDependencies = DBServiceClient;

export class SettingsService {
    constructor({ dbService }: MyDependencies) {
        this.dbService = dbService;

        // 초기 설정 로드
        this.dbService.setPostInitCallback(() => {
            this.load();
        });
    }

    // DB에 설정을 저장한다.
    async save() {
        await this.dbService.sequelize.transaction(async tx => {
            await KeyValModel.destroy({ where: { id: _.keysIn(this.settingsCache) }, transaction: tx });

            let kvs = [];
            for (const setting in this.settingsCache) {
                kvs.push({
                    id: setting,
                    value: JSON.stringify(this.settingsCache[setting]),
                });
            }
            await KeyValModel.bulkCreate(kvs, { transaction: tx });
        });
    }

    // DB에 저장된 설정을 불러온다.
    async load() {
        const kv = (await KeyValModel.findAll()) as Required<KeyValModel>[];
        for (const row of kv) {
            this.settingsCache[row.id] = JSON.parse(row.value);
        }
        return this.settingsCache;
    }

    //
    setSafe(name: string, value: any): boolean {
        if (this.settingsCache.hasOwnProperty(name) &&
            typeof this.settingsCache[name] == typeof value) {
            this.settingsCache[name] = value;
            return true;
        }
        return false;
    }

    static readonly Default = {
        AdminEmail: 'realcow@jinjoosoft.com',
        AdminPhoneNumber: '01911112222',
    };

    // 이 멤버를 참조하여 설정을 직접 액세스 할 수 있다.
    settingsCache: any = {
        AdminEmail: SettingsService.Default.AdminEmail,
        AdminPhoneNumber: SettingsService.Default.AdminPhoneNumber,
    };

    private dbService: DBService;
}
