const { validationResult } = require('express-validator/check');

import * as categoryServices from '../../services/categoryServices';
import * as todoServices from '../../services/todoServices';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { ICategory } from '../../interfaces/category';
const { errorAfterValidation } = require('../../helpers/errorChecker/errorAfterValidation');
const { customResponse } = require('../../helpers/customResponse/customResponse');

const createNewCategory = (req: Request, res: Response): Response => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, res);
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
const getCategory = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, res);
  }
  const { categoryName } = req.query;
  return categoryServices.getCategory(categoryName).then((category: ICategory): Response => {
    if (!category) {
      return customResponse(res, 422, 'Category not found');
    }
    return customResponse(res, 200, 'Category sended', category);
  });
};
const addTodoToCategory = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, res);
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
