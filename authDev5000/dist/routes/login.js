"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
exports.router = router;
const authController = require('../controllers/auth/authController');
/**
 * @api {post} /users/login Login
 * @apiGroup Users
 * @apiSuccess {String} data JWT Token
 * @apiSuccessExample {json} Success
 * {
 *    "msg": "Login correct",
 *    "data": "sYXQiOjE1NDAyMTk2NDMsImV4cCI6MTU0MjgxMTY0M30.wvGk6k1NSP38rrTvetI-eaRImNOPAEsuIPWelmtNzm8"
 * }
 * @apiErrorExample {json}  Error
 *     404 Unauthorized
 * {
 *  "msg": "Login incorrect"
 *  }
 */
router.post('/', (req, res) => authController.singIn(req, res));
//# sourceMappingURL=login.js.map