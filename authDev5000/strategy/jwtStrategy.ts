import { Request } from "express-serve-static-core";

const JwtStrategy = require('passport-jwt').Strategy;
const userServices = require('../services/userServices');

const secret = Buffer.from('1', 'base64');
const opts = <any>{

};

const cookieExtractor = (req: Request): String => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.Authorization;
  }
  return token;
};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = secret;

const jwtStrategy = new JwtStrategy(opts, (jwtPayload, done) => {
  userServices
    .find({ username: jwtPayload.username })
    .then((user) => {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
    .catch((err) => {
      if (err) {

        return done(err, false);
      }
    });
});

export { jwtStrategy };
