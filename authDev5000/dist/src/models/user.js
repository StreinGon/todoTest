"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelConstants_1 = require("@src/constants/modelConstants");
const Users = new mongoose_1.Schema({
    username: String,
    mail: String,
    password: String,
    avatar: { type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.IMAGES },
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.ROLES },
    todos: [{ type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.TODOS }],
    createdAt: { type: Date, default: Date.now },
    invite: { type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.SHARED },
});
exports.UserModel = mongoose_1.model(modelConstants_1.USERS, Users);
//# sourceMappingURL=user.js.map