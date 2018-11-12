"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator/check');
const { customResponse } = require('../../helpers/customResponse/customResponse');
const { errorAftervalidation } = require('../../helpers/errorChecker/errorAfterValidation');
const userServices = require("../../services/userServices");
const todoServices = require("../../services/todoServices");
const constants = require('../../constants');
const { createReport } = require('../../helpers/createReport');
const changeTodoAsAdmin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorAftervalidation(errors, res);
    }
    return userServices
        .find({ username: req.user.username })
        .populate('role')
        .exec((err, user) => {
        if (user.role.rights !== 1) {
            return customResponse(res, 422, 'Use must login as admin');
        }
        const { idTodo } = req.query;
        const { idUser } = req.query;
        if (!idTodo || !idUser) {
            return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        return userServices
            .find({ _id: idUser })
            .then((user) => {
            if (!user) {
                return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
            }
            const check = todoServices.changeTodosAsAdmin(idTodo, idUser);
            return check.then((todo) => {
                if (!todo) {
                    return customResponse(res, 422, constants.statusConstants.NOT_FOUND);
                }
                return customResponse(res, 200, constants.statusConstants.TODO_UPDATED, todo);
            });
        })
            .catch((err) => err);
    });
};
exports.changeTodoAsAdmin = changeTodoAsAdmin;
const getUserlist = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorAftervalidation(errors, res);
    }
    return userServices
        .find({ username: req.user.username })
        .populate('role')
        .then((user) => {
        if (user.role.rights === 1) {
            return userServices
                .find({})
                .then((users) => {
                return customResponse(res, 200, 'UsersList', users);
            })
                .catch((err) => err);
        }
        return customResponse(res, 422, 'You must login as admin');
    });
};
exports.getUserlist = getUserlist;
const getTodolist = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorAftervalidation(errors, res);
    }
    const { userID } = req.query;
    return userServices
        .find({ username: req.user.username })
        .populate('role')
        .exec((err, user) => {
        if (user.role.rights === 1) {
            return userServices.find({ _id: userID }).then((user) => {
                if (!user) {
                    return customResponse(res, 422, 'User Not found');
                }
                return todoServices.findAll({ todoOwner: user._id }).then((todo) => {
                    return customResponse(res, 200, 'Todo list of user', {
                        todoList: todo,
                    });
                });
            });
        }
        return customResponse(res, 422, 'You must login as admin');
    });
};
exports.getTodolist = getTodolist;
const getMonthlyReport = (req, res) => {
    return userServices
        .find({ username: req.user.username })
        .populate('role')
        .exec((err, user) => {
        if (user.role.rights === 1) {
            return createReport(res);
        }
        return customResponse(res, 422, 'Your must be admin');
    });
};
exports.getMonthlyReport = getMonthlyReport;
//# sourceMappingURL=adminController.js.map