const passport = require("passport");
const express = require("express");
const router = express.Router();

const functionForJWTauth = require("../controllers/todos/functionForJWTauth");
/**
 * @api {get} /todos List all todo
 * @apiGroup Todos
 * @apiSuccess {Object[]} todos Todo's list
 * @apiSuccess {ObjectId} _id DB id of todo
 * @apiSuccess {String} todoName Title of todo
 * @apiSuccess {String} task Task of todo
 * @apiSuccess {Boolean} success Status of todo
 * @apiSuccess {ObjectId} _id DB id of todo
 * @apiSuccessExample {json} Success
 *    200 Login as user
 *    [{
 *      "_id": 5bc9debeef3a9931386555c2
 *      "todoName": "Study",
 *      "task": "task",
 *      "success": false,
 *      "todoOwner":5bc9dea3ef3a9931386555c1
 *    }]
 * @apiErrorExample {json}  Error
 *     404 Unauthorized
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  functionForJWTauth
);
module.exports = router;
