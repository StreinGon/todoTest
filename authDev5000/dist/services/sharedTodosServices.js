"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedTodos = require('../models/sharedTodos');
const createNewsharedTodos = (payload) => {
    return sharedTodos.create(payload);
};
exports.createNewsharedTodos = createNewsharedTodos;
const find = (payload) => {
    return sharedTodos.findOne(payload);
};
exports.find = find;
//# sourceMappingURL=sharedTodosServices.js.map