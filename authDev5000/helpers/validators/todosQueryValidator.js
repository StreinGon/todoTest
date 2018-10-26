const { query } = require("express-validator/check");
const todosQueryValidator = [
  query("amount")
    .optional()
    .isNumeric()
    .withMessage("Amout must be numeric"),
  query("amount")
    .optional()
    .custom(value => value > 0)
    .withMessage("StartFrom must be positive"),
  query("startFrom")
    .optional()
    .custom(value => value > 0)
    .withMessage("StartFrom must be positive"),
  query("startFrom")
    .optional()
    .isNumeric()
    .withMessage("StartFrom must be numeric")
];

module.exports = todosQueryValidator;
