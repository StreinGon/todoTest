import { ICategory } from "../interfaces/category";
import { Model, model } from "mongoose";
const mongoose = require('mongoose');
const constants = require('../constants');

const { Schema } = mongoose;


const CategorySchema = mongoose.Schema({
  name: String,
  todos: [{ type: Schema.ObjectId, ref: constants.modelConstants.TODOS }],
});

const CategoryModel: Model<ICategory> = model<ICategory>("Category", CategorySchema);
export { CategoryModel }