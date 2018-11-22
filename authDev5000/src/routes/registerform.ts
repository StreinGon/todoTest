import { Router } from 'express';
import * as  multer from 'multer';

import  * as authController from '@src/controllers/auth/authController';
import * as registrationValidators from '@src/helpers/validators/registrationValidators';
import { UPLOADS } from '@src/constants/otherConstants';

const upload = multer({ dest: UPLOADS });

const router = Router();

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
  registrationValidators.registrationValidator,
  registrationValidators.checkForExistingEmail,
  (req, res) => authController.singUp(req, res),
);

export default router;
