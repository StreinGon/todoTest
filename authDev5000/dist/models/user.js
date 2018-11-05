"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { Schema } = mongoose;
const constants = require('../constants');
const Users = new Schema({
    username: String,
    mail: String,
    password: String,
    avatar: { type: Schema.ObjectId, ref: constants.modelConstants.IMAGES },
    role: { type: Schema.ObjectId, ref: constants.modelConstants.ROLES },
    todos: [{ type: Schema.ObjectId, ref: constants.modelConstants.TODOS }],
    createdAt: { type: Date, default: Date.now },
    invite: { type: Schema.ObjectId, ref: 'SharedTodos' },
});
const UsersModel = mongoose.model(constants.modelConstants.USERS, Users, 'users');
exports.default = UsersModel;
//# sourceMappingURL=user.js.map