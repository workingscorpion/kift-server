import { GraphQLResolver } from '../graphql/resolver';
import { PubSub } from 'apollo-server-koa';
import { Logger } from '../logger';
import { MemLogTransport } from './memlogtransport';


let loggingEnabled = false;

export class WebLoggingEnabledResolver implements GraphQLResolver {
    async resolve() {
        return loggingEnabled;
    }
}

export class SetWebLoggingEnabledResolver implements GraphQLResolver {
    constructor({ pubSub, webLogTransport }: any) {
        this.pubSub = pubSub;
        this.webLogTransport = webLogTransport;
    }

    async resolve({ enabled }: any) {
        if (loggingEnabled != enabled) {
            loggingEnabled = enabled;
            if (enabled) {
                Logger.add(this.webLogTransport);
            } else {
                Logger.remove(this.webLogTransport);
            }
            this.pubSub.publish('webLoggingEnabled', {
                webLoggingEnabled: enabled
            });
        } else {
            return { error: 1, value: loggingEnabled };
        }
        return { error: 0, value: loggingEnabled };
    }
    pubSub: PubSub;
    webLogTransport: MemLogTransport;
}

export class WebLogsResolver implements GraphQLResolver {
    constructor({ webLogTransport }: any) {
        this.webLogTransport = webLogTransport;
    }

    async resolve() {
        return this.webLogTransport.getLogs();
    }

    webLogTransport: MemLogTransport;
}

export class AddWebLogResolver implements GraphQLResolver {
    async resolve({ log }: any) {
        if (!loggingEnabled) {
            return { error: -1 };
        }
        Logger.info(log);
        return { error: 0 };
    }
}
