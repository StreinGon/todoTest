"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const mongoose_1 = require("mongoose");
const { Schema } = mongoose;
const constants = require('../constants');
const Role = new Schema({
    rights: Number,
    createdAt: { type: Date, default: Date.now },
});
const RoleModel = mongoose_1.model(constants.modelConstants.ROLES, Role);
exports.RoleModel = RoleModel;
//# sourceMappingURL=role.js.map