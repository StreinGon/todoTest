import mongoose from 'mongoose'
import { IUser } from '../interfaces/user';

const { UserModel } = require('../models/user');


const createNewUser = (payload: Object): mongoose.Query => {
  return UserModel.create(payload);
};
const find = (payload: Object): mongoose.Query => {
  if (payload !== undefined) {
    return UserModel.findOne(payload);
  }
  return UserModel.find();
};
const userAddNewTodo = (user, id: String): mongoose.Query => {

  user.todos.push(id);

  user.save();
  return user;
};
const getUser = (payload: Object): mongoose.Query => {
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
