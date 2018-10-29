const { body } = require("express-validator/check");
const { check } = require("express-validator/check");

const todoServices = require("../../services/todoServices.js");

const addTodoValidator = [
  body("title")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 chars long"),
  body("title")
    .custom(value => !/\s/.test(value))
    .withMessage("No spaces are allowed in the title "),
  body("title")
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(
      "No special simbols are allowed in the title,Only latin chars"
    ),
  body("description")
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(
      "No special simbols are allowed in the description,Only latin chars"
    ),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 chars long")
];
const checkForExistingTitle = body("title").custom(value => {
  return todoServices.find({ todoName: value }).then(task => {
    if (task) {
      return Promise.reject(
        new Error("Task with your title is already being performed")
      );
    }
    return true;
  });
});
const checkForExistingDescription = body("description").custom(value => {
  return todoServices.find({ task: value }).then(todo => {
    if (todo) {
      return Promise.reject(
        new Error("Task with your description is already being performed")
      );
    }

    return true;
  });
});
module.exports = {
  checkForExistingDescription,
  checkForExistingTitle,
  addTodoValidator
};
