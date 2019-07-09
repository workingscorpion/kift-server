
export interface GraphQLResolver {
    resolve(context: any, args?: any): Promise<any>;
}
