"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { SharedTodosModel } = require('../typegoouseClasses/sharedTodos');
const createNewsharedTodos = (payload) => {
    return SharedTodosModel.create(payload);
};
exports.createNewsharedTodos = createNewsharedTodos;
const find = (payload) => {
    return SharedTodosModel.findOne(payload);
};
exports.find = find;
//# sourceMappingURL=sharedTodosServices.js.map