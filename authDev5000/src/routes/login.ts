import { Router } from 'express';

import * as authController from '@src/controllers/auth/authController';

const router = Router();

/**
 * @api {post} /users/login Login
 * @apiGroup Users
 * @apiSuccess {String} data JWT Token
 * @apiSuccessExample {json} Success
 * {
 *    "msg": "Login correct",
 *    "data": "sYXQiOjE1NDAyMTk2NDMsImV4cCI6MTU0Mj38rrTvetI-eaRImNOPAEsuIPWelmtNzm8"
 * }
 * @apiErrorExample {json}  Error
 *     404 Unauthorized
 * {
 *  "msg": "Login incorrect"
 *  }
 */

router.post('/', (req, res) => authController.singIn(req, res));

export default router;
