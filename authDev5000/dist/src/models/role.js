"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelConstants_1 = require("@src/constants/modelConstants");
const Role = new mongoose_1.Schema({
    rights: Number,
    createdAt: { type: Date, default: Date.now },
});
exports.RoleModel = mongoose_1.model(modelConstants_1.ROLES, Role);
//# sourceMappingURL=role.js.map