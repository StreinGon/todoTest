const { UserModel } = require('../models/user');
import mongoose from 'mongoose'
import { IUser } from '../interfaces/user';

const createNewUser = (payload: Object): mongoose.Query<IUser> => {
  return UserModel.create(payload);
};
const find = (payload: Object): mongoose.Query<IUser> => {
  if (payload !== undefined) {
    return UserModel.findOne(payload);
  }
  return UserModel.find();
};
const userAddNewTodo = (user, id: String): IUser => {

  user.todos.push(id);

  user.save();
  return user;
};
const getUser = (payload: Object): Promise<IUser | Error> => {
  return find(payload)
    .then((user: IUser): IUser => {
      if (!user) {
        return null;
      }
      return user;
    })
    .catch((err: Error): Error => {
      if (err) {
        return err;
      }
    });
};
export {
  getUser,
  createNewUser,
  find,
  userAddNewTodo,
};
