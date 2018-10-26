const { query } = require("express-validator/check");

const getTodoValidator = [
  query("id")
    .custom(value => {
      return !/\s/.test(value);
    })
    .withMessage("id must contain only numbers and latin chars"),
  query("id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Length of id must be 24 chars"),
  query("id")
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage("id must contain only numbers and latin chars")
];

module.exports = getTodoValidator;
