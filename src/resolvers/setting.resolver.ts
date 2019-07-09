import { PubSub } from 'apollo-server-koa';
import _ from 'lodash';
import { GraphQLResolver } from '../graphql/resolver';
import { SettingsServiceClient, PubSubValueClient } from '../modules';
import { SettingsService } from '../services/settings.service';

export class SettingResolver implements GraphQLResolver, SettingsServiceClient {
    constructor({ settingsService }: SettingsServiceClient) {
        this.settingsService = settingsService;
    }

    async resolve(context: any, { key }: { key: string }) {
        return this.settingsService.settingsCache[key];
    }

    settingsService: SettingsService;
}

export class SettingsResolver implements GraphQLResolver, SettingsServiceClient {
    constructor({ settingsService }: SettingsServiceClient) {
        this.settingsService = settingsService;
    }

    async resolve(context: any) {
        return _.map(this.settingsService.settingsCache, (value, key) => { return { key, value }; });
    }

    settingsService: SettingsService;
}

export class SetSettingResolver implements GraphQLResolver, SettingsServiceClient, PubSubValueClient {
    constructor({ settingsService, pubSub }: SettingsServiceClient & PubSubValueClient) {
        this.settingsService = settingsService;
        this.pubSub = pubSub;
    }

    async resolve(context: any, { key, value }: { key: string, value: string }) {
        if (this.settingsService.setSafe(key, value)) {
            this.pubSub.publish(`settingChanged_${key}`, { 
                settingChanged: value
            });
            await this.settingsService.save();
            return { error: 0, key, value };
        }
        return { error: -1 };
    }

    settingsService: SettingsService;
    pubSub: PubSub;
}
