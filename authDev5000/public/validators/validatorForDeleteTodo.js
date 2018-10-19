const { check } = require("express-validator/check");

const validatorForDeleteTodo = [
  check("title")
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 chars long")
];

module.exports = validatorForDeleteTodo;