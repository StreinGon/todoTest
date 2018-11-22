import * as express from 'express';
import * as passport  from 'passport';
import * as httpErrors from 'http-errors';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as cors  from 'cors';
import * as expressSession from 'express-session';
import * as bodyParser  from 'body-parser';

import { localStrategy }  from'@src/strategy/localStrategy';
import { jwtStrategy }  from'@src/strategy/jwtStrategy';
import routes  from'@src/routes/index';
import { jsonError }  from'@src/helpers/errorChecker/JSONerror';
import { authError } from'@src/helpers/errorChecker/authError';
import { UserModel }  from '@src/models/user';
import { IUser } from '@src/interfaces/user';

const app = express();

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
app.use(jsonError);

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization, Access-Control-Allow-Credentials',
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

passport.serializeUser((user: IUser, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: Error, user: IUser) => {
    done(err, user);
  });
});

passport.use('jwt', jwtStrategy);

passport.use('local', localStrategy);

app.use(authError);

app.use(passport.initialize());

app.use(passport.session());

app.use('/', routes);

app.use((req, res, next) => {
  next(httpErrors(404));
});

app.use((err:any, req, res:any): Response => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  return res.send('err');
});
export { app };
