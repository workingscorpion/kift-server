import * as jsonwebtoken from 'jsonwebtoken';
import { GraphQLResolver } from '../graphql/resolver';
import { MemberModel } from '../models/member.model';
import { EnvServiceClient, CryptoServiceClient } from '../modules';
import { EnvService } from '../services/env.service';
import { CryptoService } from '../services/crypto.service';

export class LoginResolver implements GraphQLResolver, EnvServiceClient, CryptoServiceClient {
    constructor({ envService, cryptoService }: EnvServiceClient & CryptoServiceClient) {
        this.envService = envService;
        this.cryptoService = cryptoService;
    }

    async resolve(context: any, { email, password }: any) {
        const mm = await MemberModel.findOne({ where: { email } });

        // 회원 없음
        if (!mm) {
            return {
                error: -1,
            };
        }

        //
        const hash = this.cryptoService.untwistPassword(password);
        if (!this.cryptoService.matchPassword(hash, mm.password!)) {
            return {
                error: -1,
            };
        }
        
        const data = {
            id: mm.id,
            email: mm.email
        };
        const token = jsonwebtoken.sign(data, this.envService.get().SECRET_KEY,
            { expiresIn: 365 * 86400 });
        return {
            error: 0,
            token
        };
    }

    envService: EnvService;
    cryptoService: CryptoService;
}