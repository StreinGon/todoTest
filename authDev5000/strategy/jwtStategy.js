const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;

const Users = require("../public/dbModels/userModel");
const secret = new Buffer("1", "base64");
const opts = {};
const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.Authorization;
  }
  return token;
};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = secret;

const jwtStrat = new JwtStrategy(opts, function(jwt_payload, done) {
  return Users.findOne({ username: jwt_payload.username }, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

module.exports = jwtStrat;
