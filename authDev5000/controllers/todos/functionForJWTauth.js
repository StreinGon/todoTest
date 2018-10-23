const customResponse = require("../../helpers/customResponse/customResponse");
const userServices = require("../../services/userServices.js");
const todoServices = require("../../services/todoServices.js");
const Users = require("../../models/userModel");

const functionForJWTauth = (req, res) => {
  const currentUser = req.user;
  const startFrom = req.query.startFrom;
  const amount = req.query.amount;
  userServices
    .findUserbyUsername(currentUser.username)
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights === 0) {
        todoServices.findTodoByOwner(currentUser._id, function(err, todo) {
          if (
            amount === null ||
            amount === undefined ||
            startFrom === null ||
            startFrom === undefined
          ) {
            return customResponse(res, 200, "Login as user", {
              todoList: todo,
              UserRole: user.role.rights
            });
          }
          let end = -1 + parseInt(startFrom) + parseInt(amount);
          const todos = todo.slice(startFrom - 1, end);
          return customResponse(res, 200, "Login as user", {
            todoList: todos,
            countAlltodo: todos.length,
            startFrom: startFrom,
            amount: amount,
            UserRole: user.role.rights
          });
        });
      }
      if (user.role.rights === 1) {
        return customResponse(res, 200, "Login as admin", {
          UserRole: user.role.rights
        });
      }
    });
};
module.exports = functionForJWTauth;
