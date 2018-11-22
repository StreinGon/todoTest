import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator/check';
import { Request } from 'express-serve-static-core';
import { Response, NextFunction } from 'express';

import * as  imageServices from '@src/services/imageServices';
import * as  roleServices from '@src/services/roleServices';
import * as  userServices from '@src/services/userServices';
import * as  sharedTodosServices from '@src/services/sharedTodosServices';
import * as constants  from '@src/constants/index';

import { IError } from '@src/interfaces/error';
import { IUser } from '@src/interfaces/user';
import { IRequest } from '@src/interfaces/request';
import { errorAftervalidation } from '@src/helpers/errorChecker/errorAfterValidation';
import { customResponse } from '@src/helpers/customResponse/customResponse';
import { SharedTodosModel } from'@src/models/sharedTodos';
import { InviteToRegModel } from'@src/models/inviteReg';
import { secret, UPLOADS } from '@src/constants/otherConstants';
import { ISharedTodo } from '@src/interfaces/sharedTodos';
import { IInviteReg } from '@src/interfaces/inviteReg';
import { IRole } from '@src/interfaces/role';

export const singIn = (req: Request, res: Response, next?: NextFunction): Response | void => {
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
      const token = jsonwebtoken.sign(changedUser, secret, {
        expiresIn: 86400 * 30,
      });

      if (req.query.invite) {
        sharedTodosServices.find({ _id: req.query.invite }).then((shared: ISharedTodo): void => {
          shared.allowed.push(user._id);

          shared.save();
        });
      }
      res.cookie(constants.statusConstants.AUTH_COOKIES, token);
      return customResponse(
        res,
        200,
        constants.statusConstants.LOGIN_CORRECT,
        { token, user: changedUser },
      );
    });
  })(req, res, next);
};

export const singUp = (req: IRequest, res: Response): Promise< IRole > | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorAftervalidation(errors, res);
  }
  const photo = imageServices.createImage({
    name: req.file ? req.file.filename : 'test',
    destination: req.file ? req.file.destination : UPLOADS,
    originalname: req.file ? req.file.originalname : 'test',
    url: `${req.headers.host}/image/${req.file ? req.file.filename : 'test'}`,
  });
  const newShared = new SharedTodosModel({});
  const avatarId = photo._id;
  photo.save();
  const newRole = roleServices.createRoleOfUser(0);
  const hash = bcrypt.hashSync(req.body.password, 10);
  return newRole.save((err: Error): Promise<Error | Response> => {
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
            .then((token: IInviteReg): void => {
              token.remove();
            });
        }
        if (req.query.invite) {
          sharedTodosServices.find({ _id: req.query.invite }).then((shared: ISharedTodo): void => {
            shared.allowed.push(user._id);
            shared.save();
          });
        }
        return customResponse(
          res,
          200,
          constants.statusConstants.REDISTRATION_SUCCESSFULL,
          user,
        );
      });
  });
};
export const logout = (req: Request, res: Response): Response => {
  req.logout();
  res.cookie(constants.statusConstants.AUTH_COOKIES, null);
  return customResponse(res, 200, constants.statusConstants.LOGOUT);
};
