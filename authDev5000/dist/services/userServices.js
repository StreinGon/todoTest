"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Users = require('../models/user');
const createNewUser = (payload) => {
    return Users.create(payload);
};
exports.createNewUser = createNewUser;
const find = (payload) => {
    if (payload !== undefined) {
        return Users.findOne(payload);
    }
    return Users.find();
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