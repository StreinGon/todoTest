import { Router } from 'express';
import { authenticate } from 'passport';

import * as categoryValidators  from '@src/helpers/validators/categoryValidators';
import * as categoryController from '@src/controllers/category/categoryController';

const router = Router();

router.put(
  '/',
  authenticate('jwt', { session: false, failWithError: true }),
  categoryValidators.addCategory,
  (req, res) => categoryController.createNewCategory(req, res),
);
router.post(
  '/',
  authenticate('jwt', { session: false, failWithError: true }),
  categoryValidators.addTodoToCategory,
  (req, res) => categoryController.addTodoToCategory(req, res),
);
router.get(
  '/',
  authenticate('jwt', { session: false, failWithError: true }),
  categoryValidators.getCategory,
  (req, res) => categoryController.getCategory(req, res),
);
export default router;
