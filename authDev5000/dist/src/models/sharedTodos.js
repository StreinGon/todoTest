"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelConstants_1 = require("@src/constants/modelConstants");
const SharedTodosSchema = new mongoose_1.Schema({
    todos: [{ type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.TODOS }],
    allowed: [{ type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.USERS }],
});
exports.SharedTodosModel = mongoose_1.model(modelConstants_1.SHARED, SharedTodosSchema);
//# sourceMappingURL=sharedTodos.js.map