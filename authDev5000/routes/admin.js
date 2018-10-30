const express = require("express");
const router = express.Router();
const passport = require("passport");

const adminController = require("../controllers/admin/adminController");

const changeTodoAsAdminValidator = require("../helpers/validators/changeTodoAsAdminValidator");

router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  changeTodoAsAdminValidator,
  adminController.changeTodoAsAdmin
);
router.get(
  "/users",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  adminController.getUserlist
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  adminController.getTodolist
);
module.exports = router;
