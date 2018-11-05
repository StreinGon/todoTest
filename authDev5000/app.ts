const express = require('express');

const app = express();
const httpErrors = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const localStrategy = require('./strategy/localStrategy');
const jwtStrategy = require('./strategy/jwtStrategy');
const routes = require('./routes');
const JSONerror = require('./helpers/errorChecker/JSONerror');
const authError = require('./helpers/errorChecker/authError');
const user = require('./models/user');

mongoose.connect(
  'mongodb://localhost/Users',
  { useNewUrlParser: true },
);

app.set('views', path.join('views'));

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(expressSession({ secret: 'secret' }));

app.use(express.static(path.join('public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(JSONerror);

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    // tslint:disable-next-line:max-line-length
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  user.findById(_id, (err, user) => {
    done(err, user);
  });
});

passport.use('jwt', jwtStrategy);

passport.use('local', localStrategy);

app.use(authError);

app.use(passport.initialize());

app.use(passport.session());

app.use('/users', routes.usersRouter);

app.use('/reg', routes.regRouter);

app.use('/login', routes.loginRouter);

app.use('/todos', routes.todosRouter);

app.use('/todo', routes.todoRouter);

app.use('/admin', routes.adminRouter);

app.use('/image', routes.imageRouter);

app.use('/category', routes.categoryRouter);

app.use((req, res, next) => {
  next(httpErrors(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('err');
});
export default app;
