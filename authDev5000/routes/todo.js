const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const router = express.Router();
const passport = require("passport");

const todoController = require("../controllers/todo/todoController");

const validator = require("../helpers/validators/addTodoValidators");
const deleteTodoValidators = require("../helpers/validators/deleteTodoValidators");
const changeTodoValidator = require("../helpers/validators/changeTodoValidator");
const getTodoValidator = require("../helpers/validators/getTodoValidator");

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
  changeTodoValidator,
  todoController.changeTodo
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
  upload.any(),
  validator.addTodoValidator,
  validator.checkForExistingTitle,
  validator.checkForExistingDescription,
  todoController.addTodo
);
/**
 * @api {get} /todo Get single todo
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
  getTodoValidator,
  todoController.getTodo
);
/**
 * @api {delete} /todo delete single todo
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
  deleteTodoValidators,
  todoController.deleteTodo
);
router.post(
  "/imageAdd",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  upload.any(),
  todoController.addImage
);
module.exports = router;
