const { TodoModel } = require('../models/todo');


import * as userServices from './userServices';
import { ITodo } from '../interfaces/todo';


const createNewTodo = (payload: Object) => {
  const todo = new TodoModel(payload);
  todo.save();
  return todo;
};
const deleteTodo = (id: String, idTodo: String) => {
  return find({ todoOwner: id, _id: idTodo }).then((todo): String => {
    if (!todo || todo.length < 1) {
      return null;
    }
    todo[0].remove();

    return todo[0].image;
  });
};
const find = (payload: Object) => {
  return TodoModel.find(payload);
};
const findAll = (payload: Object) => {
  return TodoModel.find(payload);
};
const changeTodosAsAdmin = (idTodo: String, idUser: String) => {
  return find({ _id: idTodo })
    .then((todo): ITodo => {

      if (!todo) {
        return null;
      }
      if (idUser != null && idUser !== undefined) {
        return userServices.find({ _id: todo[0].todoOwner }).then((user) => {

          user.todos.splice(user.todos.indexOf(idTodo), 1);
          user.save();
          return userServices.find({ _id: idUser }).then((usernext): ITodo => {

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
    .catch((err: Error): Error => {
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
    .catch((err: Error): Error => {
      if (err) return err;
    });
};
const getTodo = (id: String, idTodo: String) => {
  return find({ todoOwner: id, _id: idTodo })
    .then((todo: ITodo): ITodo => {
      if (!todo) {
        return null;
      }
      return todo;
    })
    .catch((err: Error): Error => {
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
