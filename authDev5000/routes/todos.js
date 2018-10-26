const passport = require("passport");
const express = require("express");

const router = express.Router();

const todosQueryValidator = require("../helpers/validators/todosQueryValidator");
const todosController = require("../controllers/todos/todosController");
/**
 * @api {get} /todos List all todo
 * @apiGroup Todos
 * @apiSuccess {Object[]} todos Todo's list
 * @apiSuccess {Integer} countAllTodo Count of user's todo
 * @apiSuccess {Integer} amount requsted amount
 * @apiSuccess {Integer} startForm requsted startFrom
 * @apiSuccess {Integer} Role Role of user
 * @apiSuccessExample {json} Success
 *    200 Login as user
 *    {
 *      "message": "Log in as user",
 *      "data": {
 *             "todos": []
 *             "countAlltodo": 4,
 *             "startFrom": 3,
 *             "amount": 1,
 *             "UserRole": 0
 *      }
 *    }
 * @apiErrorExample {json}  Error
 *     401 Unauthorized
 */
router.get(
  "/",
  todosQueryValidator,
  passport.authenticate("jwt", { session: false, failWithError: true }),
  todosController.getTodolist
);
module.exports = router;
