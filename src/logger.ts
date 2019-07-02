//
// 로깅 정책
// error 레벨 로그는 `error.log`에 출력
// info 미만 로그는 모두 `all.log`에 출력
// verbose, debug, silly 로그는 개발모드에서는 콘솔 출력, 운영모드에서는 무시.
//
//
// 참고: 로그레벨
//
// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     verbose: 3,
//     debug: 4,
//     silly: 5
// };
//

import * as winston from 'winston';
import yenv from 'yenv';

const logDir = yenv().LOG_DIR;

function getFormattedTime() {
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var mi = today.getMinutes();
    var s = today.getSeconds();
    const f = (x: any) => (x + '').padStart(2, '0');
    return y + f(m) + f(d) + "-" + f(h) + f(mi);
}
const ErrorLogFileName = `${logDir}/[${getFormattedTime()}]error.log`;
const AllLogFileName = `${logDir}/[${getFormattedTime()}]all.log`;

export const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: ErrorLogFileName, level: 'error' }),
        new winston.transports.File({ filename: AllLogFileName })
    ]
});

// 개발모드 출력 설정
if (process.env.NODE_ENV !== 'production') {
    Logger.level = 'silly';
    Logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
