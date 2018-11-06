const todosRouter = require('./todos.js');
const todoRouter = require('./todo.js');
const loginRouter = require('./login.js');
const usersRouter = require('./users.js');
const regRouter = require('./registerform.js');
const adminRouter = require('./admin.js');
const imageRouter = require('./image.js');
const categoryRouter = require('./category.js');
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
