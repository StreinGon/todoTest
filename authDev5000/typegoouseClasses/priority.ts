import { prop, Typegoose } from 'typegoose';
class Priority extends Typegoose {
    @prop()
    value: Number;
    @prop()
    name: String;
}
const PriorityModel = new Priority().getModelForClass(Priority);

export { PriorityModel, Priority }