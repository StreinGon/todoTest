const { check } = require("express-validator/check");

const deleteTodoValidator = [
  check("title")
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 chars long"),
  check("title")
    .custom(value => !/\s/.test(value))
    .withMessage("No spaces are allowed in the title ")
];

module.exports = deleteTodoValidator;
