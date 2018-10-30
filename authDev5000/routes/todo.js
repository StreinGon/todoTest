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
/**
 * @api {post} /todo/imageAdd/:id Add image to todo
 * @apiGroup Todo
 *
 * @apiSuccessExample {json} Success
 {
    "message": "Todo updated",
    "data": [
        {
            "image": [
                "5bd869012f04b519b42a7a7a",
                "5bd869012f04b519b42a7a7b",
                "5bd86b94730c912db4b2e8b5",
                "5bd86b94730c912db4b2e8b6",
                "5bd86bc3e589992ea0985efd",
                "5bd86bc3e589992ea0985efe",
                "5bd86be73328a12ebc85684e",
                "5bd86be73328a12ebc85684f",
                "5bd86bec3328a12ebc856850",
                "5bd86bec3328a12ebc856851",
                "5bd86bec3328a12ebc856852",
                "5bd86bec3328a12ebc856853",
                "5bd86bed3328a12ebc856854",
                "5bd86bed3328a12ebc856855"
            ],
            "_id": "5bd869012f04b519b42a7a7d",
            "todoName": "assssssAF",
            "task": "assssssAF",
            "success": false,
            "todoOwner": "5bd867f975d51114087b2049",
            "priority": "5bd869012f04b519b42a7a7c",
            "__v": 5
        }
    ],
    "responseTime": "10/30/2018 17:34"
}
 * @apiErrorExample {json}  Error
{
    "message": "Not found",
    "responseTime": "10/30/2018 17:37"
}
 */
router.post(
  "/imageAdd",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  upload.any(),
  deleteTodoValidators,
  todoController.addImage
);
module.exports = router;
