const { UserModel } = require('../typegoouseClasses/user');


const createNewUser = (payload: Object) => {
  return UserModel.create(payload);
};
const find = (payload: Object) => {
  if (payload !== undefined) {
    return UserModel.findOne(payload);
  }
  return UserModel.find();
};
const userAddNewTodo = (user, id) => {

  user.todos.push(id);

  user.save();
  return user;
};
const getUser = (payload: Object) => {
  return find(payload)
    .then((user) => {
      if (!user) {
        return false;
      }
      return user;
    })
    .catch((err: String) => {
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
