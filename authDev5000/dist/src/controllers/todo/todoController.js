"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const fs = require("fs");
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const errorAfterValidation_1 = require("@src/helpers/errorChecker/errorAfterValidation");
const loggerMessage_1 = require("@src/helpers/loggerMessage");
const userCheck_1 = require("@src/helpers/userCheck/userCheck");
const todoServices = require("@src/services/todoServices");
const userServices = require("@src/services/userServices");
const imageServices = require("@src/services/imageServices");
const priorityServices = require("@src/services/priorityServices");
const constants = require("@src/constants/index");
const sharedTodosServices = require("@src/services/sharedTodosServices");
const otherConstants_1 = require("@src/constants/otherConstants");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
exports.addTodo = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    userCheck_1.userCheck(req, res);
    const { title: todoName } = req.body;
    const { description: task } = req.body;
    const { priority: priority } = req.body;
    const { investigation: investigation } = req.body;
    const image = [];
    if (req.files) {
        req.files.forEach((file) => {
            const photo = imageServices.createImage({
                name: file.filename,
                destination: file.destination,
                originalname: file.originalname,
                url: `${req.headers.host}/image/${file.filename}`,
            });
            image.push(photo._id);
            photo.save();
        });
    }
    const newPriority = priorityServices.createPriority(priority);
    const newtodo = todoServices.createNewTodo({
        todoName,
        task,
        image,
        todoOwner: req.user._id,
        priority: newPriority._id,
        timeTracking: {
            investigation,
        },
        status: otherConstants_1.PENDING,
    });
    newPriority.save();
    const id = newtodo._id;
    return userServices
        .find({ username: req.user.username })
        .then((user) => {
        userServices.userAddNewTodo(user, id);
        loggerMessage_1.loggerMessage(req, newtodo._id, null);
        return customResponse_1.customResponse(res, 200, constants.statusConstants.TODO_CREATED, newtodo);
    })
        .catch((err) => {
        if (err) {
            return err;
        }
    });
};
exports.changeTodo = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    userCheck_1.userCheck(req, res);
    const { id: idTodo } = req.query;
    if (!idTodo) {
        loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
        return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
    }
    const { onFact } = req.body;
    const { success } = req.body;
    const { newDescription } = req.body;
    const { status } = req.body;
    const check = todoServices.changeTodos({
        newDescription,
        success,
        idTodo,
        onFact,
        status,
        id: req.user._id,
    });
    return check.then((todo) => {
        if (!todo) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        loggerMessage_1.loggerMessage(req, todo, null);
        return customResponse_1.customResponse(res, 200, constants.statusConstants.TODO_UPDATED, todo);
    });
};
exports.deleteTodo = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    userCheck_1.userCheck(req, res);
    const { id: idTodo } = req.query;
    return todoServices.deleteTodo(req.user._id, idTodo).then((image) => {
        if (!image) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        if (image) {
            return imageServices
                .find({ _id: image })
                .then((image) => {
                if (image[0].name !== 'test') {
                    fs.unlinkSync(`${image[0].destination}${image[0].name}`);
                    image[0].remove();
                }
                loggerMessage_1.loggerMessage(req, idTodo, null);
                return customResponse_1.customResponse(res, 200, constants.statusConstants.TODO_DELETED);
            })
                .catch((err) => {
                return err;
            });
        }
        loggerMessage_1.loggerMessage(req, idTodo, null);
        return customResponse_1.customResponse(res, 200, constants.statusConstants.TODO_DELETED);
    });
};
exports.getTodo = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    userCheck_1.userCheck(req, res);
    const { id } = req.query;
    const check = todoServices.getTodo(req.user._id, id);
    return check.then((todo) => {
        if (!todo || todo.length < 1) {
            loggerMessage_1.loggerMessage(req, null, constants.statusConstants.NOT_FOUND);
            return customResponse_1.customResponse(res, 422, constants.statusConstants.NOT_FOUND);
        }
        return imageServices.find({ _id: todo[0].image })
            .then((image) => {
            loggerMessage_1.loggerMessage(req, id, null);
            return customResponse_1.customResponse(res, 200, constants.statusConstants.TODO_SENDED, {
                todo,
                image,
            });
        });
    });
};
exports.getShared = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    userCheck_1.userCheck(req, res);
    const { id } = req.query;
    sharedTodosServices
        .find({ _id: id })
        .populate('todos')
        .then((shared) => {
        if (shared) {
            let checker = false;
            shared.allowed.forEach((user) => {
                if (user === req.user.id) {
                    checker = true;
                }
            });
            if (checker) {
                loggerMessage_1.loggerMessage(req, id, null);
                return customResponse_1.customResponse(res, 200, statusCodeConstants_1.SHARED_TODOS, shared.todos);
            }
            loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.NOT_ALLOWED);
            return customResponse_1.customResponse(res, 422, statusCodeConstants_1.NOT_ALLOWED);
        }
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.SHARED_TODOS_NOT_FOUND);
        return customResponse_1.customResponse(res, 422, statusCodeConstants_1.SHARED_TODOS_NOT_FOUND);
    });
};
//# sourceMappingURL=todoController.js.map