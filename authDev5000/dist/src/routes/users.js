"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const idValidator_1 = require("@src/helpers/validators/idValidator");
const authController = require("@src/controllers/auth/authController");
const userController = require("@src/controllers/user/userController");
/**
 * @api {post} /users/logout Logout
 * @apiGroup Users
 * @apiSuccessExample {json} Success
 *  200 Logout
 *  {
 *   "msg": "LogOut"
 *  }
 */
const router = express_1.Router();
router.post('/logout', passport_1.authenticate('jwt', { session: false, failWithError: true }), (req, res) => authController.logout(req, res));
router.get('/', passport_1.authenticate('jwt', { session: false, failWithError: true }), idValidator_1.idValidator, (req, res) => userController.getUser(req, res));
router.post('/', passport_1.authenticate('jwt', { session: false, failWithError: true }), (req, res) => userController.sendInvite(req, res));
router.post('/inviteToReg', passport_1.authenticate('jwt', { session: false, failWithError: true }), (req, res) => userController.sendInviteToReg(req, res));
exports.default = router;
//# sourceMappingURL=users.js.map