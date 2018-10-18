const { check } = require("express-validator/check");

const validatorForAddTodo = [
  check("todotitle")
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 chars long"),
  check("tododesc")
    .isLength({ min: 1 })
    .withMessage("Description must be at least 1 chars long")
];

module.exports = validatorForAddTodo;
