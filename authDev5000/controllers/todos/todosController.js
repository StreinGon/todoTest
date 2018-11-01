const { validationResult } = require("express-validator/check");

const customResponse = require("../../helpers/customResponse/customResponse");
const todoServices = require("../../services/todoServices");
const constants = require("../../constants");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");

const getTodolist = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }

  const currentUser = req.user;
  const { startFrom } = req.query;
  const { amount } = req.query;

  return todoServices
    .find({ todoOwner: currentUser._id })
    .populate("priority")
    .exec((err, todo) => {
      if (!amount || !startFrom) {
        const filteredTodo = todo.sort((a, b) => {
          return a.priority.value - b.priority.value;
        });

        return customResponse(res, 200, "TodoList", {
          todoList: filteredTodo
        });
      }
      const end = -1 + parseInt(startFrom, 10) + parseInt(amount, 10);
      let todos;
      if (todo != null && Array.isArray(todo)) {
        todos = todo.slice(startFrom - 1, end);
      } else {
        todos = todo;
      }
      const filteredTodo = todos.sort((a, b) => {
        return a.priority.value - b.priority.value;
      });
      const amountInt = parseInt(amount, 10);
      const startFromInt = parseInt(startFrom, 10);
      return customResponse(res, 200, "TodoList", {
        todoList: filteredTodo,
        countAlltodo: todos === undefined ? 0 : todos.length,
        startFrom: startFromInt,
        amount: amountInt
      });
    });
};

module.exports = { getTodolist };
