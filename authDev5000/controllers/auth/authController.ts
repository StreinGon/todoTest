const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');

const imageServices = require('../../services/imageServices');
const roleServices = require('../../services/roleServices.js');
const userServices = require('../../services/userServices.js');
const sharedTodosServices = require('../../services/sharedTodosServices');
const errorAfterValidation = require('../../helpers/errorChecker/errorAfterValidation');
const SharedTodosModel = require('../../models/sharedTodos');
const inviteReg = require('../../models/inviteReg');

const saltRounds = 10;
const secret = Buffer.from('1', 'base64');
const customResponse = require('../../helpers/customResponse/customResponse');
const constants = require('../../constants');

const singIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return customResponse(
        res,
        400,
        constants.statusConstants.LOGIN_INCORRECT,
      );
    }
    return req.logIn(user, (error) => {
      if (error) return error;
      const changedUser = {
        _id: user._id,
        username: user.username,
        mail: user.mail,
        role: user.role,
      };
      const token = jwt.sign(changedUser, secret, {
        expiresIn: 86400 * 30,
      });

      if (req.query.invite) {
        sharedTodosServices.find({ _id: req.query.invite }).then((shared) => {
          shared.allowed.push(user._id);

          shared.save();
        });
      }
      res.cookie(constants.statusConstants.AUTH_COOKIES, token);
      return customResponse(
        res,
        200,
        constants.statusConstants.LOGIN_CORRECT,
        changedUser,
      );
    });
  })(req, res, next);
};

const singUp = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = '';
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const photo = imageServices.createImage({
    name: req.file ? req.file.filename : 'test',
    destination: req.file ? req.file.destination : 'public/uploads/',
    originalname: req.file ? req.file.originalname : 'test',
    url: `${req.headers.host}/image/${req.file ? req.file.filename : 'test'}`,
  });
  const newShared = new SharedTodosModel({});
  const avatarId = photo._id;
  photo.save();
  const newRole = roleServices.createRoleOfUser(0);
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  return newRole.save((err) => {
    if (err) return err;
    return userServices
      .createNewUser({
        username: req.body.username,
        password: hash,
        mail: req.body.mail,
        role: newRole._id,
        avatar: avatarId,
        invite: newShared._id,
      })
      .then((user) => {
        newShared.todos = user.todos;
        newShared.save();
        if (req.query.inviteToReg) {
          inviteReg
            .findOne({ invite_token: req.query.inviteToReg })
            .then((token) => {
              token.remove();
            });
        }
        if (req.query.invite) {
          sharedTodosServices.find({ _id: req.query.invite }).then((shared) => {
            shared.allowed.push(user._id);
            shared.save();
          });
        }
        return customResponse(
          res,
          200,
          constants.statusConstants.REDISTRATION_SUCCESSFULL,
        );
      });
  });
};
const logout = (req, res) => {
  req.logout();
  res.cookie(constants.statusConstants.AUTH_COOKIES, null);
  return customResponse(res, 200, constants.statusConstants.LOGOUT);
};
export { singIn, singUp, logout };
