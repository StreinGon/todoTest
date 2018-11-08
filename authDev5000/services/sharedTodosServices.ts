const { SharedTodosModel } = require('../models/sharedTodos');
import mongoose from 'mongoose'

const createNewsharedTodos = (payload: Object): mongoose.Query => {
  return SharedTodosModel.create(payload);
};
const find = (payload: Object): mongoose.Query => {
  return SharedTodosModel.findOne(payload);
};
export { createNewsharedTodos, find };
