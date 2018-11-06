import { prop, Typegoose } from 'typegoose';
class Role extends Typegoose {
    @prop()
    rights: Number;
    @prop({ default: Date.now })
    createdAt: Date;
}
const RoleModel = new Role().getModelForClass(Role);

export { RoleModel, Role }