const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator/check");

const TodoModel = require("../dbModels/todoModel");
const Users = require("../dbModels/userModel");

const secret = new Buffer("1", "base64");
const customResponse = require("../customResponse");

const middlewareForAddTodo = function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return customResponse(res, 422, "Validation  error");
  }
  const title = req.body.todotitle;
  const desc = req.body.tododesc;
  const token = req.cookies.Authorization;
  const currentUser = jwt.verify(token, secret);
  console.log(currentUser);
  const newtodo = new TodoModel({
    _id: new mongoose.Types.ObjectId(),
    todo: { todoName: title, task: desc },
    success: false,
    todoOwner: currentUser.username
  });
  const id = newtodo._id;
  newtodo.save();
  return Users.findOne({ username: currentUser.username }, function(err, user) {
    user.todos.push(id);
    user.save();
    return customResponse(res, 200, "todo created", newtodo);
  });
};

module.exports = middlewareForAddTodo;
