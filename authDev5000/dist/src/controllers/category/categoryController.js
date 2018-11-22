"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const categoryServices = require("@src/services/categoryServices");
const todoServices = require("@src/services/todoServices");
const errorAfterValidation_1 = require("@src/helpers/errorChecker/errorAfterValidation");
const loggerMessage_1 = require("@src/helpers/loggerMessage");
const customResponse_1 = require("@src/helpers/customResponse/customResponse");
const statusCodeConstants_1 = require("@src/constants/statusCodeConstants");
exports.createNewCategory = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { categoryName } = req.body;
    return categoryServices
        .createNewCategory({ name: categoryName })
        .then((createdCategory) => {
        if (!createdCategory) {
            loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.CATEGORY_NOT_CREATED);
            return customResponse_1.customResponse(res, 422, statusCodeConstants_1.CATEGORY_NOT_CREATED);
        }
        loggerMessage_1.loggerMessage(req, createdCategory._id, null);
        return customResponse_1.customResponse(res, 200, statusCodeConstants_1.CATEGORY_CREATED, createdCategory);
    });
};
exports.getCategory = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { categoryName } = req.query;
    return categoryServices.getCategory(categoryName).then((category) => {
        if (!category || category.length < 1) {
            loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.CATEGORY_NOT_FOUND);
            return customResponse_1.customResponse(res, 422, statusCodeConstants_1.CATEGORY_NOT_FOUND);
        }
        loggerMessage_1.loggerMessage(req, category, null);
        return customResponse_1.customResponse(res, 200, statusCodeConstants_1.CATEGORY_SENDED, category);
    });
};
exports.addTodoToCategory = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.VALIDATION_ERRORS);
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { todoID } = req.query;
    const { categoryName } = req.body;
    return categoryServices
        .AddNewTodo(categoryName, todoID)
        .then((updatedCategory) => {
        if (!updatedCategory) {
            loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.CATEGORY_NOT_UPDATED);
            return customResponse_1.customResponse(res, 422, statusCodeConstants_1.CATEGORY_NOT_UPDATED);
        }
        todoServices.find({ _id: todoID }).then((todo) => {
            if (!todo || todo.length < 1) {
                loggerMessage_1.loggerMessage(req, null, statusCodeConstants_1.CATEGORY_NOT_UPDATED);
                return customResponse_1.customResponse(res, 422, statusCodeConstants_1.CATEGORY_NOT_UPDATED);
            }
            todo[0].category = updatedCategory.name;
            todo[0].save();
            loggerMessage_1.loggerMessage(req, updatedCategory, null);
            return customResponse_1.customResponse(res, 200, statusCodeConstants_1.CATEGORY_UPDATED, updatedCategory);
        });
    });
};
//# sourceMappingURL=categoryController.js.map