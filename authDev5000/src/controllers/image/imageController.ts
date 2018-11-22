import sharp from 'sharp';
import { validationResult } from 'express-validator/check';
import fs from 'mz/fs';
import path from 'path';
import * as nodezip from 'node-zip';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

import { errorAftervalidation } from'@src/helpers/errorChecker/errorAfterValidation';
import { customResponse } from '@src/helpers/customResponse/customResponse';
import { loggerMessage } from '@src/helpers/loggerMessage';
import { IRequest, File } from '@src/interfaces/request';

import * as  todoServices from '@src/services/todoServices';
import * as   imageServices from '@src/services/imageServices';
import * as  constants from '@src/constants/index';
import { UPLOADS } from '@src/constants/otherConstants';
import {
  VALIDATION_ERRORS,
  IMAGE_NAME_ERROR,
  ADD_IMAGE_ERROR,
} from '@src/constants/statusCodeConstants';
import { ITodo } from '@src/interfaces/todo';

const zip = new nodezip();

export const downloadAllAssets = (req: Request, res: Response): Promise<void> => {
  const array = [];
  return fs.readdir(UPLOADS).then((items: String[]): Promise<void> => {
    items.forEach((file: String): void => {
      const promiseTest = fs
        .readFile(path.join(UPLOADS, String(file)))
        .then((data: String): void => {
          zip.file(`${String(file)}.png`, data);
        });
      array.push(promiseTest);
    });

    return Promise.all(array).then((): void => {
      const data = zip.generate({ base64: false, compression: 'DEFLATE' });
      return res.end(data, 'binary');
    });
  }).catch((err: Error): Error => err);

};

export const getImage = (req: Request, res: Response): Response => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  const index = req.url.indexOf('?');
  const imageName = req.url.slice(1, index);
  const height = parseInt(req.query.height, 10);
  const width = parseInt(req.query.width, 10);

  return sharp(`${constants.otherConstants.UPLOADS}${imageName}`)
    .resize(width, height)
    .toBuffer()
    .then((data: String): void | Error => {
      loggerMessage(req, null, null);
      return res.end(data, 'binary');
    })
    .catch((error: Error): void | Error|Response => {
      loggerMessage(req, null, IMAGE_NAME_ERROR);
      return customResponse(res, 422, IMAGE_NAME_ERROR, error);
    });
};
export const addImage = (req: IRequest, res: Response): Promise< void  | Response | Error > | Response => {
  const { id: idTodo } = req.query;
  if (!idTodo) {
    loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
  }

  return todoServices
    .find({ _id: idTodo })
    .then((todo: ITodo[]): Response => {
      if (req.files && todo.length >= 1) {
        req.files.forEach((file: File): void => {
          const photo = imageServices.createImage({
            name: file.filename,
            destination: file.destination,
            originalname: file.originalname,
            url: `${req.headers.host}/image/${file.filename}`,
          });

          todo[0].image.push(photo._id);
          photo.save();
        });
        todo[0].save();
        loggerMessage(req, todo, null);
        return customResponse(
          res,
          200,
          constants.statusConstants.TODO_UPDATED,
          todo,
        );
      }
      loggerMessage(req, null, ADD_IMAGE_ERROR);
      return customResponse(
        res,
        422,
        ADD_IMAGE_ERROR,
      );
    })
    .catch((err: Error): Error | void => {
      if (err) return err;
    });
};
