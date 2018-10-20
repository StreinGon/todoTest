const express = require("express");
const router = express.Router();

const functionForGetTodo = require("../public/customFunction/functionForGetTodo");
const functionForChangeTodo = require("../public/customFunction/functionForChangeTodo");
const functionForAddTodo = require("../public/customFunction/functionForAddTodo");
const functionForDeleteTodo = require("../public/customFunction/functionForDeleteTodo");

const validator = require("../public/validators/validatorForAddTodo");
const validatorForDeleteTodo = require("../public/validators/validatorForDeleteTodo");

router.post("/", functionForChangeTodo);
router.put(
  "/",
  validator.validatorForAddTodo,
  validator.checkForExistingTitle,
  validator.checkForExistingDescription,
  functionForAddTodo
);
router.get("/", functionForGetTodo);
router.delete("/", validatorForDeleteTodo, functionForDeleteTodo);
module.exports = router;
