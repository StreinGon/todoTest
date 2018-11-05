const mongoose = require('mongoose');
const constants = require('../constants');

const { Schema } = mongoose;

const SharedTodosSchema = mongoose.Schema({
  todos: [{ type: Schema.ObjectId, ref: constants.modelConstants.TODOS }],
  allowed: [{ type: Schema.ObjectId, ref: constants.modelConstants.USERS }],
});
const SharedTodosModel = mongoose.model('SharedTodos', SharedTodosSchema);
export default SharedTodosModel;
