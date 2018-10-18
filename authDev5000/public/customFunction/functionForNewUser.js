const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");

const Users = require("../dbModels/userModel");
const TodoModel = require("../dbModels/todoModel");
const Rolemodel = require("../dbModels/roleModel");
const customResponse = require("../customResponse");
const saltRounds = 10;

const functionForNewUser = (req, res) => {
  const errors = validationResult(req);
  let Errormsg = "";
  errors.array().forEach(mes => {
    if (Errormsg == "") {
      Errormsg += mes.msg;
    } else {
      Errormsg += "," + mes.msg;
    }
  });
  if (!errors.isEmpty()) {
    return customResponse(res, 422, Errormsg);
  }
  console.log(req.body);
  const newTodo = new TodoModel({
    _id: new mongoose.Types.ObjectId(),
     todoName: "verify", 
     task: "verify your email" ,
    success: false,
    todoOwner: req.body.username
  });
  newTodo.save(function(err) {
    if (err) return handleError(err);
    const newRole = new Rolemodel({
      _id: new mongoose.Types.ObjectId(),
      rights: 0
    });
    newRole.save(function(err) {
      if (err) return handleError(err);

      const hash = bcrypt.hashSync(req.body.password, saltRounds);
      Users.create({
        username: req.body.username,
        password: hash,
        mail: req.body.mail,
        todos: [newTodo._id],
        role: newRole._id
      });
    });
  });
  customResponse(res, 200, "Registration succesfull");
};

module.exports = functionForNewUser;
