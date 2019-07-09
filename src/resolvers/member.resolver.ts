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

    async resolve(context: any, { id }: any) {
        const r = await MemberModel.findOne({ where: { id } });
        if (!r) { return null; }
        return toGqlMemberType(r);
    }
}

export class MemberByEmailResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve(context: any, { email }: any) {
        const r = await MemberModel.findOne({ where: { email } });
        if (!r) { return null; }
        return toGqlMemberType(r);
    }
}

export class MembersResolver implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve(context: any) {
        const members = await MemberModel.findAll();
        return members.map(r => toGqlMemberType(r));
    }
}

export class AddMemberResolver implements GraphQLResolver {
    async resolve(context: any, { email, name, password, phone }: any) {
        try {
            const r = await MemberModel.create({
                email, name, password
            });
            const data = toGqlMemberType(r);
            return { error: 0, data };
        } catch (e) {
            return { error: -1 };
        }
    }
}

export class UpdateMemberResolver implements GraphQLResolver {
    async resolve(context: { user: any }, { id, name, password }: any) {
        try {
            // 인증 정보가 없거나 권한 없음
            if (!context.user || context.user.id != id) {
                return { error: -1 };
            }

            // 멤버 정보 업데이트
            const [count,] = await MemberModel.update({ name, password }, { where: { id } });
            if (count == 0) {
                return { error: -1 };
            }
            return { error: 0 };
        } catch (e) {
            return { error: -1 };
        }
    }
}
