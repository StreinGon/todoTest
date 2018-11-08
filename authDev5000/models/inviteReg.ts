const mongoose = require('mongoose');
import { Model, model } from "mongoose";
import { IInviteReg } from "../interfaces/inviteReg";

const inviteToRegSchema = mongoose.Schema({
  sessionActivity: { type: Date, expires: '86400s', default: Date.now },
  invite_token: { type: String, required: true },
});
const InviteToRegModel: Model<IInviteReg> = model<IInviteReg>("InviteReg", inviteToRegSchema);

export { InviteToRegModel }
