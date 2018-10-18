const express = require("express");
const router = express.Router();

const middlewareForNewUser = require("../public/middleware/middlewareForNewUser");
const validator = require("../public/validators/validatorForRegistration");

router.post(
  "/",
  validator.validatorForRegistration,
  validator.checkForExistingEmail,
  middlewareForNewUser
);
module.exports = router;
