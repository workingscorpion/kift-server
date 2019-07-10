import { GraphQLResolver } from '../graphql/resolver';
import { EnvServiceClient, DBServiceClient } from '../modules';
import { EnvService } from '../services/env.service';
import { DBService } from '../services/db.service';

export class ClearDbResolver implements GraphQLResolver, EnvServiceClient, DBServiceClient {
    constructor({ envService, dbService }: EnvServiceClient & DBServiceClient) {
        this.envService = envService;
        this.dbService = dbService;
    }

    async resolve(context: any) {
        await Promise.all(Object.values(this.dbService.sequelize.models).map(model => {
            return model.destroy({ truncate: true });
        }));
        return {
            error: 0,
        };
    }

    envService: EnvService;
    dbService: DBService;
}
