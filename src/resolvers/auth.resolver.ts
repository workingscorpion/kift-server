import * as jsonwebtoken from 'jsonwebtoken';
import { GraphQLResolver } from '../graphql/resolver';
import { MemberModel } from '../models/member.model';
import { EnvServiceClient } from '../modules';
import { EnvService } from '../services/env.service';

export class LoginResolver implements GraphQLResolver, EnvServiceClient {
    constructor({ envService }: EnvServiceClient) {
        this.envService = envService;
    }

    async resolve(context: any, { email, password }: any) {
        const mm = await MemberModel.findOne({ where: { email } });

        // 회원 없음
        if (!mm) {
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
}