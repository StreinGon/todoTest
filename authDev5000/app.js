const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Users");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const regRouter = require("./routes/registerform");
const Users = require("./public/javascripts/users");
const app = express();
const bcrypt = require("bcrypt");
const secret = new Buffer("1", "base64");
const session = require("express-session");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "secret" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
/////////////////////JWT
const JwtStrategy = require("passport-jwt").Strategy;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.Authorization;
  }
  return token;
};
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = secret;
passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    return Users.findOne({ username: jwt_payload.username }, function(
      err,
      user
    ) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

////////////////////
////////////PASSPORT

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  Users.findById(_id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, done) {
      Users.findOne({ username: username }, function(err, user) {
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
  )
);

app.use(passport.initialize());
app.use(passport.session());
////////////////////
app.use("/reg", express.static("html/registerform.html"));
app.use("/login", express.static("html/login.html"));
app.use("/", indexRouter);
app.use(
  "/users",

  usersRouter
);

app.use("/reg", regRouter);
app.use("/login", loginRouter);
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err);
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);

  res.send(err);
});

module.exports = app;
