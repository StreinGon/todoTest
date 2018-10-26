const { query, body } = require("express-validator/check");

const changeTodoValidator = [
  query("id")
    .custom(value => !/\s/.test(value))
    .withMessage("id must contain only numbers and latin chars"),
  query("id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Length of id must be 24 chars"),
  query("id")
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage("id must contain only numbers and latin chars"),
  body("title")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 chars long"),
  body("title")
    .optional()
    .custom(value => !/\s/.test(value))
    .withMessage("No spaces are allowed in the title "),
  body("title")
    .optional()
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(
      "No special simbols are allowed in the title,Only latin chars"
    ),
  body("description")
    .optional()
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(
      "No special simbols are allowed in the description,Only latin chars"
    ),
  body("description")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 chars long"),
  body("success")
    .optional()
    .custom(value => value === "true" || value === "false")
    .withMessage("Status must be true or false")
];
module.exports = changeTodoValidator;
