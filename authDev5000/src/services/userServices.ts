import mongoose from 'mongoose';

import { UserModel } from '@src/models/user';
import { IUser } from '@src/interfaces/user';

export const createNewUser = (payload: Object): Promise<IUser> => {
  return UserModel.create(payload);
};
export const find = (payload?: Object): mongoose.Query<IUser> => {
  return UserModel.findOne(payload);

};
export const userAddNewTodo = (user, id: String): IUser => {

  user.todos.push(id);

  user.save();
  return user;
};
export const getUser = (payload: Object): Promise<IUser | Error> => {
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
