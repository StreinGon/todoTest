const express = require("express");
const router = express.Router();
const passport = require("passport");

const validator = require("../helpers/validators/categoryValidators");
const categoryController = require("../controllers/category/categoryController");

router.put(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  validator.addCategory,
  categoryController.createNewCategory
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  validator.addTodoToCategory,
  categoryController.addTodoToCategory
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  validator.getCategory,
  categoryController.getCategory
);
module.exports = router;
