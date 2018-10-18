const express = require("express");
const router = express.Router();

const functionForChangeTodo = require("../public/customFunction/functionForChangeTodo");
const functionForAddTodo = require("../public/customFunction/functionForAddTodo");
const validatorForAddTodo = require("../public/validators/validatorForAddTodo");
const validatorForChangeTodo = require("../public/validators/validatorForChangeTodo");

router.post("/change", validatorForChangeTodo, functionForChangeTodo);
router.post("/addtodo", validatorForAddTodo, functionForAddTodo);
module.exports = router;
