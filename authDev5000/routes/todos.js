const passport = require("passport");
const express = require("express");
const router = express.Router();

const functionForJWTauth = require("../public/customFunction/functionForJWTauth");

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  functionForJWTauth
);
module.exports = router;
