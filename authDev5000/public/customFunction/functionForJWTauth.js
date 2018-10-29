const jwt = require("jsonwebtoken");

const Users = require("../dbModels/userModel");
const secret = new Buffer("1", "base64");
const Todos = require("../dbModels/todoModel");
const customResponse = require("../customResponse");

const functionForJWTauth = (req, res) => {
  const token = req.cookies.Authorization;
  const currentUser = jwt.verify(token, secret);
  const startFrom =req.query.startFrom;
  const amount =req.query.amount;
  return Users.findOne({ username: currentUser.username })
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights === 0) {
        return Todos.find({ todoOwner: currentUser._id }, function(
          err,
          todo
        ) {
          if(amount===null||amount===undefined||startFrom===null||startFrom===undefined){
          return customResponse(res, 200, "Login as user", {
            todoList: todo,
            UserRole: user.role.rights
          });
          }
          let end=-1+parseInt(startFrom)+parseInt(amount);
          const todos=todo.slice(startFrom-1, end);
          return customResponse(res, 200, "Login as user", {
            todoList: todos,
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
