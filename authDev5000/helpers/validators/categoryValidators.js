const { query } = require("express-validator/check");

const addCategory = [
  query("categoryName")
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage("categoryName must contain only numbers and latin chars")
];
const getCategory = [
  query("categoryName")
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage("categoryName must contain only numbers and latin chars")
];
const addTodoToCategory = [
  query("categoryName")
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage("categoryName must contain only numbers and latin chars"),
  query("todoID")
    .custom(value => {
      return !/\s/.test(value);
    })
    .withMessage("id must contain only numbers and latin chars"),
  query("todoID")
    .isLength({ min: 24, max: 24 })
    .withMessage("Length of id must be 24 chars"),
  query("todoID")
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage("id must contain only numbers and latin chars")
];
module.exports = { addCategory, getCategory, addTodoToCategory };
