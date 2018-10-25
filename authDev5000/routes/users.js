const express = require('express');

const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth/authController');
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
  authController.logout
);
module.exports = router;
