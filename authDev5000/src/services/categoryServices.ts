import mongoose from 'mongoose';

import { CategoryModel } from '@src/models/category';
import { ICategory } from '@src/interfaces/category';

export const createNewCategory = (payload: Object): Promise<ICategory> => {
  return CategoryModel.create(payload);
};

export const find = (payload: Object): mongoose.Query<ICategory[]> => {
  return CategoryModel.find(payload);
};

export const getCategory = (categoryName: String): Promise<void | ICategory[] | Error> => {
  return find({ name: categoryName })
    .populate('todos')
    .then((category: ICategory[]): ICategory[] => {
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


export const AddNewTodo = (categoryName: String, id: mongoose.Schema.Types.ObjectId): Promise<ICategory> => {
  return find({ name: categoryName }).then((category: ICategory[]): ICategory => {
    category[0].todos.push(id);
    category[0].save();
    return category[0];
  });
};
