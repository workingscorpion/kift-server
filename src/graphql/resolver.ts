
export interface GraphQLResolver {
    resolve(args?: any): Promise<any>;
}
