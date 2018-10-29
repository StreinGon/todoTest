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
          .then(todo => {
            if (!amount || !startFrom) {
              return customResponse(
                res,
                200,
                constants.statusConstants.LOGIN_USER,
                {
                  todoList: todo,
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
            const amountInt = parseInt(amount, 10);
            const startFromInt = parseInt(startFrom, 10);
            return customResponse(
              res,
              200,
              constants.statusConstants.LOGIN_USER,
              {
                todoList: todos,
                countAlltodo: todos === undefined ? 0 : todos.length,
                startFrom: startFromInt,
                amount: amountInt,
                UserRole: user.role.rights
              }
            );
          })
          .catch(err => {
            if (err) {
              console.log(err);
              return err;
            }
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
