import { Model, model, Schema } from 'mongoose';

import { IInviteReg } from '@src/interfaces/inviteReg';
import { INVITE_REG } from '@src/constants/modelConstants';
import { INVITE_EXPIRES } from '@src/constants/otherConstants';

const inviteToRegSchema = new Schema({
  sessionActivity: { type: Date, expires: INVITE_EXPIRES, default: Date.now },
  invite_token: { type: String, required: true },
});
export const InviteToRegModel: Model<IInviteReg> = model<IInviteReg>(INVITE_REG, inviteToRegSchema);
