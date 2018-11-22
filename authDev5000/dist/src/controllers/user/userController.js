"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const nodemailer_1 = require("nodemailer");
const uuid = require("uuid/v1");
const loggerMessage_1 = require("@src/helpers/loggerMessage");
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const errorAfterValidation_1 = require("@src/helpers/errorChecker/errorAfterValidation");
const inviteReg_1 = require("@src/models/inviteReg");
const transporter_1 = require("@src/configs/transporter");
const sharedTodosServices = require("@src/services/sharedTodosServices");
const userServices = require("@src/services/userServices");
const imageServices = require("@src/services/imageServices");
const constants = require("@src/constants/index");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
const transporter = nodemailer_1.createTransport(transporter_1.transporterConfig);
const getUser = (req, res) => {
    const check = userServices.getUser({ _id: req.user._id });
    return check.then((user) => {
        if (!user) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        return imageServices.find({ _id: user.avatar }).then((image) => {
            loggerMessage_1.loggerMessage(req, user._id, null);
            return customResponse_1.customResponse(res, 200, statusCodeConstants_1.USER_SENDED, {
                user,
                image,
            });
        });
    }).catch((error) => res.send(error));
};
exports.getUser = getUser;
const sendInvite = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { mail } = req.body;
    const check = userServices.getUser({ mail });
    return check.then((user) => {
        if (!user) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        const mailOptions = {
            from: req.user.mail,
            to: mail,
            subject: 'InviteCode',
            text: String(`${req.headers.host}/users/?invite=${req.user.invite}`),
        };
        return sharedTodosServices.find({ _id: req.user.invite })
            .then((shared) => {
            shared.todos = req.user.todos;
            shared.allowed.push(req.user._id);
            shared.save();
            return transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.ERRORS);
                    return customResponse_1.customResponse(res, 422, statusCodeConstants_1.ERRORS, error);
                }
                loggerMessage_1.loggerMessage(req, null, null);
                return customResponse_1.customResponse(res, 200, statusCodeConstants_1.EMAIL_SENDED);
            });
        });
    });
};
exports.sendInvite = sendInvite;
const sendInviteToReg = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { mail } = req.body;
    mail.forEach((element) => {
        const inviteToken = uuid();
        const newToken = new inviteReg_1.InviteToRegModel({
            invite_token: inviteToken,
        });
        newToken.save();
        const mailOptions = {
            from: req.user.mail,
            to: element,
            subject: 'InviteCode',
            text: String(`${req.headers.host}/users/?inviteToReg=${inviteToken}`),
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.ERRORS);
                return customResponse_1.customResponse(res, 422, statusCodeConstants_1.ERRORS, error);
            }
        });
    });
    loggerMessage_1.loggerMessage(req, null, null);
    return customResponse_1.customResponse(res, 422, statusCodeConstants_1.EMAIL_SENDED);
};
exports.sendInviteToReg = sendInviteToReg;
//# sourceMappingURL=userController.js.map