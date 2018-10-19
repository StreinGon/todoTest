const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");

const Todos = require("../dbModels/todoModel");
const secret = new Buffer("1", "base64");
const customResponse = require("../customResponse");

const functionForGetTodo = function(req, res) {
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

  const title = req.query.title;
  let requestedTodo;
  return Todos.find({ todoOwner: username }, function(err, todos) {
    todos.forEach(todo => {
      if (todo.todoName === title) {
        requestedTodo = todo;
      }
    });
    return customResponse(res, 200, "Todo sended", requestedTodo);
  });
};
module.exports = functionForGetTodo;
