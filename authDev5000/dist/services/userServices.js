"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { UsersModel } = require('../models/user');
const createNewUser = (payload) => {
    return UsersModel.create(payload);
};
exports.createNewUser = createNewUser;
const find = (payload) => {
    if (payload !== undefined) {
        return UsersModel.findOne(payload);
    }
    return UsersModel.find();
};
exports.find = find;
const userAddNewTodo = (user, id) => {
    user.todos.push(id);
    user.save();
};
exports.userAddNewTodo = userAddNewTodo;
const getUser = (payload) => {
    return find(payload)
        .then((user) => {
        if (!user) {
            return false;
        }
        return user;
    })
        .catch((err) => {
        if (err) {
            return err;
        }
    });
};
exports.getUser = getUser;
//# sourceMappingURL=userServices.js.map