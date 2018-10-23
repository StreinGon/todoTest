const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");

const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const todoServices = require("../../services/todoServices");
const secret = new Buffer("1", "base64");
const customResponse = require("../../helpers/customResponse/customResponse");

const functionForGetTodo = function(req, res) {
  const errors = validationResult(req);
  let Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const currentUser = req.user;
  const id = req.query.id;
  todoServices.findTodoByOwnerAndId(currentUser._id, id, function(err, todo) {
    if (todo != null) {
      return customResponse(res, 200, "Todo sended", todo);
    } else {
      return customResponse(res, 200, "not found");
    }
  });
};
module.exports = functionForGetTodo;
