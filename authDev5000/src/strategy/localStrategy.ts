import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';

import * as userServices from '@src/services/userServices';
import { IUser } from '@src/interfaces/user';

export const localStrategy = new Strategy(
  (username: string, password: string, done) => {
    userServices
      .find({ username })
      .then((user: IUser): Error | IUser => {
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err: Error): Error  => {
        if (err) {
           return done(err);
        }
      });
  },
);
