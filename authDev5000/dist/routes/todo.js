"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const router = express.Router();
exports.router = router;
const passport = require('passport');
const todoController = require('../controllers/todo/todoController');
const validator = require('../helpers/validators/addTodoValidators');
const validatorID = require('../helpers/validators/idValidator');
const validatorChange = require('../helpers/validators/changeTodoValidator');
const validatorGet = require('../helpers/validators/getTodoValidator');
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
router.post('/', validatorChange.changeTodoValidator, passport.authenticate('jwt', { session: false, failWithError: true }), (req, res) => todoController.changeTodo(req, res));
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
router.put('/', passport.authenticate('jwt', { session: false, failWithError: true }), upload.any(), validator.addTodoValidator, validator.checkForExistingTitle, validator.checkForExistingDescription, (req, res) => todoController.addTodo(req, res));
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
router.get('/', passport.authenticate('jwt', { session: false, failWithError: true }), validatorGet.getTodoValidator, (req, res) => todoController.getTodo(req, res));
router.get('/shared', passport.authenticate('jwt', { session: false, failWithError: true }), validatorID.idValidator, (req, res) => todoController.GetShared(req, res));
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
router.delete('/', passport.authenticate('jwt', { session: false, failWithError: true }), validatorID.idValidator, (req, res) => todoController.deleteTodo(req, res));
//# sourceMappingURL=todo.js.map