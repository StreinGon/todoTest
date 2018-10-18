const express = require("express");
const router = express.Router();

const functionForChangeTodo = require("../public/customFunction/functionForChangeTodo");
const functionForAddTodo = require("../public/customFunction/functionForAddTodo");
const functionForChangeStatusOfTodo = require("../public/customFunction/functionForChangeStatusOfTodo");
const validatorForAddTodo = require("../public/validators/validatorForAddTodo");
const validatorForChangeTodo = require("../public/validators/validatorForChangeTodo");
const validatorForChangeStatusOfTodo = require("../public/validators/validatorForChangeStatusOfTodo");


router.post("/change", validatorForChangeTodo, functionForChangeTodo);
router.post("/addtodo", validatorForAddTodo, functionForAddTodo);
router.post("/changeStatus",validatorForChangeStatusOfTodo,functionForChangeStatusOfTodo);
module.exports = router;
