import  { query } from 'express-validator/check';
import {
  ID_MUST_CONTAIN,
  MAX_LENGTH,
  CATEGORY_MUST_CONTAIN } from '@src/constants/validatorsConstants';

export const addCategory = [
  query('categoryName')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(CATEGORY_MUST_CONTAIN),
];
export const getCategory = [
  query('categoryName')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(CATEGORY_MUST_CONTAIN),
];
export const addTodoToCategory = [
  query('categoryName')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(CATEGORY_MUST_CONTAIN),
  query('todoID')
    .custom((value) => {
      return !/\s/.test(value);
    })
    .withMessage(ID_MUST_CONTAIN),
  query('todoID')
    .isLength({ min: 24, max: 24 })
    .withMessage(MAX_LENGTH),
  query('todoID')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(ID_MUST_CONTAIN),
];
