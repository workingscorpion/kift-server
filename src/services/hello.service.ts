import { GraphQLResolver } from '../graphql/resolver';

export class HelloService implements GraphQLResolver {
    constructor({ }) {
    }

    async resolve() {
        return 'Hello world!';
    }
}
