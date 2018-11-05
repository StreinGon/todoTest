const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const router = express.Router();

const authController = require('../controllers/auth/authController');
const validator = require('../helpers/validators/registrationValidators');

/**
 * @api {get} /todos List all todo
 * @apiGroup Todos
 * @apiSuccessExample {json} Success
 *    200 Registration successfull
 *    {
 *      "msg": "Registration succesfull"
 *    }
 * @apiErrorExample {json}  Error
 *     422 Validation error
 *  {
 *    "msg": "Password must be at least 5 chars long,E-mail already in use"
 *  }
 */

router.post(
  '/',
  upload.single('avatar'),
  validator.registrationValidator,
  validator.checkForExistingEmail,
  (req, res) => authController.singUp(req, res),
);
export default router;
