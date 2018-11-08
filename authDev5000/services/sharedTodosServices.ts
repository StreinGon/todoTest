const { SharedTodosModel } = require('../models/sharedTodos');
import mongoose from 'mongoose'
import { ISharedTodo } from '../interfaces/sharedTodos';

const createNewsharedTodos = (payload: Object): mongoose.Query<ISharedTodo> => {
  return SharedTodosModel.create(payload);
};
const find = (payload: Object): mongoose.Query<ISharedTodo> => {
  return SharedTodosModel.findOne(payload);
};
export { createNewsharedTodos, find };
