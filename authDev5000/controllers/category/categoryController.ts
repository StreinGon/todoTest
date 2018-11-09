const { validationResult } = require('express-validator/check');

import * as categoryServices from '../../services/categoryServices';
import * as todoServices from '../../services/todoServices';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { ICategory } from '../../interfaces/category';
import { errorAftervalidation } from '../../helpers/errorChecker/errorAfterValidation';
const { customResponse } = require('../../helpers/customResponse/customResponse');

const createNewCategory = (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  const { categoryName } = req.body;
  return categoryServices
    .createNewCategory({ name: categoryName })
    .then((createdCategory: ICategory): Response => {
      if (!createdCategory) {
        return customResponse(res, 422, 'Category not created');
      }
      return customResponse(res, 200, 'Category created', createdCategory);
    });
};
const getCategory = (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  const { categoryName } = req.query;
  return categoryServices.getCategory(categoryName).then((category: Array<ICategory>): Response => {
    console.log(category)
    if (!category || category.length < 1) {
      return customResponse(res, 422, 'Category not found');
    }
    return customResponse(res, 200, 'Category sended', category);
  });
};
const addTodoToCategory = (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  const { todoID } = req.query;
  const { categoryName } = req.body;
  return categoryServices
    .categoryAddNewTodo(categoryName, todoID)
    .then((updatedCategory: ICategory): Response => {
      if (!updatedCategory) {
        return customResponse(res, 422, 'Category not updated');
      }
      todoServices.find({ _id: todoID }).then((todo) => {
        if (!todo || todo.length < 1) {
          return customResponse(res, 422, 'Category not updated');
        }
        todo[0].category = updatedCategory.name;
        todo[0].save();
        return customResponse(res, 200, 'Category updated', updatedCategory);
      });
    });
};
export {
  createNewCategory,
  getCategory,
  addTodoToCategory,
};
