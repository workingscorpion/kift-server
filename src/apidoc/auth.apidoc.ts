/**
 * @api {post} /api/v1/auth/join 회원가입 API
 * @apiVersion 0.0.0
 * @apiName join
 * @apiGroup Auth API
 * @apiParam {string} email 상세보기할 해당 공지사항 ObjectId
 * @apiParam {string} pw 공지사항 제목
 * @apiParam {string} name 공지사항 내용
 * @apiParam {Date} birth 작성자
 * @apiParam {boolean} isMale 상단고정 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *      "title": "수정된 공지사항 제목입니다",
 *      "description" : "수정된 공지사항 내용입니다",
 *      "writer" : "test@naver.com",
 *      "writedate" : "19-11-20",
 *      "fix" : false
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/board/update/5de089d569296802f0982b44/
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} email 계정(이메일)
 * @apiSuccess {string} name 이름
 * @apiSuccess {Date} birth 생일
 * @apiSuccess {boolean} isMale 성별(true:남, false:여)
 * @apiSuccess {number} joindate 가입일
 * @apiSuccess {object[]} childrenInfo 아이 데이터
 */

/**
 * @api {post} /api/v1/board/update/:id 공지사항 수정 API
 * @apiVersion 0.0.0
 * @apiName board update
 * @apiGroup Auth API
 * @apiParam {string} id 상세보기할 해당 공지사항 ObjectId
 * @apiParam {string} title 공지사항 제목
 * @apiParam {string} description 공지사항 내용
 * @apiParam {string} writer 작성자
 * @apiParam {boolean} fix 상단고정 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *      "title": "수정된 공지사항 제목입니다",
 *      "description" : "수정된 공지사항 내용입니다",
 *      "writer" : "test@naver.com",
 *      "writedate" : "19-11-20",
 *      "fix" : false
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/board/update/5de089d569296802f0982b44/
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} title 공지사항 제목
 * @apiSuccess {string} description 공지사항 내용
 * @apiSuccess {string} writer 작성자
 * @apiSuccess {number} writedate 작성일
 * @apiSuccess {boolean} fix 상단고정 여부
 */

/**
 * @api {post} /api/v1/board/update/:id 공지사항 수정 API
 * @apiVersion 0.0.0
 * @apiName board update
 * @apiGroup Auth API
 * @apiParam {string} id 상세보기할 해당 공지사항 ObjectId
 * @apiParam {string} title 공지사항 제목
 * @apiParam {string} description 공지사항 내용
 * @apiParam {string} writer 작성자
 * @apiParam {boolean} fix 상단고정 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *      "title": "수정된 공지사항 제목입니다",
 *      "description" : "수정된 공지사항 내용입니다",
 *      "writer" : "test@naver.com",
 *      "writedate" : "19-11-20",
 *      "fix" : false
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/board/update/5de089d569296802f0982b44/
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} title 공지사항 제목
 * @apiSuccess {string} description 공지사항 내용
 * @apiSuccess {string} writer 작성자
 * @apiSuccess {number} writedate 작성일
 * @apiSuccess {boolean} fix 상단고정 여부
 */

/**
 * @api {post} /api/v1/board/update/:id 공지사항 수정 API
 * @apiVersion 0.0.0
 * @apiName board update
 * @apiGroup Auth API
 * @apiParam {string} id 상세보기할 해당 공지사항 ObjectId
 * @apiParam {string} title 공지사항 제목
 * @apiParam {string} description 공지사항 내용
 * @apiParam {string} writer 작성자
 * @apiParam {boolean} fix 상단고정 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *      "title": "수정된 공지사항 제목입니다",
 *      "description" : "수정된 공지사항 내용입니다",
 *      "writer" : "test@naver.com",
 *      "writedate" : "19-11-20",
 *      "fix" : false
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/board/update/5de089d569296802f0982b44/
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} title 공지사항 제목
 * @apiSuccess {string} description 공지사항 내용
 * @apiSuccess {string} writer 작성자
 * @apiSuccess {number} writedate 작성일
 * @apiSuccess {boolean} fix 상단고정 여부
 */

/**
 * @api {post} /api/v1/board/update/:id 공지사항 수정 API
 * @apiVersion 0.0.0
 * @apiName board update
 * @apiGroup Auth API
 * @apiParam {string} id 상세보기할 해당 공지사항 ObjectId
 * @apiParam {string} title 공지사항 제목
 * @apiParam {string} description 공지사항 내용
 * @apiParam {string} writer 작성자
 * @apiParam {boolean} fix 상단고정 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *      "title": "수정된 공지사항 제목입니다",
 *      "description" : "수정된 공지사항 내용입니다",
 *      "writer" : "test@naver.com",
 *      "writedate" : "19-11-20",
 *      "fix" : false
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/board/update/5de089d569296802f0982b44/
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} title 공지사항 제목
 * @apiSuccess {string} description 공지사항 내용
 * @apiSuccess {string} writer 작성자
 * @apiSuccess {number} writedate 작성일
 * @apiSuccess {boolean} fix 상단고정 여부
 */

/**
 * @api {post} /api/v1/board/update/:id 공지사항 수정 API
 * @apiVersion 0.0.0
 * @apiName board update
 * @apiGroup Auth API
 * @apiParam {string} id 상세보기할 해당 공지사항 ObjectId
 * @apiParam {string} title 공지사항 제목
 * @apiParam {string} description 공지사항 내용
 * @apiParam {string} writer 작성자
 * @apiParam {boolean} fix 상단고정 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *      "title": "수정된 공지사항 제목입니다",
 *      "description" : "수정된 공지사항 내용입니다",
 *      "writer" : "test@naver.com",
 *      "writedate" : "19-11-20",
 *      "fix" : false
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/board/update/5de089d569296802f0982b44/
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} title 공지사항 제목
 * @apiSuccess {string} description 공지사항 내용
 * @apiSuccess {string} writer 작성자
 * @apiSuccess {number} writedate 작성일
 * @apiSuccess {boolean} fix 상단고정 여부
 */
