"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { Schema } = mongoose;
const constants = require('../constants');
const Todo = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
const TodoModel = mongoose.model(constants.modelConstants.TODOS, Todo, 'todos');
exports.TodoModel = TodoModel;
//# sourceMappingURL=todo.js.map