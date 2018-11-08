"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const mongoose_1 = require("mongoose");
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
const TodoModel = mongoose_1.model(constants.modelConstants.TODOS, Todo);
exports.TodoModel = TodoModel;
//# sourceMappingURL=todo.js.map