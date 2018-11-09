const sharp = require('sharp');
const { validationResult } = require('express-validator/check');
const fs = require('mz/fs');
const path = require('path');
const nodezip = require('node-zip');
const zip = new nodezip();

const { errorAftervalidation } = require('../../helpers/errorChecker/errorAfterValidation');
const { customResponse } = require('../../helpers/customResponse/customResponse');
import * as  todoServices from '../../services/todoServices.js';
import * as   imageServices from '../../services/imageServices.js';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { IRequest, file } from '../../interfaces/request.js';
const constants = require('../../constants');

const downloadAllAssets = (req: Request, res: Response): Response => {
  const array = [];
  fs.readdir('public/uploads').then((items) => {
    items.forEach((file: String): void => {
      const promiseTest = fs
        .readFile(path.join('public/uploads', String(file)))
        .then((data: String): void => {
          zip.file(`${String(file)}.png`, data);
        });
      array.push(promiseTest);
    });

    Promise.all(array).then(() => {
      const data = zip.generate({ base64: false, compression: 'DEFLATE' });
      res.end(data, 'binary');
    });
  }).catch((err: Error): Error => err);
  return customResponse(res, 422, "Fatal Error");
};

const getImage = (req: Request, res: Response): Response => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
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

      return res.end(data, 'binary');
    })
    .catch((error: Error): void | Error => { return customResponse(res, 422, "Image name Error", error) });
};
const addImage = (req: IRequest, res: Response): Promise<void | Error | Response> => {
  const { id: idTodo } = req.query;
  if (!idTodo) {
    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
  }

  return todoServices
    .find({ _id: idTodo })
    .then((todo): Response => {
      if (req.files && todo.length >= 1) {
        req.files.forEach((file: file): void => {
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
        return customResponse(
          res,
          200,
          constants.statusConstants.TODO_UPDATED,
          todo,
        );
      }
      return customResponse(
        res,
        422,
        'Add image error,check your files or id of todo',
      );
    })
    .catch((err: Error): Error | void => {
      if (err) return err;
    });
};
export { addImage, getImage, downloadAllAssets };
