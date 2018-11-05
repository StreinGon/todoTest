const Users = require('../models/user');

const createNewUser = (payload) => {
  return Users.create(payload);
};
const find = (payload) => {
  if (payload !== undefined) {
    return Users.findOne(payload);
  }
  return Users.find();
};
const userAddNewTodo = (user, id) => {
  user.todos.push(id);
  user.save();
};
const getUser = (payload) => {
  return find(payload)
    .then((user) => {
      if (!user) {
        return false;
      }
      return user;
    })
    .catch((err) => {
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
