/**
 * @api {post} /api/v1/auth/join 회원가입 API
 * @apiVersion 0.0.0
 * @apiName join
 * @apiGroup Auth API
 * @apiParam (body) {string} [email] 계정(email)
 * @apiParam (body) {string} [pw] pw(hashed)
 * @apiParam (body) {string} [name] 이름
 * @apiParam (body) {Date} [birth] 생일
 * @apiParam (body) {boolean} [isMale] 성별(true:남, false:여)
 * @apiParamExample {json} Request-Example:
 *     {
 *      email: "test@naver.com",
 *      pw: "test1234!",
 *      name: "test",
 *      birth: "19-11-20",
 *      isMale: false
 *     }
 * @apiSampleRequest /api/v1/auth/join
 * @apiSuccess {boolean} response 회원가입 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *          result : true
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Error
 *     result : {
 *          result : false
 *     }
 */

/**
 * @api {post} /api/v1/auth/login 로그인 API
 * @apiVersion 0.0.0
 * @apiName login
 * @apiGroup Auth API
 * @apiParam (body) {string} [email="test2@naver.com"] 계정(email)
 * @apiParam (body) {string} [pw="test"] pw
 * @apiParamExample {json} Request-Example:
 *     {
 *      email: "test@naver.com",
 *      pw: "test1234!"
 *     }
 * @apiSampleRequest /api/v1/auth/login
 * @apiSuccess {boolean} response 로그인 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *          result : true
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Error
 *     result : {
 *          result : false
 *     }
 */

/**
 * @api {get} /api/v1/auth/findid ID 찾기 API
 * @apiVersion 0.0.0
 * @apiName findid
 * @apiGroup Auth API
 * @apiParam (querystring) {string} [name=walter] 이름
 * @apiParam (querystring) {Date} [birth="1993-12-31"] 생일
 * @apiSampleRequest /api/v1/auth/findid
 * @apiSuccess {string} email 계정
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *          email : "test@naver.com"
 *     }
 */

/**
 * @api {post} /api/v1/auth/findpw PW 찾기 API
 * @apiVersion 0.0.0
 * @apiName findpw
 * @apiGroup Auth API
 * @apiParam (body) {string} [email="test3@naver.com"] 계정(email)
 * @apiParamExample {json} Request-Example:
 *     {
 *      email: "test@naver.com"
 *     }
 * @apiSampleRequest /api/v1/auth/findpw
 * @apiSuccess {boolean} result 변경 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *          result : true
 *     }
 */

/**
 * @api {post} /api/v1/auth/changepw 비밀번호 수정 API
 * @apiVersion 0.0.0
 * @apiName pw update
 * @apiGroup Auth API
 * @apiParam (body) {string} [email] 계정(email)
 * @apiParam (body) {string} [name] 이름
 * @apiParam (body) {Date} [birth] 생일
 * @apiParam (body) {string} [pw] 비밀번호
 * @apiParam (body) {string} [newpw] 수정할 비밀번호
 * @apiParamExample {json} Request-Example:
 *     {
 *      email: "test@naver.com",
 *      name: "test",
 *      birth: "19-11-20",
 *      pw: "test1234!",
 *      newpw: "test4321!"
 *     }
 * @apiSampleRequest /api/v1/auth/changepw
 * @apiSuccess {boolean} result 비밀번호 수정 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *          result : true
 *     }
 */

/**
 * @api {post} /api/v1/auth/signout 회원 탈퇴 API
 * @apiVersion 0.0.0
 * @apiName signout
 * @apiGroup Auth API
 * @apiParam (body) {string} [email] 계정(email)
 * @apiParam (body) {string} [pw] 비밀번호
 * @apiParamExample {json} Request-Example:
 *     {
 *      email: "test@naver.com",
 *      pw: "test1234!"
 *     }
 * @apiSampleRequest /api/v1/auth/signout
 * @apiSuccess {boolean} result 회원탈퇴 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *          result : true
 *     }
 *     ------------------------
 *     result : {
 *          result : false
 *     }
 *
 */
