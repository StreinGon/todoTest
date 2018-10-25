const { validationResult } = require("express-validator/check");

const customResponse = require("../../helpers/customResponse/customResponse");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const todoServices = require("../../services/todoServices.js");
const userServices = require("../../services/userServices.js");
const constants = require("../../constants");

const addTodo = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const { title } = req.body.title;
  const description = req.body.description;
  const currentUser = req.user;
  if (currentUser._id === null || currentUser._id === undefined) {
    return customResponse(res, 401, constants.statusConstants.UNAUTHORIZED);
  }
  const newtodo = todoServices.createNewTodo({
    title,
    description,
    id: currentUser._id
  });
  const id = newtodo._id;
  return userServices
    .find({ username: currentUser.username })
    .then(user => {
      userServices.userAddNewTodo(user, id);
      return customResponse(
        res,
        200,
        constants.statusConstants.TODO_CREATED,
        newtodo
      );
    })
    .catch(err => {
      if (err) return err;
    });
};
const changeTodo = (req, res) => {
  const currentUser = req.user;
  const id = currentUser._id;
  const { id: idTodo } = req.query;
  if (!idTodo) {
    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
  }
  const status = req.body.success;

  const newDescription = req.body.description;
  return todoServices.changeTodos(newDescription, status, idTodo, id, res);
};

const deleteTodo = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const currentUser = req.user;
  const id = currentUser._id;
  const { id: idTodo } = req.query;
  return todoServices.deleteTodo(id, idTodo, res);
};
const getTodo = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const currentUser = req.user;
  const { id } = req.query;
  return todoServices.getTodo(currentUser._id, id, res);
};
module.exports = {
  addTodo,
  changeTodo,
  deleteTodo,
  getTodo
};
