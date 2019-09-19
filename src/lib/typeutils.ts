
// nameof 연산자 - 타입에 존재하는 필드명인지 정적으로 검사하는 함수
// https://schneidenbach.gitbooks.io/typescript-cookbook/nameof-operator.html
export const nameof = <T>(name: keyof T) => name;

