const { validationResult } = require('express-validator/check');
const nodemailer = require('nodemailer');
const uuidv1 = require('uuid/v1');


const { customResponse } = require('../../helpers/customResponse/customResponse');
const { errorAfterValidation } = require('../../helpers/errorChecker/errorAfterValidation');
import * as  userServices from '../../services/userServices.js';
import * as imageServices from '../../services/imageServices.js';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { IUser } from '../../interfaces/user.js';
import { IImage } from '../../interfaces/image.js';

const constants = require('../../constants');
const { InviteToRegModel } = require('../../models/inviteReg');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'artem.kovaleskii@gmail.com',
    pass: '9101991leva5',
  },
});


const getUser = (req: Request, res: Response) => {
  const check = userServices.getUser({ _id: req.user._id });
  return check.then((user: IUser) => {
    if (!user) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return imageServices.find({ _id: user.avatar }).then((image: IImage): Response => {
      return customResponse(res, 200, 'User sended', {
        user,
        image,
      });
    });
  }).catch((error: Error): Response => res.send(error));
};
const sendInvite = (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, res);
  }
  const { mail } = req.body;
  const check = userServices.getUser({ mail });

  return check.then((user: IUser): Response => {
    if (!user) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    const mailOptions = {
      from: req.user.mail,
      to: mail,
      subject: 'InviteCode',
      text: String(`${req.headers.host}/users/?invite=${req.user.invite}`),
    };
    return InviteToRegModel.find({ _id: req.user.invite }).then((shared): Response => {
      shared.todos = req.user.todos;
      shared.allowed.push(req.user._id);
      shared.save();
      return transporter.sendMail(mailOptions, (error: Error, info: Object) => {
        if (error) {
          return customResponse(res, 422, 'Errors', error);
        }
        return customResponse(res, 200, 'Email sent ');

      });
    });
  });
};
const sendInviteToReg = (req: Request, res: Response): Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, res);
  }
  const { mail } = req.body;

  for (let i = 0; i < mail.length; i = i + 1) {
    const inviteToken = uuidv1();
    const newToken = new InviteToRegModel({
      invite_token: inviteToken,
    });
    newToken.save();
    const mailOptions = {
      from: req.user.mail,
      to: mail[i],
      subject: 'InviteCode',
      text: String(`${req.headers.host}/users/?inviteToReg=${inviteToken}`),
    };
    transporter.sendMail(mailOptions, (error: Error, info: Object): Response | void => {
      if (error) {
        return customResponse(res, 422, 'Errors', error);
      }
    });
  }
  return customResponse(res, 422, 'Emails sended');
};
export { getUser, sendInvite, sendInviteToReg };
