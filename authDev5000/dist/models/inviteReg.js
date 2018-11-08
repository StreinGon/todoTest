"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const mongoose_1 = require("mongoose");
const inviteToRegSchema = mongoose.Schema({
    sessionActivity: { type: Date, expires: '86400s', default: Date.now },
    invite_token: { type: String, required: true },
});
const InviteToRegModel = mongoose_1.model("InviteReg", inviteToRegSchema);
exports.InviteToRegModel = InviteToRegModel;
//# sourceMappingURL=inviteReg.js.map