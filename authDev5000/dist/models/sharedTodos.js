"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const constants = require('../constants');
const mongoose_1 = require("mongoose");
const { Schema } = mongoose;
const SharedTodosSchema = mongoose.Schema({
    todos: [{ type: Schema.ObjectId, ref: constants.modelConstants.TODOS }],
    allowed: [{ type: Schema.ObjectId, ref: constants.modelConstants.USERS }],
});
const SharedTodosModel = mongoose_1.model('SharedTodos', SharedTodosSchema);
exports.SharedTodosModel = SharedTodosModel;
//# sourceMappingURL=sharedTodos.js.map