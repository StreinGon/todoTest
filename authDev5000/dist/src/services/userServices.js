"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("@src/models/user");
exports.createNewUser = (payload) => {
    return user_1.UserModel.create(payload);
};
exports.find = (payload) => {
    return user_1.UserModel.findOne(payload);
};
exports.userAddNewTodo = (user, id) => {
    user.todos.push(id);
    user.save();
    return user;
};
exports.getUser = (payload) => {
    return exports.find(payload)
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
//# sourceMappingURL=userServices.js.map