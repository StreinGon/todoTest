"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
exports.router = router;
const passport = require('passport');
const adminController = require('../controllers/admin/adminController');
const adminValidator = require('../helpers/validators/changeTodoAsAdminValidator');
/**
 * @api {post} /admin Change todo owner
 * @apiGroup Admin
 * @apiSuccessExample {json} Success
{
    "message": "Todo updated",
    "data": { },
    "responseTime": "10/30/2018 17:43"
}
 * @apiErrorExample {json}  Error
 *     422 Unauthorized
{
    "message": "You must login as admin",
    "responseTime": "10/30/2018 17:27"
}
 */
router.post('/', passport.authenticate('jwt', { session: false, failWithError: true }), adminValidator.changeTodoAsAdminValidator, (req, res) => adminController.changeTodoAsAdmin(req, res));
/**
 * @api {get} /admin/users User list for admin
 * @apiGroup Admin
 * @apiSuccessExample {json} Success
{
    "message": "UsersList",
    "data": [
        {
            "todos": [
                "5bd869012f04b519b42a7a7d"
            ],
            "_id": "5bd867f975d51114087b2049",
            "username": "testetA",
            "password": "$2b$10$A9fXfS1l2JHEWIrv6S3wVuX0hDgL2FWcgwxI3cohN8vidqiAnD3ES",
            "mail": "teste2r@mail.con",
            "role": "5bd867f975d51114087b2048",
            "__v": 1
        }
    ],
    "responseTime": "10/30/2018 17:41"
}
 * @apiErrorExample {json}  Error
 *     422 Unauthorized
{
    "message": "You must login as admin",
    "responseTime": "10/30/2018 17:27"
}
 */
router.get('/users', passport.authenticate('jwt', { session: false, failWithError: true }), (req, res) => adminController.getUserlist(req, res));
/**
 * @api {get} /admin Todos of  users
 * @apiGroup Admin
 * @apiSuccessExample {json} Success
{
    "message": "Todo list of user",
    "data": {
        "todoList": []
    },
    "responseTime": "10/30/2018 17:46"
}
 * @apiErrorExample {json}  Error
 *     422 Unauthorized
{
    "message": "You must login as admin",
    "responseTime": "10/30/2018 17:27"
}
 */
router.get('/', passport.authenticate('jwt', { session: false, failWithError: true }), (req, res) => adminController.getTodolist(req, res));
router.get('/report', passport.authenticate('jwt', { session: false, failWithError: true }), (req, res) => adminController.getMonthlyReport(req, res));
//# sourceMappingURL=admin.js.map