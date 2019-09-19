import _ from 'lodash';
import { DBServiceClient } from '../modules';
import { DBService } from './db.service';

type MyDependencies = DBServiceClient;

export class SettingsService {
    constructor({ dbService }: MyDependencies) {
        this.dbService = dbService;
    }

    private dbService: DBService;
}
