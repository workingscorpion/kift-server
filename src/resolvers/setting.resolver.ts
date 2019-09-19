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
        return null;
    }

    settingsService: SettingsService;
}

export class SettingsResolver implements GraphQLResolver, SettingsServiceClient {
    constructor({ settingsService }: SettingsServiceClient) {
        this.settingsService = settingsService;
    }

    async resolve(context: any) {
        return null;
    }

    settingsService: SettingsService;
}

export class SetSettingResolver implements GraphQLResolver, SettingsServiceClient, PubSubValueClient {
    constructor({ settingsService, pubSub }: SettingsServiceClient & PubSubValueClient) {
        this.settingsService = settingsService;
        this.pubSub = pubSub;
    }

    async resolve(context: any, { key, value }: { key: string, value: string }) {
        return null;
    }

    settingsService: SettingsService;
    pubSub: PubSub;
}
