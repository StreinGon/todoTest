const express = require("express");
const Users = require("../public/javascripts/users");
const Todo = require("../public/javascripts/proj");
const Role = require("../public/javascripts/role");
const mongoose = require("mongoose");
const router = express.Router();
const { body } = require("express-validator/check");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post(
  "/",
  [
    check("mail").isEmail(),
    check("username").isLength({ min: 5 }),
    check("password").isLength({ min: 5 })
  ],
  body("mail").custom(value => {
    return Users.findOne({ mail: value }).then(user => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send("Status code 422");
    }
    const proj = new Todo({
      _id: new mongoose.Types.ObjectId(),
      todo: { todoName: "verify", task: "verify your email" },
      success: false,
      todoOwner: req.body.username
    });
    proj.save(function(err) {
      if (err) return handleError(err);
      const role = new Role({
        _id: new mongoose.Types.ObjectId(),
        rights: 0
      });
      role.save(function(err) {
        if (err) return handleError(err);
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        Users.create({
          username: req.body.username,
          password: hash,
          mail: req.body.mail,
          todos: [proj._id],
          role: role._id
        });
      });
    });

    res.status(200).json(200);
  }
);
module.exports = router;
