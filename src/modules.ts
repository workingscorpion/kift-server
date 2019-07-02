import { Resolver } from 'awilix';
import { EnvService } from './services/env.service';
import { DBService } from './services/db.service';
import { HelloService } from './services/hello.service';
import { MemberResolver, MembersResolver, AddMemberResolver } from './resolvers/member.resolver';
import { AppServer } from './server';

export interface ResolverModules {
    envService?: Resolver<EnvService>;
    dbService?: Resolver<DBService>;
    helloService?: Resolver<HelloService>;
    memberResolver?: Resolver<MemberResolver>;
    membersResolver?: Resolver<MembersResolver>;
    addMemberResolver?: Resolver<AddMemberResolver>;
    appServer?: Resolver<AppServer>;
}

export type MainContainerModules = ResolverModules;
