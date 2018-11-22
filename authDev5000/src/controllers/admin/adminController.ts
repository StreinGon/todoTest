import { validationResult } from 'express-validator/check';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

import { customResponse } from '@src/helpers/customResponse/customResponse';
import { errorAftervalidation } from '@src/helpers/errorChecker/errorAfterValidation';
import { createReport } from '@src/helpers/createReport';
import { loggerMessage } from '@src/helpers/loggerMessage';

import * as  userServices from '@src/services/userServices';
import * as  todoServices from '@src/services/todoServices';
import * as constants from'@src/constants/index';

import { IUser } from '@src/interfaces/user';
import { IError } from '@src/interfaces/error';
import { ITodo } from '@src/interfaces/todo';
import {
  ERRORS,
  VALIDATION_ERRORS,
  USER_MUST_LOGIN_AS_ADMIN,
  USER_NOT_FOUND, TODOLIST,
  USERLIST,
} from '@src/constants/statusCodeConstants';

export const changeTodoAsAdmin = (req: Request, res: Response): Promise<IUser> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, ERRORS);
    return errorAftervalidation(errors, res);
  }

  return userServices
    .find({ username: req.user.username })
    .populate('role')
    .exec((err: IError, user: IUser): Promise<Response | IError> | Response => {
      if(err){
        loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
      }
      if (user.role.rights !== 1) {
        loggerMessage(req, null, USER_MUST_LOGIN_AS_ADMIN);
        return customResponse(res, 422, USER_MUST_LOGIN_AS_ADMIN);
      }
      const { idTodo } = req.query;
      const { idUser } = req.query;
      if (!idTodo || !idUser) {
        loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
      }

      return userServices
        .find({ _id: idUser })
        .then((user: IUser): Promise<Response> | Response => {

          if (!user) {
            loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse(
              res,
              422,
              constants.statusConstants.NOT_FOUND,
            );
          }
          return todoServices.changeTodosAsAdmin(idTodo, idUser)
          .then((todo: Error | ITodo): Response => {
            if (!todo) {
              loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
              return customResponse(
                res,
                422,
                constants.statusConstants.NOT_FOUND,
              );
            }
            loggerMessage(req, todo, constants.statusConstants.TODO_UPDATED);
            return customResponse(
              res,
              200,
              constants.statusConstants.TODO_UPDATED,
              todo,
            );
          });
        })
        .catch((err: IError): IError => err);
    });
};
export const getUserlist = (req: Request, res: Response):  Promise<Response | Error> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  return userServices
    .find({ username: req.user.username })
    .populate('role')
    .then((user: IUser): Promise<Response | Error> | Response => {
      if (user.role.rights === 1) {
        return userServices
          .find({})
          .then((users: IUser): Response => {
            loggerMessage(req, res, null);
            return customResponse(res, 200, USERLIST, users);
          })
          .catch((err: Error): Error => err);
      }
      loggerMessage(req, null, USER_MUST_LOGIN_AS_ADMIN);
      return customResponse(res, 422, USER_MUST_LOGIN_AS_ADMIN);
    });
};
export const getTodolist = (req: Request, res: Response): Promise<IUser> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  const { userID } = req.query;
  return userServices
    .find({ username: req.user.username })
    .populate('role')
    .exec((err: Error, user: IUser): Promise<Response> | Response => {
      if(err){
        loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
      }
      if (user.role.rights === 1) {
        return userServices.find({ _id: userID })
        .then((user: IUser): Promise<Response> | Response => {
          if (!user) {
            loggerMessage(req, null, USER_NOT_FOUND);
            return customResponse(res, 422, USER_NOT_FOUND);
          }
          return todoServices.findAll({ todoOwner: user._id })
          .then((todo: ITodo[]): Response => {
            loggerMessage(req, null);
            return customResponse(res, 200 , TODOLIST , {
              todoList: todo,
            });
          });
        });
      }
      loggerMessage(req, null, USER_MUST_LOGIN_AS_ADMIN);
      return customResponse(res, 422, USER_MUST_LOGIN_AS_ADMIN);
    });
};

export const getMonthlyReport = (req: Request, res: Response): Promise<IUser> => {
  return userServices
    .find({ username: req.user.username })
    .populate('role')
    .exec((err: IError, user:IUser): Response | Promise<ITodo[]> => {
      if(err){
        loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
      }
      if (user.role.rights === 1) {
        return createReport(res);
      }
      return customResponse(res, 422, USER_MUST_LOGIN_AS_ADMIN);
    });
};
