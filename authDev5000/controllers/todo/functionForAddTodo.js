const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");

const secret = new Buffer("1", "base64");
const customResponse = require("../../helpers/customResponse/customResponse");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const todoServices = require("../../services/todoServices.js");
const userServices = require("../../services/userServices.js");

const functionForAddTodo = function(req, res) {
  const errors = validationResult(req);
  let Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const title = req.body.title;
  const desc = req.body.description;
  const currentUser = req.user;
  if (currentUser._id === null || currentUser._id === undefined) {
    return customResponse(res, 401, "Unauthorized ");
  }

  const newtodo = todoServices.createNewTodo(title, desc, currentUser._id);
  const id = newtodo._id;
  newtodo.save();
  return userServices.findUserbyUsername(currentUser.username, function(
    err,
    user
  ) {
    userServices.userAddNewTodo(user, id);
    return customResponse(res, 200, "todo created", newtodo);
  });
};

module.exports = functionForAddTodo;
