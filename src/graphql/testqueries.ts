//
// 테스트 쿼리들
//
export namespace TestQueries {

export const MutationLogin = `# 로그인 뮤테이션
mutation {
    login(email: "foo@email.com", password: "foo1234#!") {
        error
        token
    }
}`;

export const MutationCreateTestMembers = `# 개발용 테스트 회원 데이타 생성
mutation {
    member1: addMember(email: "foo@email.com", name: "Foo", password: "368BsXOTwr75AG6ESon51IPhn4u6bGs5") { # foo1234#!
        error
        data {
            id
            email
            name
        }
    }
    member2: addMember(email: "bar@email.com", name: "Bar", password: "imqpJaK3/HasbBbEMW9OAujAuKLulHp4") { # bar1234#!
        error
        data {
            id
            email
            name
        }
    }
    member3: addMember(email: "baz@email.com", name: "Baz", password: "sm+sNDrF9jy2HI8qu96re4o05BhfOhl2") { # baz1234#!
        error
        data {
            id
            email
            name
        }
    }
}`;

export const MutationCreateTestMembers2 = `# 개발용 테스트 회원 데이타 생성
mutation {
    member4: addMember(email: "qux@email.com", name: "Qux", password: "qux1234#!") {
        error
        data {
            id
            email
            name
        }
    }
}`;

export const QueryMemberByEmail = `# 멤버 조회 쿼리 예시
query {
    memberByEmail(email: "foo@email.com") {
        id
        email
        name
    }
    members {
        id
        email
        name
    }
}`;

export const QuerySettings = `# 설정 조회 쿼리 예시
query {
    setting(key: "AdminEmail")
    
    settings {
        key
        value
    }
}`;

export const MutationUpdateMember = `# 회원정보 수정
mutation {
    updateMember(id: 1, name: "Goo") {
        error
    }
}`;

export const MutationClearDb = `# DB 클어어
mutation {
    clearDb {
        error
    }
}`;

}