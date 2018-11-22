"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const httpErrors = require("http-errors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const localStrategy_1 = require("@src/strategy/localStrategy");
const jwtStrategy_1 = require("@src/strategy/jwtStrategy");
const index_1 = require("@src/routes/index");
const JSONerror_1 = require("@src/helpers/errorChecker/JSONerror");
const authError_1 = require("@src/helpers/errorChecker/authError");
const user_1 = require("@src/models/user");
const app = express();
exports.app = app;
mongoose.connect('mongodb://localhost/Users', { useNewUrlParser: true });
app.set('views', path.join('views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'secret' }));
app.use(express.static(path.join('public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(JSONerror_1.jsonError);
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    user_1.UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});
passport.use('jwt', jwtStrategy_1.jwtStrategy);
passport.use('local', localStrategy_1.localStrategy);
app.use(authError_1.authError);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index_1.default);
app.use((req, res, next) => {
    next(httpErrors(404));
});
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    return res.send('err');
});
//# sourceMappingURL=app.js.map