import { query } from 'express-validator/check';
import { MAX_LENGTH, ID_MUST_CONTAIN } from '@src/constants/validatorsConstants';

export const changeTodoAsAdminValidator = [
  query('idUser')
    .custom(value => !/\s/.test(value))
    .withMessage(ID_MUST_CONTAIN),
  query('idUser')
    .isLength({ min: 24, max: 25 })
    .withMessage(MAX_LENGTH),
  query('idUser')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(ID_MUST_CONTAIN),
  query('idTodo')
    .custom(value => !/\s/.test(value))
    .withMessage(ID_MUST_CONTAIN),
  query('idTodo')
    .isLength({ min: 24, max: 25 })
    .withMessage(MAX_LENGTH),
  query('idTodo')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(ID_MUST_CONTAIN),
];
