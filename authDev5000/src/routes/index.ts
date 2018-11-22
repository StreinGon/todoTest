import  { Router } from 'express';

import todos from './todos';
import todo from './todo';
import login from './login';
import users from './users';
import registerform from './registerform';
import admin from './admin';
import image from './image';
import category from './category';

const router = Router();

router.use('/users', users);

router.use('/reg', registerform);

router.use('/login', login);

router.use('/todos', todos);

router.use('/todo', todo);

router.use('/admin', admin);

router.use('/image', image);

router.use('/category', category);

export default router;
