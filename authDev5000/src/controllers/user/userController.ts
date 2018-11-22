import { validationResult } from 'express-validator/check';
import { createTransport } from 'nodemailer';
import * as uuid from 'uuid/v1';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

import { IUser } from '@src/interfaces/user';
import { IImage } from '@src/interfaces/image';
import { ISharedTodo } from '@src/interfaces/sharedTodos';
import { loggerMessage } from '@src/helpers/loggerMessage';
import { customResponse } from '@src/helpers/customResponse/customResponse';
import { errorAftervalidation } from '@src/helpers/errorChecker/errorAfterValidation';
import { InviteToRegModel } from '@src/models/inviteReg';
import { transporterConfig } from '@src/configs/transporter';

import * as sharedTodosServices from '@src/services/sharedTodosServices';
import * as  userServices from '@src/services/userServices';
import * as imageServices from '@src/services/imageServices';
import * as constants from'@src/constants/index';
import {
  ERRORS,
  EMAIL_SENDED,
  USER_SENDED,
  VALIDATION_ERRORS,
 } from '@src/constants/statusCodeConstants';

const transporter = createTransport(transporterConfig);

const getUser = (req: Request, res: Response): Promise<Response> | Response => {
  const check = userServices.getUser({ _id: req.user._id });
  return check.then((user: IUser): Promise<Response> | Response => {
    if (!user) {
      loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return imageServices.find({ _id: user.avatar }).then((image: IImage[]): Promise<Response> | Response => {
      loggerMessage(req, user._id, null);
      return customResponse(res, 200, USER_SENDED, {
        user,
        image,
      });
    });
  }).catch((error: Error): Response => res.send(error));
};
const sendInvite = (req: Request, res: Response): Promise<Response> | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  const { mail } = req.body;
  const check = userServices.getUser({ mail });

  return check.then((user: IUser): Promise<Response> | Response => {

    if (!user) {
      loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    const mailOptions = {
      from: req.user.mail,
      to: mail,
      subject: 'InviteCode',
      text: String(`${req.headers.host}/users/?invite=${req.user.invite}`),
    };
    return sharedTodosServices.find({ _id: req.user.invite })
    .then((shared: ISharedTodo): Promise<Response> => {
      shared.todos = req.user.todos;
      shared.allowed.push(req.user._id);
      shared.save();
      return transporter.sendMail(mailOptions, (error: Error, info: Object): Response => {
        if (error) {
          loggerMessage(req, null, ERRORS);
          return customResponse(res, 422, ERRORS, error);
        }
        loggerMessage(req, null, null);
        return customResponse(res, 200, EMAIL_SENDED);

      });
    });
  });
};
const sendInviteToReg = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerMessage(req, null, VALIDATION_ERRORS);
    return errorAftervalidation(errors, res);
  }
  const { mail } = req.body;
  mail.forEach((element: String): void => {
    const inviteToken = uuid();
    const newToken = new InviteToRegModel({
      invite_token: inviteToken,
    });
    newToken.save();
    const mailOptions = {
      from: req.user.mail,
      to: element,
      subject: 'InviteCode',
      text: String(`${req.headers.host}/users/?inviteToReg=${inviteToken}`),
    };
    transporter.sendMail(mailOptions, (error: Error, info: Object): Response | void => {
      if (error) {
        loggerMessage(req, null, ERRORS);
        return customResponse(res, 422, ERRORS, error);
      }
    });
  });

  loggerMessage(req, null, null);
  return customResponse(res, 422, EMAIL_SENDED);
};
export { getUser, sendInvite, sendInviteToReg };
