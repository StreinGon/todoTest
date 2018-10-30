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
    priority: payload.priority
  });
  todo.save();
  return todo;
};
const deleteTodo = (id, idTodo) => {
  return find({ todoOwner: id, _id: idTodo }).then(todo => {
    if (!todo) {
      return false;
    }
    todo.remove();
    return { deleted: true, photoId: todo.image };
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
const changeTodos = (newDesc, status, idTodo, id) => {
  return find({ todoOwner: id, _id: idTodo })
    .then(todo => {
      if (!todo || todo.length < 1) {
        return null;
      }
      if (newDesc != null && newDesc != undefined && newDesc.length > 4) {
        todo.task = newDesc;
      }
      if (status === "true" || status === "false") {
        todo.success = status;
      }
      console.log(todo);
      todo.save();
      return todo;
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
