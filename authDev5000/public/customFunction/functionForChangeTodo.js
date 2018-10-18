const { validationResult } = require("express-validator/check");

const Todos = require("../dbModels/todoModel");

const customResponse = require("../customResponse");

const functionForChangeTodo = function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return customResponse(res, 422, "Validation  error");
  }

  const username = req.body.username;
  const title = req.body.title;

  const newDesc = req.body.tododesc;
  return Todos.findOne({ todoOwner: username }, function(err, todo) {
    todo.todo.task = newDesc;
    todo.save();
    return customResponse(res, 200, "todo changed", todo);
  });
};
module.exports = functionForChangeTodo;
