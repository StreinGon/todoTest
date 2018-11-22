import { Router } from 'express';
import { authenticate } from 'passport';

import * as adminController from'@src/controllers/admin/adminController';

import { idValidator } from '@src/helpers/validators/idValidator';
import  { changeTodoAsAdminValidator } from '@src/helpers/validators/changeTodoAsAdminValidator';

const router = Router();

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
router.post(
    '/',
    authenticate('jwt', { session: false, failWithError: true }),
    changeTodoAsAdminValidator,
    (req, res) => adminController.changeTodoAsAdmin(req, res),
);
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
router.get(
    '/users',
    authenticate('jwt', { session: false, failWithError: true }),
    (req, res) => adminController.getUserlist(req, res),
);
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
router.get(
    '/',
    authenticate('jwt', { session: false, failWithError: true }),
    idValidator,
    (req, res) => adminController.getTodolist(req, res),
);
/**
 * @api {get} /report Todos of  users
 * @apiGroup Admin
 */
router.get(
    '/report',
    authenticate('jwt', { session: false, failWithError: true }),
    (req, res) => adminController.getMonthlyReport(req, res),
);
export default router;
