const express = require("express");
const router = express.Router();
const passport = require("passport");

const functionForJWTauth = require("../public/customFunction/functionForJWTauth");
const functionForChangeTodo = require("../public/customFunction/functionForChangeTodo");
const functionForAddTodo = require("../public/customFunction/functionForAddTodo");
const functionForChangeStatusOfTodo = require("../public/customFunction/functionForChangeStatusOfTodo");
const functionForDeleteTodo = require("../public/customFunction/functionForDeleteTodo");
const validator = require("../public/validators/validatorForAddTodo");
const validatorForChangeTodo = require("../public/validators/validatorForChangeTodo");
const validatorForChangeStatusOfTodo = require("../public/validators/validatorForChangeStatusOfTodo");
const validatorForDeleteTodo = require("../public/validators/validatorForDeleteTodo");

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  functionForJWTauth
);
router.post("/change", validatorForChangeTodo, functionForChangeTodo);
router.put(
  "/addtodo",
  validator.validatorForAddTodo,
  validator.checkForExistingTitle,
  validator.checkForExistingDescription,
  functionForAddTodo
);
router.post(
  "/changeStatus",
  validatorForChangeStatusOfTodo,
  functionForChangeStatusOfTodo
);
router.delete("/delete", validatorForDeleteTodo, functionForDeleteTodo);
module.exports = router;
