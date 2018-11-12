const todosRouter = require('./todos');
const todoRouter = require('./todo');
const loginRouter = require('./login');
const usersRouter = require('./users');
const regRouter = require('./registerform');
const adminRouter = require('./admin');
const imageRouter = require('./image');
const categoryRouter = require('./category');
const express = require('express');
const router = express.Router();

router.use('/users', usersRouter.router);

router.use('/reg', regRouter.router);

router.use('/login', loginRouter.router);

router.use('/todos', todosRouter.router);

router.use('/todo', todoRouter.router);

router.use('/admin', adminRouter.router);

router.use('/image', imageRouter.router);

router.use('/category', categoryRouter.router);
export {
  router,
};
