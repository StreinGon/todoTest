const { body } = require("express-validator/check");
const { check } = require("express-validator/check");

const Users = require("../dbModels/userModel");

const validatorForRegistration = [
  check("mail")
    .isEmail()
    .withMessage("Incorrect mail"),
  check("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 chars long"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long")
];
const checkForExistingEmail = body("mail").custom(value => {
  return Users.findOne({ mail: value }).then(user => {
    if (user) {
      return Promise.reject("E-mail already in use");
    }
  });
});
module.exports = { validatorForRegistration, checkForExistingEmail };
