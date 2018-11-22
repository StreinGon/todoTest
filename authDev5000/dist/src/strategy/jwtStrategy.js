"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const userServices = require("@src/services/userServices");
const otherConstants_1 = require("@src/constants/otherConstants");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.Authorization;
    }
    return token;
};
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = otherConstants_1.secret;
exports.jwtStrategy = new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
    userServices
        .find({ username: jwtPayload.username })
        .then((user) => {
        if (user) {
            return done(null, user);
        }
        return done(statusCodeConstants_1.AUTH_ERROR, false);
    })
        .catch((err) => {
        if (err) {
            return done(err, false);
        }
    });
});
//# sourceMappingURL=jwtStrategy.js.map