const Users = require("../public/javascripts/users");
var jwt = require("jsonwebtoken");
var secret = new Buffer("1", "base64");
const Todo = require("../public/javascripts/proj");
const passport = require("passport");
const CustomRes = require("../public/CustomRes");
const JWT = (req, res) => {
  const token = req.cookies.Authorization;
  const userS = jwt.verify(token, secret);
  return Users.findOne({ username: userS.username })
    .populate("role")
    .exec((err, user) => {
      if (user.role.rights === 0) {
        return Todo.findOne({ todoOwner: userS.username }, function(err, todo) {
          return CustomRes(res, 200, "Login as user", {
            todoList: todo,
            UserRole: user.role.rights
          });
        });
      }
      if (user.role.rights === 1) {
        return CustomRes(res, 200, "Login as admin", {
          UserRole: user.role.rights
        });
      }
    });
};
const Local = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) throw err;
    if (!user) {
      return CustomRes(res, 400, "Login incorrect");
    }
    req.logIn(user, function(err) {
      if (err) throw err;
      const changedUser = {
        username: user.username,
        mail: user.mail,
        role: user.role
      };
      const token = jwt.sign(changedUser, secret, {
        expiresIn: 86400 * 30
      });
      res.cookie("Authorization", token);
      return CustomRes(res, 200, "Login correct", token);
    });
  })(req, res, next);
};

module.exports = { JWT, Local };
