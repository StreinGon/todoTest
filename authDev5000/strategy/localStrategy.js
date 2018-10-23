const bcrypt = require("bcrypt");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const userServices = require("../services/userServices.js");

const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  function(username, password, done) {
    userServices.findUserbyUsername(username, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
);

module.exports = localStrategy;
