const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");

const imageServices = require("../../services/imageServices");
const roleServices = require("../../services/roleServices.js");
const userServices = require("../../services/userServices.js");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");

const saltRounds = 10;
const secret = Buffer.from("1", "base64");
const customResponse = require("../../helpers/customResponse/customResponse");
const constants = require("../../constants");

const singIn = (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return customResponse(
        res,
        400,
        constants.statusConstants.LOGIN_INCORRECT
      );
    }
    return req.logIn(user, error => {
      if (error) return error;
      const changedUser = {
        _id: user._id,
        username: user.username,
        mail: user.mail,
        role: user.role
      };
      const token = jwt.sign(changedUser, secret, {
        expiresIn: 86400 * 30
      });

      res.cookie(constants.statusConstants.AUTH_COOKIES, token);
      return customResponse(
        res,
        200,
        constants.statusConstants.LOGIN_CORRECT,
        changedUser
      );
    });
  })(req, res, next);
};

const singUp = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }

  const photo = imageServices.createImage({
    name: req.file ? req.file.filename : "test",
    destination: req.file ? req.file.destination : "public/uploads/",
    originalname: req.file ? req.file.originalname : "test",
    url: `localhost:8080/image/${req.file ? req.file.filename : "test"}`
  });

  const avatarId = photo._id;
  photo.save();
  const newRole = roleServices.createRoleOfUser(0);
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  return newRole.save(err => {
    if (err) return err;
    return userServices
      .createNewUser({
        username: req.body.username,
        password: hash,
        mail: req.body.mail,
        role: newRole._id,
        avatar: avatarId
      })
      .then(() =>
        customResponse(
          res,
          200,
          constants.statusConstants.REDISTRATION_SUCCESSFULL
        )
      );
  });
};
const logout = (req, res) => {
  req.logout();
  res.cookie(constants.statusConstants.AUTH_COOKIES, null);
  return customResponse(res, 200, constants.statusConstants.LOGOUT);
};
module.exports = { singIn, singUp, logout };
