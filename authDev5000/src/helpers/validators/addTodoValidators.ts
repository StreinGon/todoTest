import { body } from 'express-validator/check';

import  * as todoServices from'@src/services/todoServices';
import { ITodo } from '@src/interfaces/todo';
import {
  PRIORITY_ONLY,
  TITLE_MUST_BE,
  DESCRIPTION,
  INVESTIGATION_INTEGER,
  TITLE_NO_SPACES,
  SPECIAL_SIMBOLS_IN_TITLE,
} from '@src/constants/validatorsConstants';

export const addTodoValidator = [
  body('investigation')
    .custom(value => /^[1-9]+$/.test(value))
    .withMessage(INVESTIGATION_INTEGER),
  body('priority')
    .custom(value => /^[0-2]$/.test(value))
    .withMessage(PRIORITY_ONLY),
  body('title')
    .isLength({ min: 5 })
    .withMessage(TITLE_MUST_BE),
  body('title')
    .custom(value => !/\s/.test(value))
    .withMessage(TITLE_NO_SPACES),
  body('title')
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(SPECIAL_SIMBOLS_IN_TITLE),
  body('description')
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(DESCRIPTION.NO_SPECIAL),
  body('description')
    .isLength({ min: 5 })
    .withMessage(DESCRIPTION.MIN),
];
export const checkForExistingTitle = body('title')
.custom((value: String): Promise<String | boolean> | boolean => {
  return todoServices.find({ todoName: value })
  .then((task: ITodo[]): Promise< String | boolean > | boolean => {
    if (task && task.length !== 0) {
      return Promise.reject(
        new Error('Task with your title is already being performed'),
      );
    }
    return true;
  });
});
export const checkForExistingDescription = [body('description')
.custom((value: String): Promise<String | boolean> | boolean => {
  return todoServices.find({ task: value })
  .then((todo: ITodo[]): Promise< String | boolean > | boolean => {
    if (todo && todo.length !== 0) {
      return Promise.reject(
        new Error('Task with your description is already being performed'),
      );
    }
    return true;
  });
}),
];
