"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const categoryValidators = require("@src/helpers/validators/categoryValidators");
const categoryController = require("@src/controllers/category/categoryController");
const router = express_1.Router();
router.put('/', passport_1.authenticate('jwt', { session: false, failWithError: true }), categoryValidators.addCategory, (req, res) => categoryController.createNewCategory(req, res));
router.post('/', passport_1.authenticate('jwt', { session: false, failWithError: true }), categoryValidators.addTodoToCategory, (req, res) => categoryController.addTodoToCategory(req, res));
router.get('/', passport_1.authenticate('jwt', { session: false, failWithError: true }), categoryValidators.getCategory, (req, res) => categoryController.getCategory(req, res));
exports.default = router;
//# sourceMappingURL=category.js.map