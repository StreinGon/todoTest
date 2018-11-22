import { Request } from 'express-serve-static-core';
import  { Strategy } from 'passport-jwt';

import * as userServices from '@src/services/userServices';
import { secret } from '@src/constants/otherConstants';
import { AUTH_ERROR } from '@src/constants/statusCodeConstants';
import { IUser } from '@src/interfaces/user';

const cookieExtractor = (req: Request): String => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.Authorization;
  }
  return token;
};
const opts = <any>{};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = secret;

export const jwtStrategy = new Strategy(opts, (jwtPayload, done) => {
  userServices
    .find({ username: jwtPayload.username })
    .then((user: IUser): IUser | Error => {
      if (user) {
        return done(null, user);
      }
      return done(AUTH_ERROR, false);
    })
    .catch((err: Error): Error => {
      if (err) {
        return done(err, false);
      }
    });
});
