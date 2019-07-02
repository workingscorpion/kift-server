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

export class MembersResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve() {
        const members = await MemberModel.findAll();
        return members.map(r => toGqlMemberType(r));
    }
}
