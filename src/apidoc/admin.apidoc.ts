/**
 * @api {get} /api/v1/admin/queryuser 회원조회 API
 * @apiVersion 0.0.0
 * @apiName  userlist
 * @apiGroup Admin API
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/admin/queryuser
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} email 계정(이메일)
 * @apiSuccess {string} name 이름
 * @apiSuccess {Date} birth 생일
 * @apiSuccess {boolean} isMale 성별(true:남, false:여)
 * @apiSuccess {object[]} children 아이 Object 목록
 */

/**
 * @api {get} /api/v1/admin/queryuser/:email 회원상세조회 API
 * @apiVersion 0.0.0
 * @apiName userInfo
 * @apiGroup Admin API
 * @apiParam {string} email 상세보기할 사용자 계정(email)
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/admin/queryuser/test@naver.com
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} email 계정(이메일)
 * @apiSuccess {string} name 이름
 * @apiSuccess {Date} birth 생일
 * @apiSuccess {boolean} isMale 성별(true:남, false:여)
 * @apiSuccess {number} joindate 가입일
 * @apiSuccess {object[]} childrenInfo 아이 데이터
 */

/**
 * @api {get} /api/v1/admin/search/:payload 회원검색 API
 * @apiVersion 0.0.0
 * @apiName search user
 * @apiGroup Admin API
 * @apiParam {string} payload 검색할 키워드
 * @apiParam {string} searchWay 검색조건(email | name)
 * @apiSampleUrl http://localhost:3002/api/v1/admin/search/test1?searchWay=email
 * @apiSampleUrl http://localhost:3002/api/v1/admin/search/test2?searchWay=name
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} email 계정(이메일)
 * @apiSuccess {string} name 이름
 * @apiSuccess {Date} birth 생일
 * @apiSuccess {boolean} isMale 성별(true:남, false:여)
 * @apiSuccess {number} joindate 가입일
 * @apiSuccess {object[]} childrenInfo 아이 데이터
 */

/**
 * @api {post} /api/v1/admin/update/:payload 회원정보 수정 API
 * @apiVersion 0.0.0
 * @apiName userInfo update
 * @apiGroup Admin API
 * @apiParam {string} payload 수정할 계정(email)
 * @apiParam {string} name 공지사항 제목[생략 가능]
 * @apiParam {Date} birth 공지사항 내용[생략 가능]
 * @apiParam {boolean} isMale 작성자[생략 가능]
 * @apiParamExample {json} Request-Example:
 *     {
 *      "name": "테스트",
 *      "birth" : "19-11-30",
 *      "isMale" : false
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/admin/update/test@naver.com
 * @apiSuccess {boolean} response 성공 여부
 */
