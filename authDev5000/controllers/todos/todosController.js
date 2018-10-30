const { validationResult } = require("express-validator/check");

const customResponse = require("../../helpers/customResponse/customResponse");
const userServices = require("../../services/userServices");
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

  return userServices
    .find({ username: currentUser.username })
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights === 0) {
        return todoServices
          .find({ todoOwner: currentUser._id })
          .populate("priority")
          .exec((err, todo) => {
            if (!amount || !startFrom) {
              const filteredTodo = todo.sort((a, b) => {
                return a.priority.value - b.priority.value;
              });

              return customResponse(
                res,
                200,
                constants.statusConstants.LOGIN_USER,
                {
                  todoList: filteredTodo,
                  UserRole: user.role.rights
                }
              );
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
            return customResponse(
              res,
              200,
              constants.statusConstants.LOGIN_USER,
              {
                todoList: filteredTodo,
                countAlltodo: todos === undefined ? 0 : todos.length,
                startFrom: startFromInt,
                amount: amountInt,
                UserRole: user.role.rights
              }
            );
          });
      }
      if (user.role.rights === 1) {
        return customResponse(res, 200, constants.statusConstants.LOGIN_ADMIN, {
          UserRole: user.role.rights
        });
      }
      return null;
    });
};
module.exports = { getTodolist };
