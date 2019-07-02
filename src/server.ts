import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import { AwilixContainer } from 'awilix';
import { GraphQLResolver } from './graphql/resolver';
import { ResolverModules } from './modules';

export class AppServer {

    constructor() {
    }

    async start(container: AwilixContainer) {
        // Construct a schema, using GraphQL schema language
        const typeDefs = gql`
        type Query {
            hello: String
        }
        `;

        function createResolver(name: keyof ResolverModules) {
            return async () => {
                const resolver = container.resolve(name) as GraphQLResolver;
                return await resolver.resolve();
            };
        }

        // Provide resolver functions for your schema fields
        const resolvers = {
            Query: {
                hello: createResolver('helloService'),
            },
        };

        const server = new ApolloServer({ typeDefs, resolvers });

        const app = new Koa();
        server.applyMiddleware({ app });
        // alternatively you can get a composed middleware from the apollo server
        // app.use(server.getMiddleware());

        app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`), );
    }
}