import { body, check } from 'express-validator/check';

import  * as userServices from '@src/services/userServices';
import { IUser } from '@src/interfaces/user';
import { MAIL, USERNAME, PASSWORD } from '@src/constants/validatorsConstants';

export const registrationValidator = [
  check('mail')
    .isEmail()
    .withMessage(MAIL.INCORRECT),
  check('mail')
    .custom(value => !/^[а-яА-Я]+$/.test(value))
    .withMessage(MAIL.LATIN),
  check('username')
    .custom(value => !/\s/.test(value))
    .withMessage(USERNAME.NO_SPACES),
  check('username')
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(
      USERNAME.NO_SPECIAL,
    ),
  check('username')
    .isLength({ min: 5 })
    .withMessage(USERNAME.MIN),
  check('password')
    .custom(value => !/\s/.test(value))
    .withMessage(PASSWORD.NO_SPACES),
  check('password')
    .isLength({ min: 5 })
    .withMessage(PASSWORD.MIN),
];
export const checkForExistingEmail = body('mail')
.custom((value: String): Promise< String | Boolean > => {
  return userServices.find({ mail: value }).then((user: IUser): Promise< String | Boolean > => {
    if (user) {
      return Promise.reject(new Error(MAIL.ALREADY_IN_USE));
    }
    return Promise.resolve(true);
  });
});
