const express = require("express");
const router = express.Router();
const passport = require("passport");

const functionForGetTodo = require("../controllers/todo/functionForGetTodo");
const functionForChangeTodo = require("../controllers/todo/functionForChangeTodo");
const functionForAddTodo = require("../controllers/todo/functionForAddTodo");
const functionForDeleteTodo = require("../controllers/todo/functionForDeleteTodo");

const validator = require("../helpers/validators/validatorForAddTodo");
const validatorForDeleteTodo = require("../helpers/validators/validatorForDeleteTodo");
/**
 * @api {post} /todo Change single todo
 * @apiGroup Todo
 *
 * @apiSuccessExample {json} Success
 * {
 *  "msg": "todo changed",
 *  "data": {
 *      "_id": "5bcde5fd2b4e3b1d5890978a",
 *      "todoName": "123245",
 *      "task": "122345",
 *      "success": true,
 *      "todoOwner": "5bc9dea3ef3a9931386555c1",
 *      "__v": 0
 *  }
 * }
 * @apiErrorExample {json}  Error
 * {
 *  "msg": "Todo not found"
 * }
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  functionForChangeTodo
);
/**
 * @api {put} /todo Add single todo
 * @apiGroup Todo
 *
 * @apiSuccessExample {json} Success
 *
 * {
 *  "msg": "todo created",
 *  "data": {
 *       "_id": "5bcde5fd2b4e3b1d5890978a",
 *      "todoName": "123245",
 *      "task": "122345",
 *      "success": false,
 *      "todoOwner": "5bc9dea3ef3a9931386555c1",
 *     "__v": 0
 *  }
 * }
 * @apiErrorExample {json}  Error
 * {
 * "msg": "Task with your title is already being performed,Task with your description is already being performed"
 * }
 */
router.put(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  validator.validatorForAddTodo,
  validator.checkForExistingTitle,
  validator.checkForExistingDescription,
  functionForAddTodo
);
/**
 * @api {get} /todo Delete single todo
 * @apiGroup Todo
 *
 * @apiSuccessExample {json} Success
 * {
 *  "msg": "Todo sended",
 *  "data": {
 *       "_id": "5bcde5fd2b4e3b1d5890978a",
 *      "todoName": "123245",
 *      "task": "122345",
 *      "success": false,
 *      "todoOwner": "5bc9dea3ef3a9931386555c1",
 *     "__v": 0
 *  }
 * }
 * @apiErrorExample {json}  Error
 * {
 *    "msg": "Not found"
 * }
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  functionForGetTodo
);
/**
 * @api {get} /todo Get single todo
 * @apiGroup Todo
 *
 * @apiSuccessExample {json} Success
 * {
 *    "msg": "todo deleted"
 * }
 * @apiErrorExample {json}  Error
 * {
 *    "msg": "Not found"
 * }
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  validatorForDeleteTodo,
  functionForDeleteTodo
);
module.exports = router;
