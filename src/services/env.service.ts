import yenv from 'yenv';

interface EnvironmentVariables {
    PORT: number;
    APP_TITLE: string;
    LOG_DIR: string;
    UPLOAD_DIR: string;
    SECRET_KEY: string;
    DB_HOST: string;
    DB_ID: string;
    DB_PW: string;
    DB_PORT: number;
    DB_NAME: string;
    BODYDATA_PATH: string;
}

export class EnvService {
    constructor({}: any) {
        this.env = yenv();
    }

    isProductionMode() {
        return process.env.NODE_ENV === 'production';
    }

    isDevelopmentMode() {
        return !this.isProductionMode();
    }

    isTestMode() {
        return process.env.NODE_ENV === 'test';
    }

    get(): EnvironmentVariables {
        return this.env;
    }

    env: any;
}
