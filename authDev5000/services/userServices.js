const Users = require("../models/userModel");

function createNewUser(username, password, mail, id) {
  return Users.create({
    username: username,
    password: password,
    mail: mail,
    todos: [],
    role: id
  });
}
function findUserbyMail(mail, func) {
  return Users.findOne({ mail: mail }, func);
}
function findUserbyUsername(username, func) {
  return Users.findOne({ username: username }, func);
}
function userAddNewTodo(user, id) {
  user.todos.push(id);
  user.save();
}
module.exports = {
  createNewUser,
  findUserbyMail,
  findUserbyUsername,
  userAddNewTodo
};
