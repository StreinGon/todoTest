const express = require("express");
const router = express.Router();
const passport = require("passport");

const customResponse = require("../helpers/customResponse/customResponse");
/**
 * @api {post} /users/logout Logout
 * @apiGroup Users
 * @apiSuccessExample {json} Success
 *  200 Logout
 *  {
 *   "msg": "LogOut"
 *  }
 */
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  function(req, res) {
    req.logout();
    res.cookie("Authorization", null);
    return customResponse(res, 200, "LogOut");
  }
);
module.exports = router;
