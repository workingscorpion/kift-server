import Transport from 'winston-transport';
import * as _ from 'lodash';
import { PubSub } from 'apollo-server-koa';

//
// 발생한 로그를 GraphQL에 publish하고 
// 최근 로그 중 일부를 메모리에 기억하는 winston transport.
// 파일을 열어보지 않고도 프론트에서 간편하게 로그를 조회하게 할 목적.
//
export class MemLogTransport extends Transport {
    constructor({ pubSub }: any) {
        super();
        this.pubSub = pubSub;
        this.logs = new Array(this.MaxLogs);
        this.p = 0;
    }

    log(info: any, next: CallableFunction) {
        const logItem = info.message;
        this.logs[this.p] = logItem;
        this.p++;
        if (this.p >= this.MaxLogs) { this.p = 0; }

        this.pubSub.publish('webLogAdded', {
            webLogAdded: logItem
        });

        next();
    }

    getLogs(): any[] {
        if (this.logs[this.p] == undefined) {
            return _.take(this.logs, this.p);
        }
        return _.takeRight(this.logs, this.p).concat(_.take(this.logs, this.p));
    }

    clear() {
        _.fill(this.logs, undefined);
        this.p = 0;
    }

    readonly MaxLogs = 1000;
    private logs: any[] = [];
    private p = 0;
    pubSub: PubSub;
}
