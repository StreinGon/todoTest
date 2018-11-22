import { Model, model, Schema } from 'mongoose';

import { ICategory } from '@src/interfaces/category';
import *  as constants from '@src/constants/index';
import { CATEGORY } from '@src/constants/modelConstants';

const CategorySchema = new Schema({
  name: String,
  todos: [{ type: Schema.Types.ObjectId, ref: constants.modelConstants.TODOS }],
});

const CategoryModel: Model<ICategory> = model<ICategory>(CATEGORY, CategorySchema);
export { CategoryModel };
