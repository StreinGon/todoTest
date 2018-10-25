const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

const userServices = require("../services/userServices.js");

const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  (username, password, done) => {
    userServices
      .find({ username })
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(err => {
        if (err) {
          done(err);
        }
      });
  }
);

module.exports = localStrategy;
