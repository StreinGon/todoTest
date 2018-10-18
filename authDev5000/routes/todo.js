const express = require("express");
const router = express.Router();

const middlewareForChangeTodo = require("../public/middleware/middlewareForChangeTodo");
const middlewareForAddTodo = require("../public/middleware/middlewareForAddTodo");
const validatorForAddTodo = require("../public/validators/validatorForAddTodo");
const validatorForChangeTodo = require("../public/validators/validatorForChangeTodo");

router.post("/change", validatorForChangeTodo, middlewareForChangeTodo);
router.post("/addtodo", validatorForAddTodo, middlewareForAddTodo);
module.exports = router;
