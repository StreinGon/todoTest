const { SharedTodosModel } = require('../models/sharedTodos');


const createNewsharedTodos = (payload: Object) => {
  return SharedTodosModel.create(payload);
};
const find = (payload: Object) => {
  return SharedTodosModel.findOne(payload);
};
export { createNewsharedTodos, find };
