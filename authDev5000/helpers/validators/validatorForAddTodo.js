const { body } = require("express-validator/check");
const { check } = require("express-validator/check");

const todoServices = require("../../services/todoServices.js");

const validatorForAddTodo = [
  check("title")
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 chars long"),
  check("description")
    .isLength({ min: 1 })
    .withMessage("Description must be at least 1 chars long")
];
const checkForExistingTitle = body("title").custom(value => {
  return todoServices.findTodoByName(value).then(task => {
    if (task) {
      return Promise.reject("Task with your title is already being performed");
    }
  });
});
const checkForExistingDescription = body("description").custom(value => {
  return todoServices.findTodoByTask(value).then(task => {
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
