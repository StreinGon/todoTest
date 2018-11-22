import { query } from 'express-validator/check';
import { AMOUNT, START_FROM } from '@src/constants/validatorsconstants';
export const todosQueryValidator = [
  query('amount')
    .optional()
    .isNumeric()
    .withMessage(AMOUNT.numeric),
  query('amount')
    .optional()
    .custom(value => value > 0)
    .withMessage(AMOUNT.positive),
  query('startFrom')
    .optional()
    .custom(value => value > 0)
    .withMessage(START_FROM.positive),
  query('startFrom')
    .optional()
    .isNumeric()
    .withMessage(START_FROM.numeric),
];
