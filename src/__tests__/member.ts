import '../index';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-koa';
import { globalServer } from '../server';
import { TestQueries } from '../graphql/testqueries';

const { query, mutate } = createTestClient(globalServer);

describe('Member mutations', async () => {
    await it('can add members', async () => {

        await mutate({
            mutation: gql(TestQueries.MutationClearDb)
        });

        await mutate({
            mutation: gql(TestQueries.MutationCreateTestMembers)
        });
        
        const res = await query({
            query: gql(TestQueries.QueryMemberByEmail)
        });
        expect((res.data as any).members).toHaveLength(3);
    });

    await it('can add members again', async () => {

        await mutate({
            mutation: gql(TestQueries.MutationCreateTestMembers2)
        });
        
        const res = await query({
            query: gql(TestQueries.QueryMemberByEmail)
        });
        expect((res.data as any).members).toHaveLength(4);
    });
});
