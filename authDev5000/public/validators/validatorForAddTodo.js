const { body } = require("express-validator/check");
const { check } = require("express-validator/check");

const TodoModel = require("../dbModels/todoModel");

const validatorForAddTodo = [
  check("title")
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 chars long"),
  check("description")
    .isLength({ min: 1 })
    .withMessage("Description must be at least 1 chars long")
];
const checkForExistingTitle = body("title").custom(value => {
  return TodoModel.findOne({ todoName: value }).then(task => {
    if (task) {
      return Promise.reject("Task with your title is already being performed");
    }
  });
});
const checkForExistingDescription = body("description").custom(value => {
  return TodoModel.findOne({ task: value }).then(task => {
    if (task) {
      return Promise.reject(
        "Task with your description is already being performed"
      );
    }
  });
});
module.exports = {
  checkForExistingDescription,
  checkForExistingTitle,
  validatorForAddTodo
};
