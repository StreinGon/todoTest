import { validationResult } from 'express-validator/check';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

import * as  todoServices from '@src/services/todoServices';

import { ITodo } from '@src/interfaces/todo';
import { customResponse } from '@src/helpers/customResponse/customResponse';
import { loggerMessage } from '@src/helpers/loggerMessage';
import { userCheck } from '@src/helpers/userCheck/userCheck';
import { errorAftervalidation } from '@src/helpers/errorChecker/errorAfterValidation';
import { VALIDATION_ERRORS, TODOLIST } from '@src/constants/statusCodeConstants';

export const getTodolist = (req: Request, res: Response): Promise<ITodo[]>|Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const currentUser = req.user;
  const { startFrom } = req.query;
  const { amount } = req.query;
  const { sortType } = req.query;
  const amountInt = parseInt(amount, 10);
  const startFromInt = parseInt(startFrom, 10);
  const { sortDirection } = req.query;
  const sortParametr = `${
    sortDirection === 'descending' ? '-' : ''
    }${sortType}`;
  return todoServices
    .find({ todoOwner: currentUser._id })
    .skip(startFromInt)
    .limit(amountInt)
    .populate('priority')
    .sort(sortParametr)
    .exec((err: Error, todo: ITodo[]): Response => {
      loggerMessage(req, null, null);
      if (!amount || !startFrom) {
        return customResponse(res, 200, TODOLIST, {
          todoList: todo,
        });
      }
      return customResponse(res, 200, TODOLIST, {
        todoList: todo,
        countAlltodo: todo.length,
        startFrom: startFromInt,
        amount: amountInt,
      });
    });
};
