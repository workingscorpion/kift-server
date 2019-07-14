
// nameof 연산자 - 타입에 존재하는 필드명인지 정적으로 검사하는 함수
// https://schneidenbach.gitbooks.io/typescript-cookbook/nameof-operator.html
export const nameof = <T>(name: keyof T) => name;

// Promise 버전 sleep
export function sleep(ms: number): Promise<any> {
    return new Promise(res => setTimeout(res, ms));
}

// 동기 버전 sleep
export function sleepSync(ms: number) {
    // busy loop
    // let start = new Date().getTime();
    // let expire = start + ms;
    // while (new Date().getTime() < expire) {
    // }
    var sab = new SharedArrayBuffer(36);
    Atomics.wait(new Int32Array(sab), 0, 0, ms);
}

export const noop = () => {};

const CharsetAlphanumericCase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function randomString(n: number, possible: string = CharsetAlphanumericCase) {
    let text = '';
    for (let i = 0; i < n; i++) {
        text += possible.charAt((Math.random() * possible.length) | 0);
    }
    return text;
};

export function randomInt(n: number, m?: number) {
    return m === undefined ? (Math.random() * n) | 0 :
        n + ((Math.random() * (m - n)) | 0);
}
