const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');

import * as  imageServices from '../../services/imageServices';
import * as  roleServices from '../../services/roleServices.js';
import * as  userServices from '../../services/userServices.js';
import * as  sharedTodosServices from '../../services/sharedTodosServices';
import { Request } from 'express-serve-static-core';
import { Response, NextFunction } from 'express';
import { IError } from '../../interfaces/error';
import { IUser } from '../../interfaces/user';
import { IRequest } from '../../interfaces/request';


const { errorAftervalidation } = require('../../helpers/errorChecker/errorAfterValidation');
const { SharedTodosModel } = require('../../models/sharedTodos');
const { InviteToRegModel } = require('../../models/inviteReg');

const saltRounds = 10;
const secret = Buffer.from('1', 'base64');
const { customResponse } = require('../../helpers/customResponse/customResponse');
const constants = require('../../constants');

const singIn = (req: Request, res: Response, next: NextFunction): Response | void => {
  passport.authenticate('local', (err: IError, user: IUser, info: String): Response | void => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return customResponse(
        res,
        400,
        constants.statusConstants.LOGIN_INCORRECT,
      );
    }
    return req.logIn(user, (error: IError): IError | Response => {
      if (error) return error;
      const changedUser = {
        _id: user._id,
        username: user.username,
        mail: user.mail,
        role: user.role,
      };
      const token = jwt.sign(changedUser, secret, {
        expiresIn: 86400 * 30,
      });

      if (req.query.invite) {
        sharedTodosServices.find({ _id: req.query.invite }).then((shared): void => {
          shared.allowed.push(user._id);

          shared.save();
        });
      }
      res.cookie(constants.statusConstants.AUTH_COOKIES, token);
      return customResponse(
        res,
        200,
        constants.statusConstants.LOGIN_CORRECT,
        changedUser,
      );
    });
  })(req, res, next);
};

const singUp = (req: IRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  const photo = imageServices.createImage({
    name: req.file ? req.file.filename : 'test',
    destination: req.file ? req.file.destination : 'public/uploads/',
    originalname: req.file ? req.file.originalname : 'test',
    url: `${req.headers.host}/image/${req.file ? req.file.filename : 'test'}`,
  });
  const newShared = new SharedTodosModel({});
  const avatarId = photo._id;
  photo.save();
  const newRole = roleServices.createRoleOfUser(0);
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  return newRole.save((err: Error): Error | Response => {
    if (err) return err;
    return userServices
      .createNewUser({
        username: req.body.username,
        password: hash,
        mail: req.body.mail,
        role: newRole._id,
        avatar: avatarId,
        invite: newShared._id,
      })
      .then((user: IUser): Response => {
        newShared.todos = user.todos;
        newShared.save();
        if (req.query.inviteToReg) {
          InviteToRegModel
            .findOne({ invite_token: req.query.inviteToReg })
            .then((token) => {
              token.remove();
            });
        }
        if (req.query.invite) {
          sharedTodosServices.find({ _id: req.query.invite }).then((shared) => {
            shared.allowed.push(user._id);
            shared.save();
          });
        }
        return customResponse(
          res,
          200,
          constants.statusConstants.REDISTRATION_SUCCESSFULL,
        );
      });
  });
};
const logout = (req: Request, res: Response): Response => {
  req.logout();
  res.cookie(constants.statusConstants.AUTH_COOKIES, null);
  return customResponse(res, 200, constants.statusConstants.LOGOUT);
};
export { singIn, singUp, logout };
