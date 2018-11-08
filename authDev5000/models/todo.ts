const mongoose = require('mongoose');
import { Model, model } from "mongoose";
import { ITodo } from "../interfaces/todo";
const { Schema } = mongoose;
const constants = require('../constants');

const Todo = new Schema({
  todoName: String,
  task: String,
  success: Boolean,
  image: [{ type: Schema.ObjectId, ref: constants.modelConstants.IMAGES }],
  category: String,
  todoOwner: { type: Schema.ObjectId, ref: constants.modelConstants.USERS },
  priority: { type: Schema.ObjectId, ref: constants.modelConstants.PRIORITY },
  timeTracking: {
    investigation: Number,
    onFact: Number,
  },
  status: String,
  dates: {
    start: Date,
    end: Date,
  },
  createdAt: { type: Date, default: Date.now },
});
const TodoModel: Model<ITodo> = model<ITodo>(constants.modelConstants.TODOS, Todo);
export { TodoModel }