import { Document } from "mongoose";

interface IInviteReg extends Document {
    sessionActivity: Date;
    invite_token: String;
}
export { IInviteReg }