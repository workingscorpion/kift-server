/**
 * @api {post} /api/v1/board/create 공지사항 생성 API
 * @apiVersion 0.0.0
 * @apiName board create
 * @apiGroup Board API
 * @apiParam (body) {string} [title] 공지사항 제목
 * @apiParam (body) {string} [description] 공지사항 내용
 * @apiParam (body) {string} [writer] 작성자
 * @apiParam (body) {boolean} [fix] 상단고정 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *      title: "공지사항 제목입니다",
 *      description: "공지사항 내용입니다",
 *      writer: "admin@naver.com",
 *      fix: true
 *     }
 * @apiSampleRequest /api/v1/board/create
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} title 공지사항 제목
 * @apiSuccess {string} description 공지사항 내용
 * @apiSuccess {string} writer 작성자
 * @apiSuccess {number} writedate 작성일
 * @apiSuccess {boolean} fix 상단고정 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *       _id: "1234567891dafdsdfgsdgds",
 *       title: "공지사항 제목",
 *       description: "공지사항 내용",
 *       writer: "admin@naver.com",
 *       writedate: "19-12-01",
 *       fix: true
 *     }
 */
/**
 * @api {get} /api/v1/board/adlist 공지사항 조회 API(관리자)
 * @apiVersion 0.0.0
 * @apiName board admin list
 * @apiGroup Board API
 * @apiSampleRequest /api/v1/board/adlist
 * @apiSuccess {object[]} trueresult 공지사항 상위고정 리스트
 * @apiSuccess {object[]} allresult 공지사항 전체 리스트
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *      trueresult: [
 *          {
 *          _id: "s5fg1f3a5g1aafsdg",
 *          title: "공지 test",
 *          description: "test 내용",
 *          writer: "admin@naver.com",
 *          writedate: 213513517413521,
 *          fix:true,
 *          count:0
 *          },
 *          {
 *          _id: "1531531ghd35dg1h3",
 *          title: "공지 test2",
 *          description: "test 내용2",
 *          writer: "admin@naver.com",
 *          writedate: 135153831521351,
 *          fix:true,
 *          count: 12
 *          }
 *      ],
 *      allresult: [
 *          {
 *          _id: "s5fg1f3a5g1aafsdg",
 *          title: "공지 test",
 *          description: "test 내용",
 *          writer: "admin@naver.com",
 *          writedate: 213513517413521,
 *          fix:true,
 *          count: 0
 *          },
 *          {
 *          _id: "1531531ghd35dg1h3",
 *          title: "공지 test2",
 *          description: "test 내용2",
 *          writer: "admin@naver.com",
 *          writedate: 135153831521351,
 *          fix:true,
 *          count: 12
 *          },
 *          {
 *          _id: "12335153fgj1g5f3135",
 *          title: "공지 test3",
 *          description: "test 내용3",
 *          writer: "admin@naver.com",
 *          writedate: 13513512152311,
 *          fix:false,
 *          count: 54
 *          }
 *      ]
 *     }
 */

/**
 * @api {get} /api/v1/board/list 공지사항 조회 API(사용자)
 * @apiVersion 0.0.0
 * @apiName board list
 * @apiGroup Board API
 * @apiSampleRequest /api/v1/board/list
 * @apiSuccess {object[]} trueresult 공지사항 상위고정 리스트
 * @apiSuccess {object[]} allresult 공지사항 전체 리스트
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *      trueresult: [
 *          {
 *          _id: "s5fg1f3a5g1aafsdg",
 *          title: "공지 test",
 *          writedate: 213513517413521
 *          },
 *          {
 *          _id: "1531531ghd35dg1h3",
 *          title: "공지 test2",
 *          writedate: 135153831521351
 *          }
 *      ],
 *      allresult: [
 *          {
 *          _id: "s5fg1f3a5g1aafsdg",
 *          title: "공지 test",
 *          writedate: 213513517413521
 *          },
 *          {
 *          _id: "1531531ghd35dg1h3",
 *          title: "공지 test2",
 *          writedate: 135153831521351
 *          },
 *          {
 *          _id: "12335153fgj1g5f3135",
 *          title: "공지 test3",
 *          writedate: 13513512152311
 *          }
 *      ]
 *     }
 */

/**
 * @api {get} /api/v1/board/read/:id 공지사항 상세조회 API
 * @apiVersion 0.0.0
 * @apiName board read
 * @apiGroup Board API
 * @apiParam (querystring) {string} [id] 상세보기할 해당 공지사항 ObjectId
 * @apiSampleRequest /api/v1/board/read/5de089d569296802f0982b44/
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} title 공지사항 제목
 * @apiSuccess {string} description 공지사항 내용
 * @apiSuccess {string} writer 작성자
 * @apiSuccess {number} writedate 작성일
 * @apiSuccess {boolean} fix 상단고정 여부
 * @apiSuccess {number} count 조회수
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *       _id: "1234567891dafdsdfgsdgds",
 *       title: "공지사항 제목",
 *       description: "공지사항 내용",
 *       writer: "admin@naver.com",
 *       writedate: "19-12-01",
 *       fix: true,
 *       count: 10
 *     }
 */

/**
 * @api {post} /api/v1/board/update/:id 공지사항 수정 API
 * @apiVersion 0.0.0
 * @apiName board update
 * @apiGroup Board API
 * @apiParam (body) {string} [id] 상세보기할 해당 공지사항 ObjectId
 * @apiParam (body) {string} [title] 공지사항 제목
 * @apiParam (body) {string} [description] 공지사항 내용
 * @apiParam (body) {string} [writer] 작성자
 * @apiParam (body) {boolean} [fix] 상단고정 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *      title: "수정된 공지사항 제목입니다",
 *      description: "수정된 공지사항 내용입니다",
 *      writer: "admin2@naver.com",
 *      writedate: "19-11-20",
 *      fix: false
 *     }
 * @apiSampleRequest /api/v1/board/update/5de089d569296802f0982b44/
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} title 공지사항 제목
 * @apiSuccess {string} description 공지사항 내용
 * @apiSuccess {string} writer 작성자
 * @apiSuccess {number} writedate 작성일
 * @apiSuccess {boolean} fix 상단고정 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result : {
 *       _id: "1234567891dafdsdfgsdgds",
 *       title: "수정된 공지사항 제목입니다",
 *       description: "수정된 공지사항 내용입니다",
 *       writer: "admin@naver.com",
 *       writedate: "19-11-20",
 *       fix: false,
 *       count: 10
 *     }
 */

/**
 * @api {delete} /api/v1/board/delete/:id 공지사항 삭제 API(상세보기)
 * @apiVersion 0.0.0
 * @apiName board delete one
 * @apiGroup Board API
 * @apiSampleRequest /api/v1/board/delete/5de089d569296802f0982b44/
 * @apiParam (querystring) {string} [id] 삭제할 해당 공지사항 ObjecgId
 */

/**
 * @api {post} /api/v1/board/delete 공지사항 삭제 API(리스트)
 * @apiVersion 0.0.0
 * @apiName board delete multiple
 * @apiGroup Board API
 * @apiParam (body) {string[]} [query] 삭제할 공지사항 ObjectId Array
 * @apiSampleRequest /api/v1/board/delete
 * @apiParamExample {string[]} Request-Example:
 *     {
 *      [
 *          0: "sd1g53ds1g3s51g",
 *          1: "fdh153df1h35df13",
 *          2: "df51h3fd51h35df41",
 *          3: "df5h13fd5h1df351",
 *      ]
 *     }
 */
