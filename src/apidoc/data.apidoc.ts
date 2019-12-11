/**
 * @api {post} /api/v1/data/create 측정데이터 입력 API
 * @apiVersion 0.0.0
 * @apiName create inbodyData
 * @apiGroup Inbody API
 * @apiParam {string} childrenId 아이 고유 ObjectId
 * @apiParam {number} height 키
 * @apiParam {number} weight 몸무게
 * @apiParam {number} BPD 머리둘레
 * @apiParam {number} rightSight 오른쪽 시력
 * @apiParam {number} leftSight 왼쪽 시력
 * @apiParam {number} waist 허리 둘레
 * @apiParam {number} foot 발 사이즈
 * @apiParam {number} bodyFatRate 체지방율
 * @apiParam {number} muscleRate 근육비율
 * @apiParam {number} bodyWaterRate 체수분율
 * @apiParam {number} protein 단백질율
 * @apiParam {number} visceralFat 내장지방
 * @apiParam {number} BMR 신진대사율
 * @apiParam {number} bonemass 골격량
 * @apiParamExample {json} Request-Example:
 *     {
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      height: 170.0,
 *      weight: 60.0,
 *      BPD: 20.0,
 *      rightSight: 1.5,
 *      leftSight: 1.2,
 *      waist: 60,
 *      foot: 240,
 *      bodyFatRate: 15,
 *      muscleRate: 20,
 *      bodyWaterRate: 20,
 *      protein: 30,
 *      visceralFat: 10,
 *      BMR: 22,
 *      bonemass: 80,
 *      measureTime: 1231351321321
 *     }
 * @apiSampleRequest http://192.168.0.84:3002/api/v1/data/create
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
 * @api {get} /api/v1/data/list 측정기록 전체 조회 API
 * @apiVersion 0.0.0
 * @apiName show list of data
 * @apiGroup Inbody API
 * @apiSampleRequest http://192.168.0.84:3002/api/v1/data/list
 * @apiSuccess {boolean} result inbody측정 기록 전체 데이터
 * @apiSuccessExample {json} Success-Response:
 *     {
        result: [
            {
                _id: "5dedbcb53ee3e02dbcaea507",
                measureTime: 1575861429408,
                childrenId: "5dde21b5ab07243d708950a6",
                inbodydata: [
                    {
                        _id: "5dde21b5ab07243d708950a6",
                        parent: "test@naver.com",
                        name: "준기",
                        birth: "2018-11-06",
                        profile: null,
                        isMale: false
                    }
                ]
            },
            {
                _id: "5dedbd99613b0947e4efb82e",
                measureTime: 1575861657559,
                childrenId: "5dde21b5ab07243d708950a6",
                inbodydata: [
                    {
                        _id: "5dde21b5ab07243d708950a6",
                        parent: "test@naver.com",
                        name: "준기",
                        birth: "2018-11-06",
                        profile: null,
                        isMale: false
                    }
                ]
            }
        ]
    }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Error
 *     result : {
 *          result : false
 *     }
 */

/**
 * @api {get} /api/v1/data/select 특정데이터 조회 API
 * @apiVersion 0.0.0
 * @apiName show specific inbodyData
 * @apiGroup Inbody API
 * @apiParam {string} id 특정데이터 ObjectId
 * @apiSampleRequest http://192.168.0.84:3002/api/v1/data/select?id=5dedbcb53ee3e02dbcaea507
 * @apiSuccess {boolean} result 특정 데이터 조회 결과
 * @apiSuccessExample {json} Success-Response:
 *     {
        result: {
            _id: "5dedbcb53ee3e02dbcaea507",
            childrenId: "5dde21b5ab07243d708950a6",
            height: 170,
            weight: 60,
            BMI: 20.76,
            BPD: 20,
            sight: {
            left: 1.5,
            right: 1.2
            },
            waist: 60,
            foot: 240,
            bodyFatRate: 15,
            muscleRate: 20,
            bodyWaterRate: 20,
            protein: 30,
            visceralFat: 10,
            BMR: 22,
            bonemass: 80,
            measureTime: 1575861429408
        }
    }
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
 * @apiSampleRequest http://192.168.0.84:3002/api/v1/data/read/5dde21b5ab07243d708950a6
 * @apiSuccess {boolean} result inbody측정 데이터 입력 성공 여부
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result: [
 *    {
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      height: 170.0,
 *      weight: 60.0,
 *      BPD: 20.0,
 *      sight: 1.5,
 *      waist: 60,
 *      foot: 240,
 *      bodyFatRate: 15,
 *      muscleRate: 20,
 *      bodyWaterRate: 20,
 *      protein: 30,
 *      visceralFat: 10,
 *      BMR: 22,
 *      bonemass: 80,
 *      measureTime: 1231351321321
 *    },
 *    {
 *      height: 175.0,
 *      weight: 62.0,
 *      BPD: 21.0,
 *      sight: 1.2,
 *      waist: 60.1,
 *      foot: 245,
 *      bodyFatRate: 16,
 *      muscleRate: 20,
 *      bodyWaterRate: 20,
 *      protein: 30,
 *      visceralFat: 10,
 *      BMR: 22,
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
 * @apiParam {number} BPD 머리둘레 [생략가능]
 * @apiParam {number} sight 시력 [생략가능]
 * @apiParam {number} waist 허리둘레 [생략가능]
 * @apiParam {number} foot 발크기 [생략가능]
 * @apiParam {number} bodyFatRate 체지방 [생략가능]
 * @apiParam {number} muscleRate 근육량 [생략가능]
 * @apiParam {number} bodyWaterRate 수분량 [생략가능]
 * @apiParam {number} protein 단백질량 [생략가능]
 * @apiParam {number} visceralFat 내장지방량 [생략가능]
 * @apiParam {number} BMR 신진대사량 [생략가능]
 * @apiParam {number} bonemass 골격량 [생략가능]
 * @apiParam {number} measureTime 측정 시간
 * @apiParamExample {json} Request-Example:
 *     {
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      height: 175.0,
 *      weight: 62.0,
 *      BPD: 21.0,
 *      sight: 1.2,
 *      waist: 60.1,
 *      foot: 245,
 *      bodyFatRate: 16,
 *      muscleRate: 20,
 *      bodyWaterRate: 20,
 *      protein: 30,
 *      visceralFat: 10,
 *      BMR: 22,
 *      bonemass: 80,
 *      measureTime: 1231351328132
 *     }
 * @apiSampleRequest http://192.168.0.84:3002/api/v1/data/update
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
 * @api {delete} /api/v1/data/delete 아이데이터 삭제 API
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
 * @apiSampleRequest http://192.168.0.84:3002/api/v1/data/delete
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
 * @apiSampleRequest http://192.168.0.84:3002/api/v1/data/createChild
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
