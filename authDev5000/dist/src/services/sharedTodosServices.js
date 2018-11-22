"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedTodos_1 = require("@src/models/sharedTodos");
exports.createNewsharedTodos = (payload) => {
    return sharedTodos_1.SharedTodosModel.create(payload);
};
exports.find = (payload) => {
    return sharedTodos_1.SharedTodosModel.findOne(payload);
};
//# sourceMappingURL=sharedTodosServices.js.map