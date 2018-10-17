var express = require("express");
var router = express.Router();
const Users = require("../public/javascripts/users");
var passport = require("passport");
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var secret = new Buffer("1", "base64");
const Todo = require("../public/javascripts/proj");
const CustomRes = require("../public/CustomRes");
const strats = require("../public/LocalAndJWT");
const { check, validationResult } = require("express-validator/check");
router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  strats.JWT
);
router.post(
  "/change",
  [check("username").isLength({ min: 5 }), check("title").isLength({ min: 1 })],
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return CustomRes(res, 422, "Status code 422");
    }
    const username = req.body.username;
    const title = req.body.title;

    const desc = req.body.tododesc;
    return Todo.findOne({ todoOwner: username }, function(err, todo) {
      todo.todo.find(task => task.todoName === title).task = desc;
      todo.save();
      return CustomRes(res, 200, "todo changed", todo);
    });
  }
);
router.post("/logout", function(req, res) {
  req.logout();
  res.cookie("Authorization", null);
  return CustomRes(res, 200, "LogOut");
});
router.post(
  "/addtodo",
  [
    check("todotitle").isLength({ min: 1 }),
    check("tododesc").isLength({ min: 1 })
  ],
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return CustomRes(res, 422, "Status code 422");
    }
    const title = req.body.todotitle;
    const desc = req.body.tododesc;
    const token = req.cookies.Authorization;
    const userS = jwt.verify(token, secret);
    const todo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      todo: { todoName: title, task: desc },
      success: false,
      todoOwner: userS.username
    });
    const id = todo._id;
    todo.save();
    return Users.findOne({ username: userS.username }, function(err, user) {
      user.todos.push(id);
      user.save();
      return CustomRes(res, 200, "todo created", todo);
    });
  }
);
module.exports = router;
