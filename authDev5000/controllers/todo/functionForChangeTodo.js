const jwt = require("jsonwebtoken");

const secret = new Buffer("1", "base64");
const customResponse = require("../../helpers/customResponse/customResponse");
const todoServices = require("../../services/todoServices.js");

const functionForChangeTodo = function(req, res) {
  const currentUser = req.user;
  const id = currentUser._id;
  const title = req.body.title;
  const status = req.body.success;
  const newDesc = req.body.description;
  let changedTodos = null;
  return todoServices.findTodosByOwnerAndName(id, title, function(err, todos) {
    todoServices.changeTodos(newDesc, status, todos, changedTodos);
    if (changedTodos !== null) {
      return customResponse(res, 200, "todo changed", changedTodos);
    }
    return customResponse(res, 200, "Todo not found");
  });
};
module.exports = functionForChangeTodo;
