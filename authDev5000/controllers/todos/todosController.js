const customResponse = require("../../helpers/customResponse/customResponse");
const userServices = require("../../services/userServices");
const todoServices = require("../../services/todoServices");
const constants = require("../../constants");

const getTodolist = (req, res) => {
  const currentUser = req.user;
  const { startFrom } = req.query;
  const { amount } = req.query;
  userServices
    .find({ username: currentUser.username })
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights === 0) {
        return todoServices
          .find({ todoOwner: currentUser._id })
          .then(todo => {
            if (
              amount === null ||
              amount === undefined ||
              startFrom === null ||
              startFrom === undefined
            ) {
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
            const todos = todo.slice(startFrom - 1, end);
            return customResponse(
              res,
              200,
              constants.statusConstants.LOGIN_USER,
              {
                todoList: todos,
                countAlltodo: todos.length,
                startFrom,
                amount,
                UserRole: user.role.rights
              }
            );
          })
          .catch(err => {
            if (err) {
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
