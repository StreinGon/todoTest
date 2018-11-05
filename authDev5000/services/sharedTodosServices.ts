const sharedTodos = require('../models/sharedTodos');

const createNewsharedTodos = (payload) => {
  return sharedTodos.create(payload);
};
const find = (payload) => {
  return sharedTodos.findOne(payload);
};
export { createNewsharedTodos, find };
