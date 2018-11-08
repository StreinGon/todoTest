const mongoose = require('mongoose');
const constants = require('../constants');
import { Schema, Model, model } from "mongoose";
import { ISharedTodo } from "../interfaces/sharedTodos";
const { Schema } = mongoose;

const SharedTodosSchema = mongoose.Schema({
  todos: [{ type: Schema.ObjectId, ref: constants.modelConstants.TODOS }],
  allowed: [{ type: Schema.ObjectId, ref: constants.modelConstants.USERS }],
});
const SharedTodosModel: Model<ISharedTodo> = model<ISharedTodo>('SharedTodos', SharedTodosSchema);

export { SharedTodosModel }