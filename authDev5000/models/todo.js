const mongoose = require("mongoose");

const { Schema } = mongoose;

const constants = require("../constants");

const Todo = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  todoName: String,
  task: String,
  success: Boolean,
  image: [{ type: Schema.ObjectId, ref: constants.modelConstants.IMAGES }],
  todoOwner: { type: Schema.ObjectId, ref: constants.modelConstants.USERS },
  priority: { type: Schema.ObjectId, ref: constants.modelConstants.PRIORITY },
  timeTracking: {
    investigation: Number,
    onFact: Number
  },
  status: String,
  dates: {
    start: Date,
    end: Date
  }
});
const TodoModel = mongoose.model(constants.modelConstants.TODOS, Todo, "todos");
module.exports = TodoModel;
