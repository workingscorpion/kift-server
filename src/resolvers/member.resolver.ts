import { GraphQLResolver } from '../graphql/resolver';
import { MemberModel } from '../models/member.model';

function toGqlMemberType(mm: MemberModel) {
    return {
        id: mm.id,
        email: mm.email,
        name: mm.name
    };
}

export class MemberResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve({ id }: any) {
        const r = await MemberModel.findOne({ where: { id } });
        if (!r) { return null; }
        return toGqlMemberType(r);
    }
}

export class MemberByEmailResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve({ email }: any) {
        const r = await MemberModel.findOne({ where: { email } });
        if (!r) { return null; }
        return toGqlMemberType(r);
    }
}

export class MembersResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve() {
        const members = await MemberModel.findAll();
        return members.map(r => toGqlMemberType(r));
    }
}

export class AddMemberResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve({ email, name, password, phone }: any) {
        try {
            const r = await MemberModel.create({
                email, name, password
            });
            return { error: 0, data: toGqlMemberType(r) };
        } catch (e) {
            return { error: -1 };
        }
    }
}
