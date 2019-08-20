import { GraphQLResolver } from '../graphql/resolver';
import { MessageBoardModel } from '../models/messageboard.model';


export class MessageListResolver implements GraphQLResolver {
    async resolve(context: any, { boardId }: { boardId: string }) {
        const messages = await MessageBoardModel.findAll();
        const a = messages.map(m => ({
            id: m.id,
            subject: m.subject,
            date: m.upload_time,
        }));
        return {
            error: 0,
            messages: a
        };
    }
}

export class MessageDataResolver implements GraphQLResolver {
    async resolve(context: any, { id }: { id: number }) {
        const message = await MessageBoardModel.findOne({
            where: { id }
        });
        if (message) {
            return { error: 0, message: { id: message!.id, subject: message!.subject, content: message!.content } };
        } else {
            return { error: -1 };
        }
    }
}

export class UploadMessageResolver implements GraphQLResolver {
    async resolve(context: any, { boardId, subject, content }: { boardId: string, subject: string, content: string }) {
        const ret = await MessageBoardModel.create({
            board_id: boardId,
            subject: subject,
            content: content,
            upload_time: ~~(Date.now() / 1000),
        });
        return { error: 0, message: { id: ret.id, boardId, subject, content  } };
    }
}

export class RemoveMessageResolver implements GraphQLResolver {
    async resolve(context: any, { id }: { id: number }) {
        await MessageBoardModel.destroy({
            where: { id }
        });
        return { error: 0 };
    }
}
