import { query } from 'express-validator/check';
import { WIDTH, HEIGHT } from '@src/constants/validatorsconstants';

export const resizeValidators = [
  query('width')
    .custom(value => /^[0-9]+$/.test(value))
    .withMessage(WIDTH),
  query('height')
    .custom(value => /^[0-9]+$/.test(value))
    .withMessage(HEIGHT),
];
