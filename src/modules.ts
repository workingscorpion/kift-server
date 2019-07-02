import { Resolver } from 'awilix';
import { HelloService } from './services/hello.service';
import { AppServer } from './server';

export interface ResolverModules {
    helloService?: Resolver<HelloService>;
    appServer?: Resolver<AppServer>;
}

export type MainContainerModules = ResolverModules;
