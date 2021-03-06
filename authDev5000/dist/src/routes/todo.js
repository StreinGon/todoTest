"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const passport = require("passport");
const todoController = require("@src/controllers/todo/todoController");
const addTodoValidators = require("@src/helpers/validators/addTodoValidators");
const idValidator_1 = require("@src/helpers/validators/idValidator");
const changeTodoValidator_1 = require("@src/helpers/validators/changeTodoValidator");
const getTodoValidator_1 = require("@src/helpers/validators/getTodoValidator");
const otherConstants_1 = require("@src/constants/otherConstants");
const upload = multer({ dest: otherConstants_1.UPLOADS });
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
const router = express.Router();
router.post('/', changeTodoValidator_1.changeTodoValidator, passport.authenticate('jwt', { session: false, failWithError: true }), (req, res) => todoController.changeTodo(req, res));
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
 * "msg": "Task with your title is already being performed"
 * }
 */
router.put('/', passport.authenticate('jwt', { session: false, failWithError: true }), upload.any(), addTodoValidators.addTodoValidator, addTodoValidators.checkForExistingTitle, addTodoValidators.checkForExistingDescription, (req, res) => todoController.addTodo(req, res));
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
router.get('/', passport.authenticate('jwt', { session: false, failWithError: true }), getTodoValidator_1.getTodoValidator, (req, res) => todoController.getTodo(req, res));
router.get('/shared', passport.authenticate('jwt', { session: false, failWithError: true }), idValidator_1.idValidator, (req, res) => todoController.getShared(req, res));
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
router.delete('/', passport.authenticate('jwt', { session: false, failWithError: true }), idValidator_1.idValidator, (req, res) => todoController.deleteTodo(req, res));
exports.default = router;
//# sourceMappingURL=todo.js.map