import { GraphQLResolver } from '../graphql/resolver';
import { PubSub } from 'apollo-server-koa';


let loggingEnabled = false;
let logs: string[] = [
    'foo', 'bar', 'baz'
];

export class WebLoggingEnabledResolver implements GraphQLResolver {
    async resolve() {
        return loggingEnabled;
    }
}

export class SetWebLoggingEnabledResolver implements GraphQLResolver {
    constructor({ pubSub }: any) {
        this.pubSub = pubSub;
    }

    async resolve({ enabled }: any) {
        loggingEnabled = enabled;
        this.pubSub.publish('webLoggingEnabled', {
            webLoggingEnabled: enabled
        });
        return { error: 0, value: loggingEnabled };
    }
    pubSub: PubSub;
}

export class WebLogsResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve() {
        return logs;
    }
}

export class AddWebLogResolver implements GraphQLResolver {
    constructor({ pubSub }: any) {
        this.pubSub = pubSub;
    }

    async resolve({ log }: any) {
        if (!loggingEnabled) {
            return { error: -1 };
        }
        logs.push(log);
        this.pubSub.publish('webLogAdded', {
            webLogAdded: log
        });
        return { error: 0 };
    }
    pubSub: PubSub;
}
