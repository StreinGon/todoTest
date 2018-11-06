const bcrypt = require('bcrypt');

const passportLocal = require('passport-local');

const userServices = require('../services/userServices');

const localStrategy = new passportLocal.Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    userServices
      .find({ username })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        if (err) {
          done(err);
        }
      });
  },
);
export { localStrategy };
