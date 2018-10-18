var express = require("express");
var router = express.Router();
var passport = require("passport");

const customResponse = require("../public/customResponse");
const functionForJWTauth = require("../public/customFunction/functionForJWTauth");

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  functionForJWTauth
);
router.post("/logout", function(req, res) {
  req.logout();
  res.cookie("Authorization", null);
  return customResponse(res, 200, "LogOut");
});

module.exports = router;
