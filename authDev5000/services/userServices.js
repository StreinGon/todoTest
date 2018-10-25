const Users = require("../models/user");

const createNewUser = payload => {
  return Users.create(payload);
};
const find = payload => {
  return Users.findOne(payload);
};
const userAddNewTodo = (user, id) => {
  user.todos.push(id);
  user.save();
};
module.exports = {
  createNewUser,
  find,
  userAddNewTodo
};
