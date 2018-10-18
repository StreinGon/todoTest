const { validationResult } = require("express-validator/check");

const Todos = require("../dbModels/todoModel");

const customResponse = require("../customResponse");

const functionForChangeStatusOfTodo = function(req, res) {
  const errors = validationResult(req);
  let Errormsg = "";
  errors.array().forEach(mes => {
    if (Errormsg == "") {
      Errormsg += mes.msg;
    } else {
      Errormsg += "," + mes.msg;
    }
  });
  if (!errors.isEmpty()) {
    return customResponse(res, 422, Errormsg);
  }

  const username = req.body.username;
  return Todos.findOne({ todoOwner: username }, function(err, todo) {
    todo.success = !todo.success;
    todo.save();
    return customResponse(res, 200, "todo status  changed", todo);
  });
};
module.exports = functionForChangeStatusOfTodo;