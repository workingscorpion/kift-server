import { GraphQLResolver } from '../graphql/resolver';


export class MessageListResolver implements GraphQLResolver {
    async resolve(context: any, { boardId, offset, limit }: { boardId: string, offset?: number, limit?: number }) {
        return null;
    }
}

export class MessageBoardInfoResolver implements GraphQLResolver {
    async resolve(context: any, { boardId }: { boardId: string }) {
        return null;
    }
}

export class MessageDataResolver implements GraphQLResolver {
    async resolve(context: any, { id }: { id: number }) {
        return null;
    }
}

export class UploadMessageResolver implements GraphQLResolver {
    async resolve(context: any, { boardId, subject, content }: { boardId: string, subject: string, content: string }) {
        return null;
    }
}

// 글 수정
export class UpdateMessageResolver implements GraphQLResolver {
    async resolve(context: any, { id, subject, content }: { id: number, subject?: string, content?: string }) {
        return null;
    }
}

export class RemoveMessageResolver implements GraphQLResolver {
    async resolve(context: any, { id }: { id: number }) {
        return null;
    }
}
