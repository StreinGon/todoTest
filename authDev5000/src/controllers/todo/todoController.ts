import { validationResult } from 'express-validator/check';
import fs = require('fs');
import { Request, Response } from 'express';
import mongoose from 'mongoose'

import { customResponse } from '@src/helpers/customResponse/customResponse';
import { errorAftervalidation } from '@src/helpers/errorChecker/errorAfterValidation';
import { loggerMessage } from '@src/helpers/loggerMessage';
import { userCheck } from'@src/helpers/userCheck/userCheck';

import { IRequest, File } from '@src/interfaces/request';
import { IUser } from '@src/interfaces/user';
import { ITodo } from '@src/interfaces/todo';
import { IImage } from '@src/interfaces/image';
import { ISharedTodo } from '@src/interfaces/sharedTodos';

import * as todoServices from '@src/services/todoServices';
import * as userServices from '@src/services/userServices';
import * as imageServices from '@src/services/imageServices';
import * as priorityServices from '@src/services/priorityServices';
import * as constants from'@src/constants/index';
import * as sharedTodosServices from'@src/services/sharedTodosServices';
import { PENDING } from '@src/constants/otherConstants';
import {
  VALIDATION_ERRORS,
  NOT_ALLOWED, SHARED_TODOS,
  SHARED_TODOS_NOT_FOUND,
} from '@src/constants/statusCodeConstants';

export const addTodo = (req: IRequest, res: Response): Promise<Response | Error | void> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { title: todoName } = req.body;
  const { description: task } = req.body;
  const { priority: priority } = req.body;
  const { investigation: investigation } = req.body;
  const image = [];
  if (req.files) {
    req.files.forEach((file: File): void => {
      const photo = imageServices.createImage({
        name: file.filename,
        destination: file.destination,
        originalname: file.originalname,
        url: `${req.headers.host}/image/${file.filename}`,
      });
      image.push(photo._id);
      photo.save();
    });
  }
  const newPriority = priorityServices.createPriority(priority);
  const newtodo = todoServices.createNewTodo({
    todoName,
    task,
    image,
    todoOwner: req.user._id,
    priority: newPriority._id,
    timeTracking: {
      investigation,
    },
    status: PENDING,
  });
  newPriority.save();
  const id = newtodo._id;
  return userServices
    .find({ username: req.user.username })
    .then((user: IUser): Response => {

      userServices.userAddNewTodo(user, id);
      loggerMessage(req, newtodo._id, null);
      return customResponse(
        res,
        200,
        constants.statusConstants.TODO_CREATED,
        newtodo,
      );
    })
    .catch((err: Error): Error | void => {
      if (err) {
        return err;
      }
    });
};

export const changeTodo = (req: Request, res: Response): Promise<Response> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { id: idTodo } = req.query;
  if (!idTodo) {
    loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
  }
  const { onFact } = req.body;
  const { success } = req.body;
  const { newDescription } = req.body;
  const { status } = req.body;
  const check = todoServices.changeTodos({
    newDescription,
    success,
    idTodo,
    onFact,
    status,
    id: req.user._id,

  });
  return check.then((todo: ITodo): Response => {
    if (!todo) {
      loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    loggerMessage(req, todo, null);
    return customResponse(
      res,
      200,
      constants.statusConstants.TODO_UPDATED,
      todo,
    );
  });
};

export const deleteTodo = (req: Request, res: Response): Promise<Response | Error> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { id: idTodo } = req.query;
  return todoServices.deleteTodo(req.user._id, idTodo).then((image: IImage): Promise<Response | Error> | Response => {
    if (!image) {
      loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    if (image) {
      return imageServices
        .find({ _id: image })
        .then((image: IImage[]): Promise<Response | Error> | Response => {
          if (image[0].name !== 'test') {
            fs.unlinkSync(`${image[0].destination}${image[0].name}`);
            image[0].remove();
          }
          loggerMessage(req, idTodo, null);
          return customResponse(res, 200, constants.statusConstants.TODO_DELETED);
        })
        .catch((err: Error): Error => {
          return err;
        });
    }
    loggerMessage(req, idTodo, null);
    return customResponse(res, 200, constants.statusConstants.TODO_DELETED);
  });
};

export const getTodo = (req: Request, res: Response): Promise<Error | Response>|Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { id } = req.query;
  const check = todoServices.getTodo(req.user._id, id);
  return check.then((todo: ITodo[]): Promise<Response | Error>|Response => {
    if (!todo || todo.length < 1) {
      loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return imageServices.find({ _id: todo[0].image })
    .then((image: IImage[]): Promise<Response | Error>|Response => {
      loggerMessage(req, id, null);
      return customResponse(res, 200, constants.statusConstants.TODO_SENDED, {
        todo,
        image,
      });
    });
  });
};

export const getShared = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { id } = req.query;
  sharedTodosServices
    .find({ _id: id })
    .populate('todos')
    .then((shared: ISharedTodo): Response => {
      if (shared) {
        let checker = false;
        shared.allowed.forEach((user: mongoose.Schema.Types.ObjectId): void => {
          if (user === req.user.id) {
            checker = true;
          }
        });
        if (checker) {
          loggerMessage(req, id, null);
          return customResponse(res, 200, SHARED_TODOS, shared.todos);
        }
        loggerMessage(req, null, NOT_ALLOWED);
        return customResponse(res, 422, NOT_ALLOWED);
      }
      loggerMessage(req, null, SHARED_TODOS_NOT_FOUND);
      return customResponse(res, 422, SHARED_TODOS_NOT_FOUND);
    });
};
