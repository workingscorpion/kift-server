/**
 * @api {post} /api/v1/upload/single 단일 이미지 저장 API
 * @apiVersion 0.0.0
 * @apiName store a Image
 * @apiGroup Upload API
 * @apiParam {binary} file 이미지
 * @apiParamExample {json} Request-Example:
 *     {
 *      file : <binary data>
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/upload/single
 * @apiSuccess {boolean} response 단일 사진 저장 성공 여부
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
 * @api {post} /api/v1/upload/multi 다수 이미지 저장 API
 * @apiVersion 0.0.0
 * @apiName store Images
 * @apiGroup Upload API
 * @apiParam {binary} files 이미지 데이터(다수)
 * @apiParamExample {json} Request-Example:
 *     {
 *      files : <binary data>
 *     }
 * @apiSampleUrl http://192.168.0.84:3002/api/v1/upload/multi
 * @apiSuccess {boolean} response 다수 사진 저장 성공 여부
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
