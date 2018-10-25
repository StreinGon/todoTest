const TodoModel = require("../models/todo");
const constants = require("../constants");
const customResponse = require("../helpers/customResponse/customResponse");
const mongoose = require("mongoose");

const createNewTodo = payload => {
  const todo = new TodoModel({
    _id: new mongoose.Types.ObjectId(),
    todoName: payload.title,
    task: payload.description,
    success: false,
    todoOwner: payload.id
  });
  todo.save();
  return todo;
};
const deleteTodo = (id, idTodo, res) => {
  return find({ todoOwner: id, _id: idTodo }).then(todo => {
    if (!todo) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    todo.remove();
    return customResponse(res, 200, constants.statusConstants.TODO_DELETED);
  });
};
const find = payload => {
  return TodoModel.findOne(payload);
};
const changeTodos = (newDesc, status, idTodo, id, res) => {
  return find({ todoOwner: id, _id: idTodo })
    .then(todo => {
      if (!todo) {
        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
      }
      if (newDesc != null && newDesc != undefined && newDesc.length > 4) {
        todo.task = newDesc;
      }
      if (status === "true" || status === "false") {
        todo.success = status;
      }
      todo.save();
      return customResponse(
        res,
        200,
        constants.statusConstants.TODO_UPDATED,
        todo
      );
    })
    .catch(err => {
      if (err) return err;
    });
};
const getTodo = (id, idTodo, res) => {
  return find({ todoOwner: id, _id: idTodo })
    .then(todo => {
      if (!todo) {
        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
      }
      return customResponse(
        res,
        200,
        constants.statusConstants.TODO_SENDED,
        todo
      );
    })
    .catch(err => {
      if (err) {
        return err;
      }
    });
};
module.exports = {
  createNewTodo,
  deleteTodo,
  find,
  changeTodos,
  getTodo
};
