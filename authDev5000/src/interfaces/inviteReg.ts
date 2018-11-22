import { Document } from 'mongoose';

export interface IInviteReg extends Document {
  sessionActivity: Date;
  invite_token: String;
}
