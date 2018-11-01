const { validationResult } = require("express-validator/check");
const fs = require("fs");

const customResponse = require("../../helpers/customResponse/customResponse");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const todoServices = require("../../services/todoServices.js");
const userServices = require("../../services/userServices.js");
const imageServices = require("../../services/imageServices.js");
const priorityServices = require("../../services/priorityServices.js");
const constants = require("../../constants");
const userCheck = require("../../helpers/userCheck/userCheck");

const addTodo = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  userCheck(req, res);
  const { title } = req.body;
  const { description } = req.body;
  const { priority } = req.body;
  const { investigation } = req.body;
  let photoId = [];
  if (req.files) {
    req.files.forEach(file => {
      const photo = imageServices.createImage({
        name: file.filename,
        destination: file.destination,
        originalname: file.originalname,
        url: `localhost:8080/image/${file.filename}`
      });
      photoId.push(photo._id);
      photo.save();
    });
  }
  const newPriority = priorityServices.createPriority({ value: priority });
  const newtodo = todoServices.createNewTodo({
    title,
    description,
    photoId: photoId,
    id: req.user._id,
    priority: newPriority._id,
    timeTracking: {
      investigation: investigation
    },
    status: "not started"
  });
  newPriority.save();
  const id = newtodo._id;

  return userServices
    .find({ username: req.user.username })
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
  userCheck(req, res);
  const { id: idTodo } = req.query;
  if (!idTodo) {
    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
  }
  const onFact = req.body.onFact;
  const success = req.body.success;
  const newDescription = req.body.description;
  const status = req.body.status;
  const check = todoServices.changeTodos({
    newDescription,
    success,
    idTodo,
    id: req.user._id,
    onFact,
    status
  });

  return check.then(todo => {
    if (!todo || todo.lenght < 1) {
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
  userCheck(req, res);
  const { id: idTodo } = req.query;
  return todoServices.deleteTodo(req.user._id, idTodo).then(todo => {
    if (!todo) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return imageServices
      .find({ _id: todo.photoId })
      .then(image => {
        fs.unlinkSync(`${image.destination}${image.name}`);
        image[0].remove();
        return customResponse(res, 200, constants.statusConstants.TODO_DELETED);
      })
      .catch(err => {
        return err;
      });
  });
};
const getTodo = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  userCheck(req, res);
  const { id } = req.query;
  const check = todoServices.getTodo(req.user._id, id);
  return check.then(todo => {
    if (!todo || todo.length < 1) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return imageServices.find({ _id: todo[0].image }).then(image => {
      return customResponse(res, 200, constants.statusConstants.TODO_SENDED, {
        todo,
        image
      });
    });
  });
};

module.exports = {
  addTodo,
  changeTodo,
  deleteTodo,
  getTodo
};
