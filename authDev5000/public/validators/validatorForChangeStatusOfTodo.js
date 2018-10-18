const { check } = require("express-validator/check");

const validatorForChangeStatusOfTodo = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 chars long")
];

module.exports = validatorForChangeStatusOfTodo;