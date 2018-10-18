const { check } = require("express-validator/check");

const validatorForChangeTodo = [
  check("title")
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 chars long")
];
module.exports = validatorForChangeTodo;
