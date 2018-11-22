import { validationResult } from 'express-validator/check';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

import * as categoryServices from '@src/services/categoryServices';
import * as todoServices from '@src/services/todoServices';

import { ICategory } from '@src/interfaces/category';
import { errorAftervalidation } from '@src/helpers/errorChecker/errorAfterValidation';
import { loggerMessage } from '@src/helpers/loggerMessage';
import { customResponse } from '@src/helpers/customResponse/customResponse';
import {
  VALIDATION_ERRORS,
  CATEGORY_NOT_FOUND,
  CATEGORY_NOT_CREATED,
  CATEGORY_CREATED,
  CATEGORY_SENDED,
  CATEGORY_NOT_UPDATED,
  CATEGORY_UPDATED,
} from '@src/constants/statusCodeConstants';
import { ITodo } from '@src/interfaces/todo';

export const createNewCategory = (req: Request, res: Response): Promise<Response> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  const { categoryName } = req.body;
  return categoryServices
    .createNewCategory({ name: categoryName })
    .then((createdCategory: ICategory): Response => {
      if (!createdCategory) {
        loggerMessage(req, null, CATEGORY_NOT_CREATED);
        return customResponse(res, 422, CATEGORY_NOT_CREATED);
      }
      loggerMessage(req, createdCategory._id, null);
      return customResponse(res, 200, CATEGORY_CREATED, createdCategory);
    });
};
export const getCategory = (req: Request, res: Response): Promise<Response> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  const { categoryName } = req.query;
  return categoryServices.getCategory(categoryName).then((category: ICategory[]): Response => {
    if (!category || category.length < 1) {
      loggerMessage(req, null, CATEGORY_NOT_FOUND);
      return customResponse(res, 422, CATEGORY_NOT_FOUND);
    }
    loggerMessage(req, category, null);
    return customResponse(res, 200, CATEGORY_SENDED, category);
  });
};
export const addTodoToCategory = (req: Request, res: Response): Promise<Response> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  const { todoID } = req.query;
  const { categoryName } = req.body;
  return categoryServices
    .AddNewTodo(categoryName, todoID)
    .then((updatedCategory: ICategory): Response => {
      if (!updatedCategory) {
        loggerMessage(req, null, CATEGORY_NOT_UPDATED);
        return customResponse(res, 422, CATEGORY_NOT_UPDATED);
      }
      todoServices.find({ _id: todoID }).then((todo: ITodo[]): Response => {
        if (!todo || todo.length < 1) {
          loggerMessage(req, null, CATEGORY_NOT_UPDATED);
          return customResponse(res, 422, CATEGORY_NOT_UPDATED);
        }
        todo[0].category = updatedCategory.name;
        todo[0].save();
        loggerMessage(req, updatedCategory, null);
        return customResponse(res, 200, CATEGORY_UPDATED, updatedCategory);
      });
    });
};
