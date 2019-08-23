import { GraphQLResolver } from '../graphql/resolver';
import { MessageBoardModel } from '../models/messageboard.model';
import { nameof } from '../lib/utils';


export class MessageListResolver implements GraphQLResolver {
    async resolve(context: any, { boardId, offset, limit }: { boardId: string, offset?: number, limit?: number }) {
        const messages = await MessageBoardModel.findAll({
            where: {
                board_id: boardId
            },
            offset, limit,
            order: [ ['upload_time', 'DESC'] ]
        });
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
            return {
                error: 0,
                message: {
                    id: message!.id,
                    subject: message!.subject,
                    content: message!.content,
                    date: message!.upload_time,
                }
            };
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

// 글 수정
export class UpdateMessageResolver implements GraphQLResolver {
    async resolve(context: any, { id, subject, content }: { id: number, subject?: string, content?: string }) {
        const fields = [];
        if (subject) { fields.push(nameof<MessageBoardModel>('subject')); }
        if (content) { fields.push(nameof<MessageBoardModel>('content')); }
        const res = await MessageBoardModel.update({
            subject,
            content
        }, { where: { id }, fields });
        if (res[0] == 0) {
            return { error: -1 };
        }
        return { error: 0 };
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
