const { TodoModel } = require('../typegoouseClasses/todo');
const mongoose = require('mongoose');
import * as userServices from './userServices';

const createNewTodo = (payload) => {
  const todo = new TodoModel({
    _id: new mongoose.Types.ObjectId(),
    todoName: payload.title,
    task: payload.description,
    image: payload.photoId,
    success: false,
    todoOwner: payload.id,
    priority: payload.priority,
    timeTracking: {
      investigation: payload.timeTracking.investigation,
    },
    status: payload.status,
  });
  todo.save();
  return todo;
};
const deleteTodo = (id, idTodo) => {
  return find({ todoOwner: id, _id: idTodo }).then((todo) => {
    if (!todo || todo.length < 1) {
      return false;
    }
    todo[0].remove();

    return { deleted: true, photoId: todo[0].image };
  });
};
const find = (payload) => {
  return TodoModel.find(payload);
};
const findAll = (payload) => {
  return TodoModel.find(payload);
};
const changeTodosAsAdmin = (idTodo, idUser) => {
  return find({ _id: idTodo })
    .then((todo) => {

      if (!todo) {
        return null;
      }
      if (idUser != null && idUser !== undefined) {
        return userServices.find({ _id: todo[0].todoOwner }).then((user) => {

          user.todos.splice(user.todos.indexOf(idTodo), 1);
          user.save();
          return userServices.find({ _id: idUser }).then((usernext) => {

            usernext.todos.push(idTodo);
            todo[0].todoOwner = idUser;
            todo[0].save();
            usernext.save();
            return todo[0];
          });
        });

      }
      return null;

    })
    .catch((err) => {
      if (err) return err;
    });
};
const changeTodos = (payload) => {
  return find({ todoOwner: payload.id, _id: payload.idTodo })
    .then((todo) => {
      if (!todo || todo.length < 1) {
        return null;
      }
      if (
        payload.newDesc != null &&
        payload.newDesc !== undefined &&
        payload.newDesc.length > 4
      ) {
        todo[0].task = payload.newDesc;
      }
      if (payload.success === 'true' || payload.success === 'false') {
        todo[0].success = payload.success;
      }
      if (payload.onFact) {
        todo[0].timeTracking.onFact = payload.onFact;
      }
      if (todo[0].status !== 'ended' && payload.status === 'started') {
        todo[0].status = payload.status;
        todo[0].dates.start = new Date();
      }
      if (todo[0].status !== 'ended' && payload.status === 'ended') {
        todo[0].status = payload.status;
        todo[0].dates.end = new Date();
      }
      if (todo[0].status !== 'ended' && payload.status) {
        todo[0].status = payload.status;
      }

      todo[0].save();

      return todo[0];
    })
    .catch((err) => {
      if (err) return err;
    });
};
const getTodo = (id, idTodo) => {
  return find({ todoOwner: id, _id: idTodo })
    .then((todo) => {
      if (!todo) {
        return false;
      }
      return todo;
    })
    .catch((err) => {
      if (err) {
        return err;
      }
    });
};
export {
  createNewTodo,
  deleteTodo,
  find,
  changeTodos,
  getTodo,
  findAll,
  changeTodosAsAdmin,
};
