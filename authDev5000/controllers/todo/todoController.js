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
  const { title } = req.body;
  const { description } = req.body;
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
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const currentUser = req.user;
  const id = currentUser._id;
  const { id: idTodo } = req.query;
  if (!idTodo) {
    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
  }
  const status = req.body.success;
  const newDescription = req.body.description;
  const check = todoServices.changeTodos(newDescription, status, idTodo, id);

  return check.then(todo => {
    if (!todo) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return customResponse(
      res,
      200,
      constants.statusConstants.TODO_UPDATED,
      todo
    );
  });
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
  const check = todoServices.deleteTodo(id, idTodo);
  return check.then(todo => {
    if (!todo) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return customResponse(res, 200, constants.statusConstants.TODO_DELETED);
  });
};
const getTodo = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const currentUser = req.user;
  const { id } = req.query;
  const check = todoServices.getTodo(currentUser._id, id);
  return check.then(todo => {
    if (!todo) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }

    return customResponse(
      res,
      200,
      constants.statusConstants.TODO_SENDED,
      todo
    );
  });
};
module.exports = {
  addTodo,
  changeTodo,
  deleteTodo,
  getTodo
};
