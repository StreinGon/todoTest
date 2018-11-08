const { validationResult } = require('express-validator/check');


const { customResponse } = require('../../helpers/customResponse/customResponse');
const { errorAfterValidation } = require('../../helpers/errorChecker/errorAfterValidation');
import * as  userServices from '../../services/userServices.js';
import * as  todoServices from '../../services/todoServices.js';
import { IUser } from '../../interfaces/user'
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { IError } from '../../interfaces/error.js';
import { ITodo } from '../../interfaces/todo.js';
const constants = require('../../constants');
const { createReport } = require('../../helpers/createReport');

const changeTodoAsAdmin = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, res);
  }

  return userServices
    .find({ username: req.user.username })
    .populate('role')
    .exec((err: IError, user): Response => {
      if (user.role.rights !== 1) {
        return customResponse(res, 422, 'Use must login as admin');
      }
      const { idTodo } = req.query;
      const { idUser } = req.query;
      if (!idTodo || !idUser) {

        return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
      }

      return userServices
        .find({ _id: idUser })
        .then((user: IUser): Response => {

          if (!user) {
            return customResponse(
              res,
              422,
              constants.statusConstants.NOT_FOUND,
            );
          }
          const check = todoServices.changeTodosAsAdmin(idTodo, idUser);
          return check.then((todo: ITodo): Response => {
            if (!todo) {
              return customResponse(
                res,
                422,
                constants.statusConstants.NOT_FOUND,
              );
            }
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
const getUserlist = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, res);
  }
  return userServices
    .find({ username: req.user.username })
    .populate('role')
    .exec((err: IError, user): Response => {
      if (user.role.rights === 1) {
        return userServices
          .find({})
          .then((users: Array<IUser>): Response => {
            return customResponse(res, 200, 'UsersList', users);
          })
          .catch((err: IError): IError => err);
      }
      return customResponse(res, 422, 'You must login as admin');
    });
};
const getTodolist = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, res);
  }
  const { userID } = req.query;
  return userServices
    .find({ username: req.user.username })
    .populate('role')
    .exec((err: IError, user) => {
      if (user.role.rights === 1) {
        return userServices.find({ _id: userID }).then((user: IUser): Response => {
          if (!user) {
            return customResponse(res, 422, 'User Not found');
          }
          return todoServices.findAll({ todoOwner: user._id }).then((todo: Array<ITodo>): Response => {
            return customResponse(res, 200, 'Todo list of user', {
              todoList: todo,
            });
          });
        });
      }
      return customResponse(res, 422, 'You must login as admin');
    });
};

const getMonthlyReport = (req: Request, res: Response): Response => {
  return userServices
    .find({ username: req.user.username })
    .populate('role')
    .exec((err: IError, user): Response => {
      if (user.role.rights === 1) {
        return createReport(res);
      }
      return customResponse(res, 422, 'Your must be admin');
    });
};

export {
  getUserlist,
  changeTodoAsAdmin,
  getTodolist,
  getMonthlyReport,
};
