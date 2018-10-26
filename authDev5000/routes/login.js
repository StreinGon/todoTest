const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth/authController");
/**
 * @api {post} /users/login Login
 * @apiGroup Users
 * @apiSuccess {String} data JWT Token
 * @apiSuccessExample {json} Success
 * {
 *    "msg": "Login correct",
 *    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmM5ZGVhM2VmM2E5OTMxMzg2NTU1YzEiLCJ1c2VybmFtZSI6Im9yaXZpZGVyY2hpIiwibWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsInJvbGUiOiI1YmM5ZGVhM2VmM2E5OTMxMzg2NTU1YzAiLCJpYXQiOjE1NDAyMTk2NDMsImV4cCI6MTU0MjgxMTY0M30.wvGk6k1NSP38rrTvetI-eaRImNOPAEsuIPWelmtNzm8"
 * }
 * @apiErrorExample {json}  Error
 *     404 Unauthorized
 * {
 *  "msg": "Login incorrect"
 *  }
 */

router.post("/", authController.singIn);

module.exports = router;
