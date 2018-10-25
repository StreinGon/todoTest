const express = require("express");

const app = express();
const createError = require("http-errors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const localStrategy = require("./strategy/localStrategy");
const jwtStrategy = require("./strategy/jwtStrategy");
const routes = require("./routes");

mongoose.connect(
  "mongodb://localhost/Users",
  { useNewUrlParser: true }
);

const Users = require("./models/user");

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.json());

app.use(session({ secret: "secret" }));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  Users.findById(_id, (err, user) => {
    done(err, user);
  });
});

passport.use(jwtStrategy);

passport.use(localStrategy);

app.use(passport.initialize());

app.use(passport.session());

app.use("/users", routes.usersRouter);

app.use("/reg", routes.regRouter);

app.use("/login", routes.loginRouter);

app.use("/todos", routes.todosRouter);

app.use("/todo", routes.todoRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
