const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
express.Router({ strict: true });
const router = express.Router();
const passport = require('passport')

const imageController = require('../controllers/image/imageController');
const validatorId = require('../helpers/validators/idValidator');
const validatorResize = require('../helpers/validators/resizeValidator');

/**
 * @api {get} /image/:imagename Image Get single image
 *  * @apiGroup Image
 */
router.get('/:image', validatorResize.resizeValidators, (req, res) => imageController.getImage(req, res));

/**
 * @api {post} /todo/imageAdd/:id Add image to todo
 * @apiGroup Todo
 *
 * @apiSuccessExample {json} Success
 {
    "message": "Todo updated",
    "data": [
        {
            "image": [
                "5bd869012f04b519b42a7a7a",
                "5bd869012f04b519b42a7a7b",
                "5bd86b94730c912db4b2e8b5",
                "5bd86b94730c912db4b2e8b6",
                "5bd86bc3e589992ea0985efd",
                "5bd86bc3e589992ea0985efe",
                "5bd86be73328a12ebc85684e",
                "5bd86be73328a12ebc85684f",
                "5bd86bec3328a12ebc856850",
                "5bd86bec3328a12ebc856851",
                "5bd86bec3328a12ebc856852",
                "5bd86bec3328a12ebc856853",
                "5bd86bed3328a12ebc856854",
                "5bd86bed3328a12ebc856855"
            ],
            "_id": "5bd869012f04b519b42a7a7d",
            "todoName": "assssssAF",
            "task": "assssssAF",
            "success": false,
            "todoOwner": "5bd867f975d51114087b2049",
            "priority": "5bd869012f04b519b42a7a7c",
            "__v": 5
        }
    ],
    "responseTime": "10/30/2018 17:34"
}
 * @apiErrorExample {json}  Error
{
    "message": "Not found",
    "responseTime": "10/30/2018 17:37"
}
 */
router.post(
    '/',
    passport.authenticate('jwt', { session: false, failWithError: true }),
    upload.any(),
    validatorId.idValidator,
    (req, res) => imageController.addImage(req, res),
);
router.get('/download/all', imageController.downloadAllAssets);
export { router };
