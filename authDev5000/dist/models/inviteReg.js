"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const inviteToRegSchema = mongoose.Schema({
    sessionActivity: { type: Date, expires: '86400s', default: Date.now },
    invite_token: { type: String, required: true },
});
const inviteToRegSchemaModel = mongoose.model('InviteToReg', inviteToRegSchema);
exports.default = inviteToRegSchemaModel;
//# sourceMappingURL=inviteReg.js.map