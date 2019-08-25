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
import { MessageListResolver, MessageDataResolver, UploadMessageResolver, RemoveMessageResolver, UpdateMessageResolver, MessageBoardInfoResolver } from './resolvers/messageboard.resolver';
import { WebLoggingEnabledResolver, SetWebLoggingEnabledResolver, WebLogsResolver, AddWebLogResolver } from './resolvers/weblog.resolver';
import { UploadResolver } from './resolvers/upload.resolver';
import { SettingResolver, SettingsResolver, SetSettingResolver } from './resolvers/setting.resolver';
import { ClearDbResolver } from './resolvers/dev.resolver';
import { AppServer } from './server';
import { Logger } from './logger';

// 테스트에서 앱 인스턴스에 접근하기 위한 변수
export let appServer: AppServer | undefined;

async function start() {

    const container = createContainer();
    const modules: MainContainerModules = {
        envService: asClass(EnvService).scoped(),
        cryptoService: asClass(CryptoService).scoped(),
        dbService: asClass(DBService).singleton(),
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

        // messageboard
        messageListResolver: asClass(MessageListResolver).scoped(),
        messageBoardInfoResolver: asClass(MessageBoardInfoResolver).scoped(),
        messageDataResolver: asClass(MessageDataResolver).scoped(),
        uploadMessageResolver: asClass(UploadMessageResolver).scoped(),
        updateMessageResolver: asClass(UpdateMessageResolver).scoped(),
        removeMessageResolver: asClass(RemoveMessageResolver).scoped(),

        // web logging
        webLoggingEnabledResolver: asClass(WebLoggingEnabledResolver).scoped(),
        setWebLoggingEnabledResolver: asClass(SetWebLoggingEnabledResolver).scoped(),
        webLogsResolver: asClass(WebLogsResolver).scoped(),
        addWebLogResolver: asClass(AddWebLogResolver).scoped(),

        // file upload
        uploadResolver: asClass(UploadResolver).scoped(),

        //
        settingResolver: asClass(SettingResolver).scoped(),
        settingsResolver: asClass(SettingsResolver).scoped(),
        setSettingResolver: asClass(SetSettingResolver).scoped(),

        // dev
        clearDbResolver: asClass(ClearDbResolver).scoped(),

        appServer: asClass(AppServer).singleton(),
    };
    container.register(modules as any);

    const server: AppServer = container.resolve(nameof<MainContainerModules>('appServer'));
    appServer = server;
    await server.start(container);
}

Logger.info('Server starts');
start();
