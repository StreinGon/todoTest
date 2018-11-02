const { validationResult } = require("express-validator/check");

const customResponse = require("../../helpers/customResponse/customResponse");
const todoServices = require("../../services/todoServices");
const userCheck = require("../../helpers/userCheck/userCheck");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");

const getTodolist = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  userCheck(req, res);
  const currentUser = req.user;
  const { startFrom } = req.query;
  const { amount } = req.query;
  const { sortType } = req.query;
  const amountInt = parseInt(amount, 10);
  const startFromInt = parseInt(startFrom, 10);
  const { sortDirection } = req.query;
  const sortParametr = `${
    sortDirection === "descending" ? "-" : ""
  }${sortType}`;
  return todoServices
    .find({ todoOwner: currentUser._id })
    .skip(startFromInt)
    .limit(amountInt)
    .populate("priority")
    .sort(sortParametr)
    .exec((err, todo) => {
      if (!amount || !startFrom) {
        return customResponse(res, 200, "TodoList", {
          todoList: todo
        });
      }
      return customResponse(res, 200, "TodoList", {
        todoList: todo,
        countAlltodo: todo.length,
        startFrom: startFromInt,
        amount: amountInt
      });
    });
};

module.exports = { getTodolist };
