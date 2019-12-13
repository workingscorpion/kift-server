/**
 * @api {post} /api/v1/teeth/create 치아 기록 생성 API
 * @apiVersion 0.0.0
 * @apiName create teethData
 * @apiGroup Teeth API
 * @apiParam (body) {string} [childrenId] 아이 고유 ObjectId
 * @apiParam (body) {string} [description] 내용
 * @apiParam (body) {string} [isCreatedTime] 생성일
 * @apiParam (body) {boolean} [isUp] 위/아래(true:위, false:아래)
 * @apiParamExample {json} Request-Example:
 *     {
 *      isUp: false,
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      description: "1번 이빨 나감",
 *      isCreatedTime: "19-12-12"
 *     }
 *
 * @apiSampleRequest /api/v1/teeth/create
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
 * @apiSampleRequest /api/v1/teeth/lists
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
 * @apiParam (querystring) {string} [childrenId] 아이 고유 ObjectId
 * @apiSampleRequest /api/v1/teeth/list?childrenId=5dde21b5ab07243d708950a6
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
 * @apiParam (body) {string} [_id] 해당 치아기록 ObjectId
 * @apiParam (body) {string} [childrenId] 아이 고유 ObjectId
 * @apiParam (body) {string} [description] 내용
 * @apiParam (body) {string} [isCreatedTime] 생성일
 * @apiParamExample {json} Request-Example:
 *     {
 *      _id: "5de9b17f2bd7275e046b5b13",
 *      childrenId: "5dde21b5ab07243d708950a6",
 *      description: "1번 이빨 다시 솟아남",
 *      isCreatedTime: "19-12-13"
 *     }
 * @apiSampleRequest /api/v1/teeth/update
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
 * @api {delete} /api/v1/teeth/delete/:id 치아 기록 삭제 API
 * @apiVersion 0.0.0
 * @apiName delete teethData
 * @apiGroup Teeth API
 * @apiParam (url parameter) {string} [id] 삭제할 치아 기록 Object
 * @apiSampleRequest /api/v1/teeth/delete/5deefd47ab07ea58d8f2b76d
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

/**
 * @api {get} /api/v1/teeth/search/:payload 치아기록 검색 API
 * @apiVersion 0.0.0
 * @apiName search Teeth
 * @apiGroup Teeth API
 * @apiParam (url Parameter) {string} payload 검색 키워드
 * @apiParam (querystring) {string} [searchWay] 검색조건(childrenName|parent|description)
 * @apiSampleRequest /api/v1/teeth/search/ydl
 * @apiSuccess {string} _id ObjectId
 * @apiSuccess {string} name 이름
 * @apiSuccess {string} parent 부모계정(이메일)
 * @apiSuccess {string} description 치아메모
 * @apiSuccess {string} isCreatedTime 작성일
 * @apiSuccess {boolean} isUp 윗니, 아랫니(true:위, false: 아래)
 * @apiSuccess {string} childrenId 해당 아이 고유 ID
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     result: [
        {
            _id: "5def101a1abf9e20ccec0200",
            parent: "ydlamia@naver.com",
            name: "spring",
            isUp: true,
            childrenId: "5dde2484e486b02344a4a84f",
            description: "aa",
            isCreatedTime: "19-12-14"
        },
        {
            _id: "5def101a1abf9e20ccec0200",
            parent: "ydlamia@naver.com",
            name: "spring",
            isUp: true,
            childrenId: "5dde2484e486b02344a4a84f",
            description: "aa",
            isCreatedTime: "19-12-14"
        }
    ]
 */
