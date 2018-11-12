"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JwtStrategy = require('passport-jwt').Strategy;
const userServices = require('../services/userServices');
const secret = Buffer.from('1', 'base64');
const opts = {};
const cookieExtractor = (req) => {
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
exports.jwtStrategy = jwtStrategy;
//# sourceMappingURL=jwtStrategy.js.map