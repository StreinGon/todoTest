import { prop, Typegoose } from 'typegoose';
class Category extends Typegoose {
    @prop()
    name: string;
}
const CategoryModel = new Category().getModelForClass(Category);

export { CategoryModel, Category }