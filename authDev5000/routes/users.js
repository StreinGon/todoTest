const express = require("express");
const router = express.Router();

const customResponse = require("../public/customResponse");
/**
 * @api {post} /users/logout Logout
 * @apiGroup Users
 * @apiSuccessExample {json} Success
 *  200 Logout
 *  {
 *   "msg": "LogOut"
 *  }
 */
router.post("/logout", function(req, res) {
  req.logout();
  res.cookie("Authorization", null);
  return customResponse(res, 200, "LogOut");
});
module.exports = router;
