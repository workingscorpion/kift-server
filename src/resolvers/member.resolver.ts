import { GraphQLResolver } from '../graphql/resolver';
import { CryptoServiceClient } from '../modules';
import { CryptoService } from '../services/crypto.service';

export class MemberResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve(context: any, { id }: any) {
        return null;
    }
}

export class MemberByEmailResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve(context: any, { email }: any) {
        return null;
    }
}

export class MembersResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve(context: any) {
        return null;
    }
}

export class AddMemberResolver implements GraphQLResolver, CryptoServiceClient {
    constructor({ cryptoService }: CryptoServiceClient) {
        this.cryptoService = cryptoService;
    }

    async resolve(context: any, { email, name, password, phone }: any) {
        return null;
    }

    cryptoService: CryptoService;
}

export class UpdateMemberResolver implements GraphQLResolver {
    async resolve(context: { user: any }, { id, name, password }: any) {
        return null;
    }
}
