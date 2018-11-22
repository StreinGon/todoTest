"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelConstants_1 = require("@src/constants/modelConstants");
const Todo = new mongoose_1.Schema({
    todoName: String,
    task: String,
    success: Boolean,
    image: [{ type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.IMAGES }],
    category: String,
    todoOwner: { type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.USERS },
    priority: { type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.PRIORITY },
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
exports.TodoModel = mongoose_1.model(modelConstants_1.TODOS, Todo);
//# sourceMappingURL=todo.js.map