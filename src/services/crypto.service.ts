import CryptoJS from 'crypto-js';
const randomNumber = require('random-number-csprng');
import { EnvServiceClient } from '../modules';

type MyDependencies = EnvServiceClient;

export class CryptoService {

    constructor({ envService }: MyDependencies) {
        this.key = envService.get().SECRET_KEY;
    }

    calcMD5(text: string) {
        return CryptoJS.MD5(text);
    }

    // 텍스트를 암호화하고 Base64로 반환
    encryptAES(text: string, key?: string) {
        const c = CryptoJS.AES.encrypt(text, key || this.key);
        return c.toString();
    }

    // encryptAES에 대응
    decryptAES(cipherText: string, key?: string) {
        const t = CryptoJS.AES.decrypt(cipherText, key || this.key);
        return t.toString(CryptoJS.enc.Utf8);
    }

    // 지정한 자릿수의 랜덤코르를 생성한다.
    // 인증코드 생성에 쓸려고 만듦.
    // csprng를 이용하여 보안성을 갖췄다.
    async generateRandomCode(length: number) {
        const ret = ('' + (await randomNumber(0, Math.pow(10, length)))).padStart(length, '0');
        return ret;
    }

    readonly key: string;
}
