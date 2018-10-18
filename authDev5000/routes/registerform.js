const express = require("express");
const router = express.Router();

const functionForNewUser = require("../public/customFunction/functionForNewUser");
const validator = require("../public/validators/validatorForRegistration");

router.post(
  "/",
  validator.validatorForRegistration,
  validator.checkForExistingEmail,
  functionForNewUser
);
module.exports = router;
