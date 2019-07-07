import { Resolver } from 'awilix';
import { EnvService } from './services/env.service';
import { CryptoService } from './services/crypto.service';
import { DBService } from './services/db.service';
import { MemLogTransport } from './resolvers/memlogtransport';
import { MemberResolver, MemberByEmailResolver, MembersResolver, AddMemberResolver } from './resolvers/member.resolver';
import { WebLoggingEnabledResolver, SetWebLoggingEnabledResolver, WebLogsResolver, AddWebLogResolver } from './resolvers/weblog.resolver';
import { AppServer } from './server';

export interface ResolverModules {
    envService?: Resolver<EnvService>;
    cryptoService?: Resolver<CryptoService>;
    dbService?: Resolver<DBService>;
    webLogTransport?: Resolver<MemLogTransport>;

    // member
    memberResolver?: Resolver<MemberResolver>;
    memberByEmailResolver?: Resolver<MemberByEmailResolver>;
    membersResolver?: Resolver<MembersResolver>;
    addMemberResolver?: Resolver<AddMemberResolver>;

    // weblog
    webLoggingEnabledResolver?: Resolver<WebLoggingEnabledResolver>;
    setWebLoggingEnabledResolver?: Resolver<SetWebLoggingEnabledResolver>;
    webLogsResolver?: Resolver<WebLogsResolver>;
    addWebLogResolver?: Resolver<AddWebLogResolver>;
    
    appServer?: Resolver<AppServer>;
}

export type MainContainerModules = ResolverModules;

export type EnvServiceClient = { envService: EnvService };
