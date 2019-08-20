import { Resolver } from 'awilix';
import { PubSub } from 'apollo-server-koa';
import { EnvService } from './services/env.service';
import { CryptoService } from './services/crypto.service';
import { DBService } from './services/db.service';
import { SettingsService } from './services/settings.service';
import { MemLogTransport } from './resolvers/memlogtransport';
import { MemberResolver, MemberByEmailResolver, MembersResolver, AddMemberResolver, UpdateMemberResolver } from './resolvers/member.resolver';
import { MessageListResolver, MessageDataResolver, UploadMessageResolver, RemoveMessageResolver } from './resolvers/messageboard.resolver';
import { WebLoggingEnabledResolver, SetWebLoggingEnabledResolver, WebLogsResolver, AddWebLogResolver } from './resolvers/weblog.resolver';
import { SettingResolver, SettingsResolver, SetSettingResolver } from './resolvers/setting.resolver';
import { ClearDbResolver } from './resolvers/dev.resolver';
import { LoginResolver } from './resolvers/auth.resolver';
import { AppServer } from './server';

export interface ServiceModules {
    envService?: Resolver<EnvService>;
    cryptoService?: Resolver<CryptoService>;
    dbService?: Resolver<DBService>;
    webLogTransport?: Resolver<MemLogTransport>;
    settingsService?: Resolver<SettingsService>;
    appServer?: Resolver<AppServer>;
}

export interface ResolverModules {

    // auth
    loginResolver?: Resolver<LoginResolver>;

    // member
    memberResolver?: Resolver<MemberResolver>;
    memberByEmailResolver?: Resolver<MemberByEmailResolver>;
    membersResolver?: Resolver<MembersResolver>;
    addMemberResolver?: Resolver<AddMemberResolver>;
    updateMemberResolver?: Resolver<UpdateMemberResolver>;

    // messageboard
    messageListResolver?: Resolver<MessageListResolver>;
    messageDataResolver?: Resolver<MessageDataResolver>;
    uploadMessageResolver?: Resolver<UploadMessageResolver>;
    removeMessageResolver?: Resolver<RemoveMessageResolver>;

    // weblog
    webLoggingEnabledResolver?: Resolver<WebLoggingEnabledResolver>;
    setWebLoggingEnabledResolver?: Resolver<SetWebLoggingEnabledResolver>;
    webLogsResolver?: Resolver<WebLogsResolver>;
    addWebLogResolver?: Resolver<AddWebLogResolver>;

    // setting
    settingResolver?: Resolver<SettingResolver>;
    settingsResolver?: Resolver<SettingsResolver>;
    setSettingResolver?: Resolver<SetSettingResolver>;

    // dev
    clearDbResolver?: Resolver<ClearDbResolver>;
}

export interface ValueModules {
    pubSub?: Resolver<PubSub>;
}

export type MainContainerModules = ServiceModules & ResolverModules & ValueModules;

export type AppServerClient = { appServer: AppServer };
export type DBServiceClient = { dbService: DBService };
export type EnvServiceClient = { envService: EnvService };
export type CryptoServiceClient = { cryptoService: CryptoService };
export type SettingsServiceClient = { settingsService: SettingsService };
export type PubSubValueClient = { pubSub: PubSub };
