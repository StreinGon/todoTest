const express = require('express');

const router = express.Router();
const passport = require('passport');

const validatorID = require('../helpers/validators/idValidator');
const authController = require('../controllers/auth/authController');
const userController = require('../controllers/user/userController');
/**
 * @api {post} /users/logout Logout
 * @apiGroup Users
 * @apiSuccessExample {json} Success
 *  200 Logout
 *  {
 *   "msg": "LogOut"
 *  }
 */
router.post(
  '/logout',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  (req, res) => authController.logout(req, res),
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  validatorID.idValidator,
  (req, res) => userController.getUser(req, res),
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  (req, res) => userController.sendInvite(req, res),
);
router.post(
  '/inviteToReg',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  (req, res) => userController.sendInviteToReg(req, res),
);
export  { router };
