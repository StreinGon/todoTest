const express = require("express");

const router = express.Router();
const passport = require("passport");

const idValidator = require("../helpers/validators/idValidator");
const authController = require("../controllers/auth/authController");
const userController = require("../controllers/user/userController");
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
  "/logout",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  authController.logout
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  idValidator,
  userController.getUser
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  userController.sendInvite
);
router.post(
  "/inviteToReg",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  userController.sendInviteToReg
);
module.exports = router;
