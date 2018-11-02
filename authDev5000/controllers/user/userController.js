const { validationResult } = require("express-validator/check");
const nodemailer = require("nodemailer");
const uuidv1 = require("uuid/v1");

const sharedTodosServices = require("../../services/sharedTodosServices");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "artem.kovaleskii@gmail.com",
    pass: "9101991leva5"
  }
});

const customResponse = require("../../helpers/customResponse/customResponse");
const errorAfterValidation = require("../../helpers/errorChecker/errorAfterValidation");
const userServices = require("../../services/userServices.js");
const imageServices = require("../../services/imageServices.js");
const constants = require("../../constants");
const inviteReg = require("../../models/inviteReg");

const getUser = (req, res) => {
  const check = userServices.getUser({ _id: req.user._id });
  return check.then(user => {
    if (!user || user.length < 1) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    return imageServices.find({ _id: user.avatar }).then(image => {
      return customResponse(res, 200, constants.statusConstants.TODO_SENDED, {
        user,
        image
      });
    });
  });
};
const sendInvite = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const { mail } = req.body;
  const check = userServices.getUser({ mail: mail });

  return check.then(user => {
    if (!user || user.length < 1) {
      return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    const mailOptions = {
      from: req.user.mail,
      to: mail,
      subject: "InviteCode",
      text: String(`${req.headers.host}/users/?invite=${req.user.invite}`)
    };
    return sharedTodosServices.find({ _id: req.user.invite }).then(shared => {
      shared.todos = req.user.todos;
      shared.allowed.push(req.user._id);
      shared.save();
      return transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return customResponse(res, 422, "Errors", error);
        } else {
          return customResponse(res, 200, "Email sent: ", info.response);
        }
      });
    });
  });
};
const sendInviteToReg = (req, res) => {
  const errors = validationResult(req);
  const Errormsg = "";
  if (!errors.isEmpty()) {
    return errorAfterValidation(errors, Errormsg, res);
  }
  const { mail } = req.body;
  for (let i = 0; i < mail.length; i++) {
    const inviteToken = uuidv1();
    const newToken = new inviteReg({
      invite_token: inviteToken
    });
    newToken.save();
    const mailOptions = {
      from: req.user.mail,
      to: mail[i],
      subject: "InviteCode",
      text: String(`${req.headers.host}/users/?inviteToReg=${inviteToken}`)
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return customResponse(res, 422, "Errors", error);
      }
    });
    return customResponse(res, 422, "Emails sended");
  }
};
module.exports = { getUser, sendInvite, sendInviteToReg };
