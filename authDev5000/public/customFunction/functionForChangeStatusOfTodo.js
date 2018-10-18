const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");

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
  const token = req.cookies.Authorization;
  const currentUser = jwt.verify(token, secret);
  const username = currentUser.username;
  const title = req.body.title;

  return Todos.find({ todoOwner: username }, function(err, todos) {
    todos.forEach(todo => {
      if(todo.todoName===title){
        todo.success=!todo.success;
        todo.save();
      }
    });
    return customResponse(res, 200, "todo status  changed", todos);
  });
};
module.exports = functionForChangeStatusOfTodo;