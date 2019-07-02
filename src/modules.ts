import { Resolver } from 'awilix';
import { EnvService } from './services/env.service';
import { DBService } from './services/db.service';
import { MemberResolver, MemberByEmailResolver, MembersResolver, AddMemberResolver } from './resolvers/member.resolver';
import { AppServer } from './server';

export interface ResolverModules {
    envService?: Resolver<EnvService>;
    dbService?: Resolver<DBService>;
    memberResolver?: Resolver<MemberResolver>;
    memberByEmailResolver?: Resolver<MemberByEmailResolver>;
    membersResolver?: Resolver<MembersResolver>;
    addMemberResolver?: Resolver<AddMemberResolver>;
    appServer?: Resolver<AppServer>;
}

export type MainContainerModules = ResolverModules;
