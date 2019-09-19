import * as jsonwebtoken from 'jsonwebtoken';
import { GraphQLResolver } from '../graphql/resolver';
import { EnvServiceClient, CryptoServiceClient } from '../modules';
import { EnvService } from '../services/env.service';
import { CryptoService } from '../services/crypto.service';

export class LoginResolver implements GraphQLResolver, EnvServiceClient, CryptoServiceClient {
    constructor({ envService, cryptoService }: EnvServiceClient & CryptoServiceClient) {
        this.envService = envService;
        this.cryptoService = cryptoService;
    }

    async resolve(context: any, { email, password }: any) {
        return {
            error: 0,
            token: ''
        };
    }

    envService: EnvService;
    cryptoService: CryptoService;
}
