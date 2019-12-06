/**
 * @api {post} /api/v1/teeth/create 치아 기록 생성 API
 * @apiVersion 0.0.0
 * @apiName create teethData
 * @apiGroup Teeth API
 * @apiParam {string} childrenId 아이 고유 ObjectId
 * @apiParam {string} description 내용
 * @apiParam {string} isCreatedTime 생성일
 * @apiParam {boolean} isUp 위/아래(true:위, false:아래)
 * @apiParamExample {json} Request-Example:
 *     {
 *      isUp: false,
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      description: "1번 이빨 나감",
 *      isCreatedTime: "19-12-12"
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/teeth/create
 * @apiSuccess {boolean} result 데이터 저장 성공 여부
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
 * @api {get} /api/v1/teeth/lists 전체 치아 기록 조회 API
 * @apiVersion 0.0.0
 * @apiName teethData list
 * @apiGroup Teeth API
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/teeth/lists
 * @apiSuccess {object[]} result 모든 치아 기록
 * @apiSuccessExample {json} Success-Response:
 * {
    result: [
        {
        _id: "5dde22df8b48c720501eefa7",
        childrenId: "5dde22df8b48c720501eefa7",
        description: "3번 이빨 나감",
        isCreatedTime: "19-12-12",
        parent: "test@naver.com",
        name: "지수"
        },
        {
        _id: "5dde22df8b48c720501eefa7",
        childrenId: "5dde2431f61b345a40550c15",
        description: "148번 이빨 나감",
        isCreatedTime: "19-12-12",
        parent: "test@naver.com",
        name: "지수"
        },
        {
        _id: "5dde22df8b48c720501eefa7",
        childrenId: "5dde2484e486b02344a4a84f",
        description: "이가 싹다 나감",
        isCreatedTime: "19-12-12",
        parent: "test@naver.com",
        name: "지수"
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
 * @api {get} /api/v1/teeth/list 특정 아이 치아 기록 조회 API
 * @apiVersion 0.0.0
 * @apiName read a teethData
 * @apiGroup Teeth API
 * @apiParam {string} childrenId 아이 고유 ObjectId
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/teeth/list?childrenId=5dde21b5ab07243d708950a6
 * @apiSuccess {boolean} result 데이터 조회 성공 여부
 * @apiSuccessExample {json} Success-Response:
 * {
    "result": [
        {
            "_id": "5de9b17f2bd7275e046b5b13",
            "childrenId": "5dde21b5ab07243d708950a6",
            "description": "1번 이빨 나감",
            "isCreatedTime": "19-12-12"
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
 * @api {post} /api/v1/teeth/update 치아 기록 수정 API
 * @apiVersion 0.0.0
 * @apiName update teethData
 * @apiGroup Teeth API
 * @apiParam {string} _id 해당 치아기록 ObjectId
 * @apiParam {string} childrenId 아이 고유 ObjectId
 * @apiParam {string} description 내용
 * @apiParam {string} isCreatedTime 생성일
 * @apiParamExample {json} Request-Example:
 *     {
 *      _id: "5de9b17f2bd7275e046b5b13",
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      description: "1번 이빨 다시 솟아남",
 *      isCreatedTime: "19-12-13"
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/teeth/update
 * @apiSuccess {boolean} result 데이터 수정 성공 여부
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
 * @api {delete} /api/v1/teeth/delete 치아 기록 삭제 API
 * @apiVersion 0.0.0
 * @apiName delete teethData
 * @apiGroup Teeth API
 * @apiParam {string} _id 해당 치아기록 ObjectId
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/teeth/delete/5de9b17f2bd7275e046b5b13
 * @apiSuccess {boolean} result 데이터 삭제 성공 여부
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
