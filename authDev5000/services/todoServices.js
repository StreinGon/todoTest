const TodoModel = require("../models/todoModel");
const mongoose = require("mongoose");

function createNewTodo(title, desc, id) {
  return new TodoModel({
    _id: new mongoose.Types.ObjectId(),
    todoName: title,
    task: desc,
    success: false,
    todoOwner: id
  });
}
function deleteTodo(todos, title) {
  todos.forEach(todo => {
    if (todo.todoName === title) {
      todo.remove();
    }
  });
}
function findTodoByName(name, func) {
  return TodoModel.findOne({ todoName: name }, func);
}
function findTodoByOwnerAndId(owner, id, func) {
  return TodoModel.findOne({ todoOwner: owner, _id: id }, func);
}
function findTodoByTask(task, func) {
  return TodoModel.findOne({ task: task }, func);
}
function findTodosByOwner(id, func) {
  return TodoModel.find({ todoOwner: id }, func);
}
function findTodoByOwner(id, func) {
  return TodoModel.find({ todoOwner: id }, func);
}
function findTodosByOwnerAndName(id, name, func) {
  return TodoModel.find({ todoOwner: id, todoName: name }, func);
}
function changeTodos(newDesc, status, todos, changedTodos) {
  todos.forEach(todo => {
    if (newDesc != null && newDesc != undefined) {
      todo.task = newDesc;
      changedTodos = todo;
    }
    if (status === "true" || status === "false") {
      todo.success = status;
      changedTodos = todo;
    }
    todo.save();
  });
}
module.exports = {
  createNewTodo,
  deleteTodo,
  findTodoByName,
  findTodoByOwnerAndId,
  findTodoByTask,
  findTodoByOwner,
  findTodosByOwnerAndName,
  changeTodos,
  findTodosByOwner
};
