import mongoose from 'mongoose';

import { SharedTodosModel } from '@src/models/sharedTodos';
import { ISharedTodo } from '@src/interfaces/sharedTodos';

export const createNewsharedTodos = (payload: Object): Promise<ISharedTodo> => {
  return SharedTodosModel.create(payload);
};

export const find = (payload: Object): mongoose.Query<ISharedTodo> => {
  return SharedTodosModel.findOne(payload);
};
