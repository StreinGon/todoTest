import { prop, Typegoose } from 'typegoose';
class Image extends Typegoose {
    @prop()
    name: String;
    @prop()
    destination: String;
    @prop()
    url: String;
    @prop()
    originalname: String;
    @prop({ default: Date.now })
    createdAt: Date

}
const ImageModel = new Image().getModelForClass(Image);

export { ImageModel, Image }