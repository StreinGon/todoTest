"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelConstants_1 = require("@src/constants/modelConstants");
const otherConstants_1 = require("@src/constants/otherConstants");
const inviteToRegSchema = new mongoose_1.Schema({
    sessionActivity: { type: Date, expires: otherConstants_1.INVITE_EXPIRES, default: Date.now },
    invite_token: { type: String, required: true },
});
exports.InviteToRegModel = mongoose_1.model(modelConstants_1.INVITE_REG, inviteToRegSchema);
//# sourceMappingURL=inviteReg.js.map