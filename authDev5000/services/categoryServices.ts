const { CategoryModel } = require('../models/category');

import { ICategory } from '../interfaces/category';

const createNewCategory = (payload: Object) => {
  return CategoryModel.create(payload);
};
const find = (payload: Object) => {
  return CategoryModel.find(payload);
};
const getCategory = (categoryName: String) => {
  return find({ name: categoryName })
    .populate('todos')
    .then((category: ICategory): ICategory => {
      if (!category) {
        return null;
      }
      return category;
    })
    .catch((err: Error): Error | void => {
      if (err) {
        return err;
      }
    });
};
const categoryAddNewTodo = (categoryName: String, id: String) => {
  return find({ name: categoryName }).then((category): ICategory => {
    category[0].todos.push(id);
    category[0].save();
    return category[0];
  });
};
export {
  find,
  createNewCategory,
  getCategory,
  categoryAddNewTodo,
};
