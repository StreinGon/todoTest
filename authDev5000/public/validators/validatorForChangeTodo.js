const { check } = require("express-validator/check");

const validatorForChangeTodo = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 chars long"),
  check("title")
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 chars long")
];
module.exports = validatorForChangeTodo;
