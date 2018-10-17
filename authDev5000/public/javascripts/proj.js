var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Todo = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  todo: { todoName: String, task: String },
  success: Boolean,
  todoOwner: String
});
const TodoModel = mongoose.model("Todo", Todo, "todos");
module.exports = TodoModel;
