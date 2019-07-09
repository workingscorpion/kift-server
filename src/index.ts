import { createContainer, asClass } from 'awilix';
import { nameof } from './lib/utils';
import { MainContainerModules } from './modules';
import { EnvService } from './services/env.service';
import { CryptoService } from './services/crypto.service';
import { DBService } from './services/db.service';
import { SettingsService } from './services/settings.service';
import { MemLogTransport } from './resolvers/memlogtransport';
import { LoginResolver } from './resolvers/auth.resolver';
import { MemberResolver, MembersResolver, AddMemberResolver, MemberByEmailResolver, UpdateMemberResolver } from './resolvers/member.resolver';
import { WebLoggingEnabledResolver, SetWebLoggingEnabledResolver, WebLogsResolver, AddWebLogResolver } from './resolvers/weblog.resolver';
import { SettingResolver, SettingsResolver, SetSettingResolver } from './resolvers/setting.resolver';
import { AppServer } from './server';
import { Logger } from './logger';

async function start() {
        
    const container = createContainer();
    const modules: MainContainerModules = {
        envService: asClass(EnvService).scoped(),
        cryptoService: asClass(CryptoService).scoped(),
        dbService: asClass(DBService).scoped(),
        webLogTransport: asClass(MemLogTransport).singleton(),
        settingsService: asClass(SettingsService).singleton(),
        
        // auth
        loginResolver: asClass(LoginResolver).scoped(),
        
        // member
        memberResolver: asClass(MemberResolver).scoped(),
        memberByEmailResolver: asClass(MemberByEmailResolver).scoped(),
        membersResolver: asClass(MembersResolver).scoped(),
        addMemberResolver: asClass(AddMemberResolver).scoped(),
        updateMemberResolver: asClass(UpdateMemberResolver).scoped(),
        
        // web logging
        webLoggingEnabledResolver: asClass(WebLoggingEnabledResolver).scoped(),
        setWebLoggingEnabledResolver: asClass(SetWebLoggingEnabledResolver).scoped(),
        webLogsResolver: asClass(WebLogsResolver).scoped(),
        addWebLogResolver: asClass(AddWebLogResolver).scoped(),
        
        //
        settingResolver: asClass(SettingResolver).scoped(),
        settingsResolver: asClass(SettingsResolver).scoped(),
        setSettingResolver: asClass(SetSettingResolver).scoped(),
        
        appServer: asClass(AppServer).scoped(),
    };
    container.register(modules as any);

    const server: AppServer = container.resolve(nameof<MainContainerModules>('appServer'));
    await server.start(container);
}

Logger.info('Server starts');
start();
