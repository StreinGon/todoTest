const { validationResult } = require('express-validator/check');
const fs = require('fs');

const { customResponse } = require('../../helpers/customResponse/customResponse');
const { errorAftervalidation } = require('../../helpers/errorChecker/errorAfterValidation');
import * as todoServices from '../../services/todoServices.js';
import * as userServices from '../../services/userServices.js';
import * as imageServices from '../../services/imageServices.js';
import * as priorityServices from '../../services/priorityServices.js';
import { Request, Response } from 'express';
import { IRequest, file } from '../../interfaces/request.js';
import { IUser } from '../../interfaces/user.js';
import { ITodo } from '../../interfaces/todo.js';
import { IImage } from '../../interfaces/image.js';
import { ISharedTodo } from '../../interfaces/sharedTodos.js';
const constants = require('../../constants');
const { userCheck } = require('../../helpers/userCheck/userCheck');
const sharedTodosServices = require('../../services/sharedTodosServices');

const addTodo = (req: IRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { title: todoName } = req.body;
  const { description: task } = req.body;
  const { priority: priority } = req.body;
  const { investigation: investigation } = req.body;
  const image = [];
  if (req.files) {
    req.files.forEach((file: file): void => {

      const photo = imageServices.createImage({
        name: file.filename,
        destination: file.destination,
        originalname: file.originalname,
        url: `localhost:8080/image/${file.filename}`,
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
    status: 'not started',
  });

  newPriority.save();
  const id = newtodo._id;

  return userServices
    .find({ username: req.user.username })
    .then((user: IUser): Response => {

      userServices.userAddNewTodo(user, id)

      return customResponse(
        res,
        200,
        constants.statusConstants.TODO_CREATED,
        newtodo,
      );
    })
    .catch((err: Error): Error | void => {
      if (err) return err;
    });
};
const changeTodo = (req: Request, res: Response): Promise<Error | ITodo> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { id: idTodo } = req.query;
  if (!idTodo) {
    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
  }
  const onFact = req.body.onFact;
  const success = req.body.success;
  const newDescription = req.body.description;
  const status = req.body.status;
  const check = todoServices.changeTodos({
    newDescription,
    success,
    idTodo,
    onFact,
    status,
    id: req.user._id,

  });

  return check.then((todo) => {
    if (!todo) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return customResponse(
      res,
      200,
      constants.statusConstants.TODO_UPDATED,
      todo,
    );
  });
};

const deleteTodo = (req: Request, res: Response): Promise<Response | Error> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { id: idTodo } = req.query;
  return todoServices.deleteTodo(req.user._id, idTodo).then((image) => {
    if (!image) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    if (image) {
      return imageServices
        .find({ _id: image })
        .then((image: IImage): Promise<Response | Error> => {
          if (image.name !== 'test') {
            fs.unlinkSync(`${image.destination}${image.name}`);
            image[0].remove();
          }
          return customResponse(res, 200, constants.statusConstants.TODO_DELETED);
        })
        .catch((err: Error): Error => {
          return err;
        });
    }
    return customResponse(res, 200, constants.statusConstants.TODO_DELETED);
  });
};
const getTodo = (req: Request, res: Response): Promise<Error | Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  userCheck(req, res);
  const { id } = req.query;
  const check = todoServices.getTodo(req.user._id, id);
  return check.then((todo: Array<ITodo>): Promise<Response | Error> => {
    if (!todo || todo.length < 1) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return imageServices.find({ _id: todo[0].image }).then((image: IImage): Promise<Response | Error> => {
      return customResponse(res, 200, constants.statusConstants.TODO_SENDED, {
        todo,
        image,
      });
    });
  });
};
const GetShared = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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
        shared.allowed.forEach((user) => {
          if (user === req.user.id) {
            checker = true;
          }
        });
        if (checker) {
          return customResponse(res, 200, 'Shared Todos', shared.todos);
        }
        return customResponse(res, 422, 'Not allowed');
      }
      return customResponse(res, 422, 'Shared not found');
    });
};
export {
  addTodo,
  changeTodo,
  deleteTodo,
  getTodo,
  GetShared,
};
