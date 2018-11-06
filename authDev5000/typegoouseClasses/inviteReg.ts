import { prop, Typegoose } from 'typegoose';
class inviteReg extends Typegoose {
    @prop({ expires: '86400s', default: Date.now })
    sessionActivity: Date;
    @prop({ required: true })
    invite_token: String;
}
const inviteRegModel = new inviteReg().getModelForClass(inviteReg);

export { inviteRegModel, inviteReg } 