"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const passport_1 = require("passport");
const bcrypt_1 = require("bcrypt");
const check_1 = require("express-validator/check");
const imageServices = require("@src/services/imageServices");
const roleServices = require("@src/services/roleServices");
const userServices = require("@src/services/userServices");
const sharedTodosServices = require("@src/services/sharedTodosServices");
const constants = require("@src/constants/index");
const errorAfterValidation_1 = require("@src/helpers/errorChecker/errorAfterValidation");
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const sharedTodos_1 = require("@src/models/sharedTodos");
const inviteReg_1 = require("@src/models/inviteReg");
const otherConstants_1 = require("@src/constants/otherConstants");
exports.singIn = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return customResponse_1.customResponse(res, 400, constants.statusConstants.LOGIN_INCORRECT);
        }
        return req.logIn(user, (error) => {
            if (error)
                return error;
            const changedUser = {
                _id: user._id,
                username: user.username,
                mail: user.mail,
                role: user.role,
            };
            const token = jsonwebtoken_1.default.sign(changedUser, otherConstants_1.secret, {
                expiresIn: 86400 * 30,
            });
            if (req.query.invite) {
                sharedTodosServices.find({ _id: req.query.invite }).then((shared) => {
                    shared.allowed.push(user._id);
                    shared.save();
                });
            }
            res.cookie(constants.statusConstants.AUTH_COOKIES, token);
            return customResponse_1.customResponse(res, 200, constants.statusConstants.LOGIN_CORRECT, { token, user: changedUser });
        });
    })(req, res, next);
};
exports.singUp = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const photo = imageServices.createImage({
        name: req.file ? req.file.filename : 'test',
        destination: req.file ? req.file.destination : otherConstants_1.UPLOADS,
        originalname: req.file ? req.file.originalname : 'test',
        url: `${req.headers.host}/image/${req.file ? req.file.filename : 'test'}`,
    });
    const newShared = new sharedTodos_1.SharedTodosModel({});
    const avatarId = photo._id;
    photo.save();
    const newRole = roleServices.createRoleOfUser(0);
    const hash = bcrypt_1.default.hashSync(req.body.password, 10);
    return newRole.save((err) => {
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
                inviteReg_1.InviteToRegModel
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
            return customResponse_1.customResponse(res, 200, constants.statusConstants.REDISTRATION_SUCCESSFULL, user);
        });
    });
};
exports.logout = (req, res) => {
    req.logout();
    res.cookie(constants.statusConstants.AUTH_COOKIES, null);
    return customResponse_1.customResponse(res, 200, constants.statusConstants.LOGOUT);
};
//# sourceMappingURL=authController.js.map