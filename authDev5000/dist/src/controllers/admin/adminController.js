"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const errorAfterValidation_1 = require("@src/helpers/errorChecker/errorAfterValidation");
const createReport_1 = require("@src/helpers/createReport");
const loggerMessage_1 = require("@src/helpers/loggerMessage");
const userServices = require("@src/services/userServices");
const todoServices = require("@src/services/todoServices");
const constants = require("@src/constants/index");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
exports.changeTodoAsAdmin = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    return userServices
        .find({ username: req.user.username })
        .populate('role')
        .exec((err, user) => {
        if (err) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        if (user.role.rights !== 1) {
            loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.USER_MUST_LOGIN_AS_ADMIN);
            return customResponse_1.customResponse(res, 422, statusCodeConstants_1.USER_MUST_LOGIN_AS_ADMIN);
        }
        const { idTodo } = req.query;
        const { idUser } = req.query;
        if (!idTodo || !idUser) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        return userServices
            .find({ _id: idUser })
            .then((user) => {
            if (!user) {
                loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
                return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
            }
            return todoServices.changeTodosAsAdmin(idTodo, idUser)
                .then((todo) => {
                if (!todo) {
                    loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
                    return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
                }
                loggerMessage_1.loggerMessage(req, todo, constants.statusConstants.TODO_UPDATED);
                return customResponse_1.customResponse(res, 200, constants.statusConstants.TODO_UPDATED, todo);
            });
        })
            .catch((err) => err);
    });
};
exports.getUserlist = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    return userServices
        .find({ username: req.user.username })
        .populate('role')
        .then((user) => {
        if (user.role.rights === 1) {
            return userServices
                .find({})
                .then((users) => {
                loggerMessage_1.loggerMessage(req, res, null);
                return customResponse_1.customResponse(res, 200, statusCodeConstants_1.USERLIST, users);
            })
                .catch((err) => err);
        }
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.USER_MUST_LOGIN_AS_ADMIN);
        return customResponse_1.customResponse(res, 422, statusCodeConstants_1.USER_MUST_LOGIN_AS_ADMIN);
    });
};
exports.getTodolist = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { userID } = req.query;
    return userServices
        .find({ username: req.user.username })
        .populate('role')
        .exec((err, user) => {
        if (err) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        if (user.role.rights === 1) {
            return userServices.find({ _id: userID })
                .then((user) => {
                if (!user) {
                    loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.USER_NOT_FOUND);
                    return customResponse_1.customResponse(res, 422, statusCodeConstants_1.USER_NOT_FOUND);
                }
                return todoServices.findAll({ todoOwner: user._id })
                    .then((todo) => {
                    loggerMessage_1.loggerMessage(req, null);
                    return customResponse_1.customResponse(res, 200, statusCodeConstants_1.TODOLIST, {
                        todoList: todo,
                    });
                });
            });
        }
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.USER_MUST_LOGIN_AS_ADMIN);
        return customResponse_1.customResponse(res, 422, statusCodeConstants_1.USER_MUST_LOGIN_AS_ADMIN);
    });
};
exports.getMonthlyReport = (req, res) => {
    return userServices
        .find({ username: req.user.username })
        .populate('role')
        .exec((err, user) => {
        if (err) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        if (user.role.rights === 1) {
            return createReport_1.createReport(res);
        }
        return customResponse_1.customResponse(res, 422, statusCodeConstants_1.USER_MUST_LOGIN_AS_ADMIN);
    });
};
//# sourceMappingURL=adminController.js.map