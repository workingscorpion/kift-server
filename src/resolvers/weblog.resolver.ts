import { GraphQLResolver } from '../graphql/resolver';


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
    async resolve({ enabled }: any) {
        loggingEnabled = enabled;
        return { error: 0, value: loggingEnabled };
    }
}

export class WebLogsResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve() {
        return logs;
    }
}

export class AddWebLogResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve({ log }: any) {
        if (!loggingEnabled) {
            return { error: -1 };
        }
        logs.push(log);
        return { error: 0 };
    }
}
