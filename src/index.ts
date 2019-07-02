import { createContainer, asClass } from 'awilix';
import { nameof } from './lib/utils';
import { MainContainerModules } from './modules';
import { EnvService } from './services/env.service';
import { DBService } from './services/db.service';
import { MemberResolver, MembersResolver, AddMemberResolver, MemberByEmailResolver } from './resolvers/member.resolver';
import { AppServer } from './server';

async function start() {
    const container = createContainer();
    const modules: MainContainerModules = {
        envService: asClass(EnvService).scoped(),
        dbService: asClass(DBService).scoped(),
        memberResolver: asClass(MemberResolver).scoped(),
        memberByEmailResolver: asClass(MemberByEmailResolver).scoped(),
        membersResolver: asClass(MembersResolver).scoped(),
        addMemberResolver: asClass(AddMemberResolver).scoped(),
        appServer: asClass(AppServer).scoped(),
    };
    container.register(modules as any);

    const server: AppServer = container.resolve(nameof<MainContainerModules>('appServer'));
    await server.start(container);
}

start();
