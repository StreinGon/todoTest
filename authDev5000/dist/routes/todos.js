"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const express = require('express');
const router = express.Router();
const { todosQueryValidator } = require('../helpers/validators/todosQueryValidator');
const todosController = require('../controllers/todos/todosController');
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
 *{
 *   "message": "Log in as user",
 *   "data": {
 *       "todoList": [
 *           {
 *               "image": [
 *                  "5bd8606adf3e0031609c725d",
 *                   "5bd8606adf3e0031609c725e"
 *               ],
 *                "_id": "5bd8606adf3e0031609c7260",
 *                "todoName": "asssassafasfas",
 *                "task": "sassasaasfasfs",
 *                "success": false,
 *                "todoOwner": "5bd86057df3e0031609c725c",
 *                "priority": {
 *                    "_id": "5bd8606adf3e0031609c725f",
 *                    "value": 1,
 *                    "__v": 0
 *                },
 *                "__v": 0
 *            }
 *       ],
 *        "UserRole": 0
 *    },
 *    "responseTime": "10/30/2018 16:45"
 *}
 * @apiErrorExample {json}  Error
 *     401 Unauthorized
 */
router.get('/', todosQueryValidator, passport.authenticate('jwt', { session: false, failWithError: true }), (req, res) => todosController.getTodolist(req, res));
exports.default = router;
//# sourceMappingURL=todos.js.map