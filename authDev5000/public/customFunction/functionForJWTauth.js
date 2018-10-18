const jwt = require("jsonwebtoken");

const Users = require("../dbModels/userModel");
const secret = new Buffer("1", "base64");
const Todos = require("../dbModels/todoModel");
const customResponse = require("../customResponse");

const functionForJWTauth = (req, res) => {
  const token = req.cookies.Authorization;
  const currentUser = jwt.verify(token, secret);
  return Users.findOne({ username: currentUser.username })
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights === 0) {
        return Todos.findOne({ todoOwner: currentUser.username }, function(
          err,
          todo
        ) {
          return customResponse(res, 200, "Login as user", {
            todoList: todo,
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
