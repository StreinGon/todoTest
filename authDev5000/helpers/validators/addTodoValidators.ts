const { body } = require('express-validator/check');

const todoServices = require('../../services/todoServices.js');

const addTodoValidator = [
  body('investigation')
    .custom(value => /^[1-9]+$/.test(value))
    .withMessage('investigation must be integer(>1)'),
  body('priority')
    .custom(value => /^[0-2]$/.test(value))
    .withMessage('priority 0-1-2'),
  body('title')
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 chars long'),
  body('title')
    .custom(value => !/\s/.test(value))
    .withMessage('No spaces are allowed in the title '),
  body('title')
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(
      'No special simbols are allowed in the title,Only latin chars',
    ),
  body('description')
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(
      'No special simbols are allowed in the description,Only latin chars',
    ),
  body('description')
    .isLength({ min: 5 })
    .withMessage('Description must be at least 5 chars long'),
];
const checkForExistingTitle = body('title').custom((value: String): String | boolean => {
  return todoServices.find({ todoName: value }).then((task) => {
    if (task && task.length !== 0) {
      return Promise.reject(
        new Error('Task with your title is already being performed'),
      );
    }

    return true;
  });
});
const checkForExistingDescription = body('description').custom((value: String): String | boolean => {
  return todoServices.find({ task: value }).then((todo) => {
    if (todo && todo.length !== 0) {
      return Promise.reject(
        new Error('Task with your description is already being performed'),
      );
    }

    return true;
  });
});
export {
  checkForExistingDescription,
  checkForExistingTitle,
  addTodoValidator,
};
