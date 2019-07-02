import { createContainer, asClass } from 'awilix';
import { nameof } from './lib/utils';
import { MainContainerModules } from './modules';
import { HelloService } from './services/hello.service';
import { AppServer } from './server';

async function start() {
    const container = createContainer();
    const modules: MainContainerModules = {
        helloService: asClass(HelloService).scoped(),
        appServer: asClass(AppServer).scoped(),
    };
    container.register(modules as any);

    const server: AppServer = container.resolve(nameof<MainContainerModules>('appServer'));
    await server.start(container);
}

start();
