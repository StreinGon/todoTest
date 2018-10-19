const express = require("express");
const router = express.Router();

const customResponse = require("../public/customResponse");

router.post("/logout", function(req, res) {
  req.logout();
  res.cookie("Authorization", null);
  return customResponse(res, 200, "LogOut");
});

module.exports = router;
