import mongoose from 'mongoose';
import { createTransport } from 'nodemailer';

import * as userServices from './userServices';
import { ITodo } from '@src/interfaces/todo';
import { TodoModel } from'@src/models/todo';
import { IUser } from '@src/interfaces/user';
import { transporterConfig } from '@src/configs/transporter';
import { TODO } from '@src/constants/otherConstants';
import { IImage } from '@src/interfaces/image';

export const createNewTodo = (payload: Object): ITodo => {
  const todo = new TodoModel(payload);
  todo.save();
  return todo;
};

export const deleteTodo = (id: String, idTodo: String) => {
  return find({ todoOwner: id, _id: idTodo }).then((todo: ITodo[]): IImage => {
    if (!todo || todo.length < 1) {
      return null;
    }
    todo[0].remove();

    return todo[0].image[0];
  });
};

export const find = (payload?: Object): mongoose.Query<ITodo[]> => {
  return TodoModel.find(payload);
};

export const findAll = (payload: Object) => {
  return TodoModel.find(payload);
};

export const transporter = createTransport(transporterConfig);

export const changeTodosAsAdmin = (idTodo: mongoose.Schema.Types.ObjectId, idUser: IUser): Promise<ITodo | Error> => {
  return find({ _id: idTodo })
    .then((todo: ITodo[]): Promise<ITodo | Error> => {

      if (!todo) {
        return null;
      }
      if (idUser != null && idUser !== undefined) {
        return userServices.find({ _id: todo[0].todoOwner }).then((user: IUser): Promise<ITodo>  => {
          if (!user) {
            return null;
          }
          user.todos.splice(user.todos.indexOf(idTodo), 1);
          user.save();
          const mailOptions = {
            from: 'admin',
            to: user.mail,
            subject: 'Todo',
            text: String('You get new todo'),
          };

          return userServices.find({ _id: idUser }).then((usernext: IUser): Promise<ITodo> => {

            usernext.todos.push(idTodo);
            todo[0].todoOwner = idUser;
            todo[0].save();
            usernext.save();

            return transporter.sendMail(mailOptions).then((info: String): ITodo => {
              if (!info) {
                return null;
              }
              return todo[0];
            });
          });

        });
      }

      return null;

    })
    .catch((err: Error): Error => {
      if (err) return err;
    });
};

export const changeTodos = (payload): Promise<ITodo | Error> => {
  return find({ todoOwner: payload.id, _id: payload.idTodo })
    .then((todo: ITodo[]): ITodo => {
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
      if (todo[0].status !== TODO.status.ended && payload.status === TODO.status.started) {
        todo[0].status = payload.status;
        todo[0].dates.start = new Date();
      }
      if (todo[0].status !== TODO.status.ended && payload.status === TODO.status.ended) {
        todo[0].status = payload.status;
        todo[0].dates.end = new Date();
      }
      if (todo[0].status !== TODO.status.ended && payload.status) {
        todo[0].status = payload.status;
      }

      todo[0].save();

      return todo[0];
    })
    .catch((err: Error): Error => {
      if (err) return err;
    });
};

export const getTodo = (id: String, idTodo: String): Promise<ITodo[] | Error> => {
  return find({ todoOwner: id, _id: idTodo })
    .then((todo: ITodo[]): ITodo[] => {
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
