/**
 * @api {post} /api/v1/data/create 측정데이터 입력 API
 * @apiVersion 0.0.0
 * @apiName create inbodyData
 * @apiGroup Inbody API
 * @apiParam {string} childrenId 아이 고유 ObjectId
 * @apiParam {Object[]} inbodyData 측정 데이터
 * @apiParamExample {json} Request-Example:
 *     {
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      height: 170.0,
 *      weight: 60.0,
 *      headround: 20.0,
 *      sight: 1.5,
 *      waist: 60,
 *      foot: 240,
 *      bodyfat: 15,
 *      muscle: 20,
 *      moisture: 20,
 *      protein: 30,
 *      internalfat: 10,
 *      metabolism: 22,
 *      bonemass: 80,
 *      measureTime: 1231351321321
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/data/create
 * @apiSuccess {boolean} result inbody측정 데이터 입력 성공 여부
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
 * @api {get} /api/v1/data/read/:payload 특정 아이 측정데이터 전체 조회 API
 * @apiVersion 0.0.0
 * @apiName read inbodyData
 * @apiGroup Inbody API
 * @apiParam {string} payload 아이 고유 ObjectId
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/data/read/5dde21b5ab07243d708950a6
 * @apiSuccess {boolean} result inbody측정 데이터 입력 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result: [
 *    {
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      height: 170.0,
 *      weight: 60.0,
 *      headround: 20.0,
 *      sight: 1.5,
 *      waist: 60,
 *      foot: 240,
 *      bodyfat: 15,
 *      muscle: 20,
 *      moisture: 20,
 *      protein: 30,
 *      internalfat: 10,
 *      metabolism: 22,
 *      bonemass: 80,
 *      measureTime: 1231351321321
 *    },
 *    {
 *      height: 175.0,
 *      weight: 62.0,
 *      headround: 21.0,
 *      sight: 1.2,
 *      waist: 60.1,
 *      foot: 245,
 *      bodyfat: 16,
 *      muscle: 20,
 *      moisture: 20,
 *      protein: 30,
 *      internalfat: 10,
 *      metabolism: 22,
 *      bonemass: 80,
 *      measureTime: 1231351325351
 *    }
 *   ]
 */

/**
 * @api {post} /api/v1/data/update 아이 측정데이터 수정 API
 * @apiVersion 0.0.0
 * @apiName update inbodyData
 * @apiGroup Inbody API
 * @apiParam {string} childrenId 아이 고유 ObjectId
 * @apiParam {number} height 키 [생략가능]
 * @apiParam {number} weight 몸무게 [생략가능]
 * @apiParam {number} headround 머리둘레 [생략가능]
 * @apiParam {number} sight 시력 [생략가능]
 * @apiParam {number} waist 허리둘레 [생략가능]
 * @apiParam {number} foot 발크기 [생략가능]
 * @apiParam {number} bodyfat 체지방 [생략가능]
 * @apiParam {number} muscle 근육량 [생략가능]
 * @apiParam {number} moisture 수분량 [생략가능]
 * @apiParam {number} protein 단백질량 [생략가능]
 * @apiParam {number} internalfat 내장지방량 [생략가능]
 * @apiParam {number} metabolism 신진대사량 [생략가능]
 * @apiParam {number} bonemass 골격량 [생략가능]
 * @apiParam {boolean} isMale 성별(true:남, false:여)
 * @apiParam {number} measureTime 측정 시간
 * @apiParamExample {json} Request-Example:
 *     {
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      height: 175.0,
 *      weight: 62.0,
 *      headround: 21.0,
 *      sight: 1.2,
 *      waist: 60.1,
 *      foot: 245,
 *      bodyfat: 16,
 *      muscle: 20,
 *      moisture: 20,
 *      protein: 30,
 *      internalfat: 10,
 *      metabolism: 22,
 *      bonemass: 80,
 *      measureTime: 1231351328132
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/data/update
 * @apiSuccess {boolean} response 수정성공여부
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
 * @api {delete} /api/v1/data/delete 아이데이터 삭제
 * @apiVersion 0.0.0
 * @apiName delete inbodyData
 * @apiGroup Inbody API
 * @apiParam {string} childrenId 아이 고유 ObjectId
 * @apiParam {number} measureTime 측정 시간
 * @apiParamExample {json} Request-Example:
 *     {
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      measureTime: 1575861429408
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/data/delete
 * @apiSuccess {boolean} response 데이터 삭제 성공 여부
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
 * @api {post} /api/v1/data/createChild 아이 생성 API
 * @apiVersion 0.0.0
 * @apiName create Child Component
 * @apiGroup Inbody API
 * @apiParam {string} email 부모 계정(email)
 * @apiParam {string} name 아이 이름
 * @apiParam {Date} birth 생일
 * @apiParam {binary} profile 아이 사진
 * @apiParam {boolean} isMale 성별(true:남, false:여)
 * @apiParamExample {json} Request-Example:
 *     {
 *      email: "test@naver.com",
 *      name: "test",
 *      birth: "19-11-20",
 *      profile: <binary data>
 *      isMale: false
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/data/createChild
 * @apiSuccess {boolean} response 아이 생성 성공 여부
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
