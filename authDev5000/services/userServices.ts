const { UsersModel } = require('../models/user');


const createNewUser = (payload: Object) => {
  return UsersModel.create(payload);
};
const find = (payload: Object) => {
  if (payload !== undefined) {
    return UsersModel.findOne(payload);
  }
  return UsersModel.find();
};
const userAddNewTodo = (user, id: String) => {
  user.todos.push(id);
  user.save();
};
const getUser = (payload: Object) => {
  return find(payload)
    .then((user) => {
      if (!user) {
        return false;
      }
      return user;
    })
    .catch((err: any) => {
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
