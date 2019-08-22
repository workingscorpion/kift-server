
import { GraphQLResolver } from '../graphql/resolver';
import fs from 'fs';
import { FileUpload } from 'graphql-upload';

export class UploadResolver implements GraphQLResolver {
    constructor({ }: any) {
    }

    async resolve(context: any, { file }: { file: any }) {
        const fu = (await file) as FileUpload;
        const rstream = fu.createReadStream();
        const ws = fs.createWriteStream(fu.filename);
        rstream.pipe(ws);
        return { filename: fu.filename, mimetype: fu.mimetype, encoding: fu.encoding };
    }
}
