const express = require("express");
const router = express.Router();

const functionForGetTodo = require("../public/customFunction/functionForGetTodo");
const functionForChangeTodo = require("../public/customFunction/functionForChangeTodo");
const functionForAddTodo = require("../public/customFunction/functionForAddTodo");
const functionForDeleteTodo = require("../public/customFunction/functionForDeleteTodo");

const validator = require("../public/validators/validatorForAddTodo");
const validatorForDeleteTodo = require("../public/validators/validatorForDeleteTodo");
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
router.post("/", functionForChangeTodo);
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
router.get("/", functionForGetTodo);
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
router.delete("/", validatorForDeleteTodo, functionForDeleteTodo);
module.exports = router;
