const { validationResult } = require("express-validator/check");

const customResponse = require("../../helpers/customResponse/customResponse");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const userServices = require("../../services/userServices.js");
const todoServices = require("../../services/todoServices.js");
const constants = require("../../constants");
const changeTodoAsAdmin = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }

  return userServices
    .find({ username: req.user.username })
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights !== 1) {
        return customResponse(res, 422, "Use must login as admin");
      }
      const { idTodo } = req.query;
      const { idUser } = req.query;
      if (!idTodo || !idUser) {
        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
      }

      return userServices
        .find({ _id: idUser })
        .then(user => {
          if (!user) {
            return customResponse(
              res,
              422,
              constants.statusConstants.NOT_FOUND
            );
          }
          const check = todoServices.changeTodosAsAdmin(idTodo, idUser);
          return check.then(todo => {
            if (!todo) {
              return customResponse(
                res,
                422,
                constants.statusConstants.NOT_FOUND
              );
            }
            return customResponse(
              res,
              200,
              constants.statusConstants.TODO_UPDATED,
              todo
            );
          });
        })
        .catch(err => err);
    });
};
const getUserlist = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  return userServices
    .find({ username: req.user.username })
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights === 1) {
        return userServices
          .find()
          .then(users => {
            return customResponse(res, 200, "UsersList", users);
          })
          .catch(err => err);
      }
      return customResponse(res, 422, "You must login as admin");
    });
};
const getTodolist = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const { userID } = req.query;
  return userServices
    .find({ username: req.user.username })
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights === 1) {
        return userServices.find({ _id: userID }).then(user => {
          if (!user || user.length < 1) {
            return customResponse(res, 422, "User Not found");
          }
          return todoServices.findAll({ todoOwner: user._id }).then(todo => {
            return customResponse(res, 200, "Todo list of user", {
              todoList: todo
            });
          });
        });
      }
      return customResponse(res, 422, "You must login as admin");
    });
};
module.exports = { getUserlist, changeTodoAsAdmin, getTodolist };
