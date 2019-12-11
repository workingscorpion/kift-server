/**
 * @api {get} /api/v1/admin/queryuser 회원조회 API
 * @apiVersion 0.0.0
 * @apiName  userlist
 * @apiGroup Admin API
 * @apiSampleRequest /api/v1/admin/queryuser
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} email 계정(이메일)
 * @apiSuccess {string} name 이름
 * @apiSuccess {Date} birth 생일
 * @apiSuccess {boolean} isMale 성별(true:남, false:여)
 * @apiSuccess {number} joindate 가입일
 * @apiSuccess {object[]} childrenInfo 아이 Object 목록
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : [
 *      {
 *       _id: "1234567891dafdsdfgsdgds",
 *       email: "test@naver.com",
 *       name: "test",
 *       birth: "2019-07-04",
 *       isMale: true,
 *       joindate: 1574670286464
 *     },
 *      {
 *       _id: "afgf5a13g2a1g3fas3g21",
 *       email: "test2@naver.com",
 *       name: "test2",
 *       birth: "2019-07-05",
 *       isMale: false,
 *       joindate: 1574670286464
 *     }
 *     ]
 */

/**
 * @api {get} /api/v1/admin/queryuser/:email 회원상세조회 API
 * @apiVersion 0.0.0
 * @apiName userInfo
 * @apiGroup Admin API
 * @apiSampleRequest /api/v1/admin/queryuser/test@naver.com
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} email 계정(이메일)
 * @apiSuccess {string} name 이름
 * @apiSuccess {Date} birth 생일
 * @apiSuccess {boolean} isMale 성별(true:남, false:여)
 * @apiSuccess {number} joindate 가입일
 * @apiSuccess {object[]} childrenInfo 아이 데이터
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *       _id: "1234567891dafdsdfgsdgds",
 *       email: "test@naver.com",
 *       name: "test",
 *       birth: "2019-07-04",
 *       isMale: true,
 *       joindate: 1574670286464,
 *       childrenInfo: [
 *          {
 *              _id: "adfg1adf53ga1dfggfd1a35",
 *              parent: "test@naver.com"
 *              name: "baby",
 *              birth: "2019-07-04",
 *              profile: <image binary>,
 *              isMale: true
 *          }
 *       ]
 *     }
 */

/**
 * @api {get} /api/v1/admin/search/:payload 회원검색 API
 * @apiVersion 0.0.0
 * @apiName search User
 * @apiGroup Admin API
 * @apiParam (url Parameter) {string} payload 검색 키워드
 * @apiParam (querystring) {string} [searchWay] 검색조건(email|name)
 * @apiSampleRequest /api/v1/admin/search/test1
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} email 계정(이메일)
 * @apiSuccess {string} name 이름
 * @apiSuccess {Date} birth 생일
 * @apiSuccess {boolean} isMale 성별(true:남, false:여)
 * @apiSuccess {number} joindate 가입일
 * @apiSuccess {object[]} childrenInfo 아이 데이터
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *       _id: "1234567891dafdsdfgsdgds",
 *       email: "test1@naver.com",
 *       name: "test1",
 *       birth: "2019-07-04",
 *       isMale: true,
 *       joindate: 1574670286464,
 *       childrenInfo: [
 *          {
 *              _id: "adfg1adf53ga1dfggfd1a35",
 *              parent: "test1@naver.com"
 *              name: "baby1",
 *              birth: "2019-07-04",
 *              profile: <image binary>,
 *              isMale: true
 *          }
 *       ]
 *     }
 */

/**
 * @api {post} /api/v1/admin/update 회원정보 수정 API
 * @apiVersion 0.0.0
 * @apiName userInfo update
 * @apiGroup Admin API
 * @apiParam (body) {string} [email] 수정할 계정(email)
 * @apiParam (body) {string} [name] 이름(생략가능)
 * @apiParam (body) {Date} [birth] 생일(생략가능)
 * @apiParam (body) {boolean} [isMale] 성별(생략가능)
 * @apiParamExample {json} Request-Example:
 *     {
 *      email: "test@naver.com",
 *      name: "test",
 *      birth : "19-11-30",
 *      isMale : false
 *     }
 * @apiSampleRequest /api/v1/admin/update
 * @apiSuccess {boolean} response 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *      result : true
 *     }
 */

/**
 * @api {post} /api/v1/admin/update/children 아이정보 수정 API
 * @apiVersion 0.0.0
 * @apiName childrenInfo update
 * @apiGroup Admin API
 * @apiParam (body) {string} [email] 부모 계정(email)
 * @apiParam (body) {string} [childId] 수정할 아이 ObjectId
 * @apiParam (body) {string} [name] 아이 이름
 * @apiParam (body) {Date} [birth] 아이 생일
 * @apiParam (body) {boolean} [isMale] 아이 성별
 * @apiParamExample {json} Request-Example:
 *     {
 *      email: "test@naver.com",
 *      childId: "s1dg35sdf1g32s1g",
 *      name: "babytest",
 *      birth: "19-12-30",
 *      isMale: true
 *     }
 * @apiSampleRequest /api/v1/admin/update/children
 * @apiSuccess {boolean} response 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *      result : true
 *     }
 */

/**
 * @api {GET} /api/v1/admin/shutdown 종료 API
 * @apiVersion 0.0.0
 * @apiName admin shutdown
 * @apiGroup Admin API
 * @apiSampleRequest /api/v1/admin/shutdown
 */
