import  { query } from 'express-validator/check';
import { ID_MUST_CONTAIN, MAX_LENGTH } from '@src/constants/validatorsConstants';

export const idValidator = [
  query('id')
    .custom((value) => {
      return !/\s/.test(value);
    })
    .withMessage(ID_MUST_CONTAIN),
  query('id')
    .isLength({ min: 24, max: 25 })
    .withMessage(MAX_LENGTH),
  query('id')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(ID_MUST_CONTAIN),
];
