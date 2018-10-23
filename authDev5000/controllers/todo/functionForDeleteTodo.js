const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const secret = new Buffer("1", "base64");
const customResponse = require("../../helpers/customResponse/customResponse");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const todoServices = require("../../services/todoServices.js");

const functionForDeleteTodo = function(req, res) {
  const errors = validationResult(req);
  let Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const currentUser = req.user;
  const id = currentUser._id;
  const title = req.body.title;
  todoServices.findTodosByOwner(id, function(err, todos) {
    todoServices.deleteTodo(todos, title);
    if (todos != null) return customResponse(res, 201, "todo deleted");
    else {
      return customResponse(res, 201, "Not found");
    }
  });
};
module.exports = functionForDeleteTodo;
