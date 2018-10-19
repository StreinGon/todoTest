const jwt = require("jsonwebtoken");
const passport = require("passport");

const secret = new Buffer("1", "base64");
const customResponse = require("../customResponse");

const functionForLocalAuth = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) throw err;
    if (!user) {
      return customResponse(res, 400, "Login incorrect");
    }
    req.logIn(user, function(err) {
      if (err) throw err;
      const changedUser = {
        _id: user._id,
        username: user.username,
        mail: user.mail,
        role: user.role
      };
      const token = jwt.sign(changedUser, secret, {
        expiresIn: 86400 * 30
      });

      res.cookie("Authorization", token);
      return customResponse(res, 200, "Login correct", token);
    });
  })(req, res, next);
};
module.exports = functionForLocalAuth;
