import { Router } from 'express';
import { authenticate } from 'passport';

import { idValidator }  from'@src/helpers/validators/idValidator';

import * as  authController from '@src/controllers/auth/authController';
import * as userController  from'@src/controllers/user/userController';

/**
 * @api {post} /users/logout Logout
 * @apiGroup Users
 * @apiSuccessExample {json} Success
 *  200 Logout
 *  {
 *   "msg": "LogOut"
 *  }
 */
const router = Router();

router.post(
  '/logout',
  authenticate('jwt', { session: false, failWithError: true }),
  (req, res) => authController.logout(req, res),
);

router.get(
  '/',
  authenticate('jwt', { session: false, failWithError: true }),
  idValidator,
  (req, res) => userController.getUser(req, res),
);

router.post(
  '/',
  authenticate('jwt', { session: false, failWithError: true }),
  (req, res) => userController.sendInvite(req, res),
);

router.post(
  '/inviteToReg',
  authenticate('jwt', { session: false, failWithError: true }),
  (req, res) => userController.sendInviteToReg(req, res),
);
export default router;
