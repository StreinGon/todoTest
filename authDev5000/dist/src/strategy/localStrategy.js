"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const passport_local_1 = require("passport-local");
const userServices = require("@src/services/userServices");
exports.localStrategy = new passport_local_1.Strategy((username, password, done) => {
    userServices
        .find({ username })
        .then((user) => {
        if (!user) {
            return done(null, false);
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    })
        .catch((err) => {
        if (err) {
            return done(err);
        }
    });
});
//# sourceMappingURL=localStrategy.js.map