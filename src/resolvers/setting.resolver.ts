import { GraphQLResolver } from '../graphql/resolver';
import { SettingsServiceClient } from '../modules';
import { SettingsService } from '../services/settings.service';
import _ from 'lodash';

export class SettingResolver implements GraphQLResolver, SettingsServiceClient {
    constructor({ settingsService }: SettingsServiceClient) {
        this.settingsService = settingsService;
    }

    async resolve({ key }: { key: string }) {
        return this.settingsService.settingsCache[key];
    }

    settingsService: SettingsService;
}

export class SettingsResolver implements GraphQLResolver, SettingsServiceClient {
    constructor({ settingsService }: SettingsServiceClient) {
        this.settingsService = settingsService;
    }

    async resolve() {
        return _.map(this.settingsService.settingsCache, (value, key) => { return { key, value }; });
    }

    settingsService: SettingsService;
}

export class SetSettingResolver implements GraphQLResolver, SettingsServiceClient {
    constructor({ settingsService }: SettingsServiceClient) {
        this.settingsService = settingsService;
    }

    async resolve({ key, value }: { key: string, value: string }) {
        if (this.settingsService.setSafe(key, value)) {
            await this.settingsService.save();
            return { error: 0, key, value };
        }
        return { error: -1 };
    }

    settingsService: SettingsService;
}

