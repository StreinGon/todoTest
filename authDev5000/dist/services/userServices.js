"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { UserModel } = require('../models/user');
const createNewUser = (payload) => {
    return UserModel.create(payload);
};
exports.createNewUser = createNewUser;
const find = (payload) => {
    if (payload !== undefined) {
        return UserModel.findOne(payload);
    }
    return UserModel.find();
};
exports.find = find;
const userAddNewTodo = (user, id) => {
    user.todos.push(id);
    user.save();
    return user;
};
exports.userAddNewTodo = userAddNewTodo;
const getUser = (payload) => {
    return find(payload)
        .then((user) => {
        if (!user) {
            return null;
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