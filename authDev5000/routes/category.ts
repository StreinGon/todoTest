const express = require('express');
const router = express.Router();
const passport = require('passport')

const validator = require('../helpers/validators/categoryValidators');
const categoryController = require('../controllers/category/categoryController');

router.put(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  validator.addCategory,
  (req, res) => categoryController.createNewCategory(req, res),
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  validator.addTodoToCategory,
  (req, res) => categoryController.addTodoToCategory(req, res),
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  validator.getCategory,
  (req, res) => categoryController.getCategory(req, res),
);
export { router };
