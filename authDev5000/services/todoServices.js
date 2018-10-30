const TodoModel = require("../models/todo");
const mongoose = require("mongoose");

const createNewTodo = payload => {
  const todo = new TodoModel({
    _id: new mongoose.Types.ObjectId(),
    todoName: payload.title,
    task: payload.description,
    image: payload.photoId,
    success: false,
    todoOwner: payload.id,
    priority: payload.priority,
    timeTracking: {
      investigation: payload.timeTracking.investigation
    }
  });
  todo.save();
  return todo;
};
const deleteTodo = (id, idTodo) => {
  return find({ todoOwner: id, _id: idTodo }).then(todo => {
    if (!todo || todo.length < 1) {
      return false;
    }
    todo[0].remove();

    return { deleted: true, photoId: todo[0].image };
  });
};
const find = payload => {
  return TodoModel.find(payload);
};
const findAll = payload => {
  return TodoModel.find(payload);
};
const changeTodosAsAdmin = (idTodo, idUser) => {
  return find({ _id: idTodo })
    .then(todo => {
      if (!todo) {
        return null;
      }
      if (idUser != null && idUser != undefined) {
        todo.todoOwner = idUser;
      }

      todo.save();
      return todo;
    })
    .catch(err => {
      if (err) return err;
    });
};
const changeTodos = (newDesc, status, idTodo, id, onFact) => {
  return find({ todoOwner: id, _id: idTodo })
    .then(todo => {
      if (!todo || todo.length < 1) {
        return null;
      }
      if (newDesc != null && newDesc != undefined && newDesc.length > 4) {
        todo[0].task = newDesc;
      }
      if (status === "true" || status === "false") {
        todo[0].success = status;
      }
      if (onFact) {
        todo[0].timeTracking.onFact = onFact;
      }
      todo[0].save();

      return todo[0];
    })
    .catch(err => {
      if (err) return err;
    });
};
const getTodo = (id, idTodo) => {
  return find({ todoOwner: id, _id: idTodo })
    .then(todo => {
      if (!todo) {
        return false;
      }
      return todo;
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
  getTodo,
  findAll,
  changeTodosAsAdmin
};
