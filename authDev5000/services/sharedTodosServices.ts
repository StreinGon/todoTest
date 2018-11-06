const { SharedTodosModel } = require('../models/sharedTodos');

const createNewsharedTodos = (payload) => {
  return SharedTodosModel.create(payload);
};
const find = (payload) => {
  return SharedTodosModel.findOne(payload);
};
export { createNewsharedTodos, find };
