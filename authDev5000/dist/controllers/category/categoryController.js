"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator/check');
const categoryServices = require("../../services/categoryServices");
const todoServices = require("../../services/todoServices");
const errorAfterValidation_1 = require("../../helpers/errorChecker/errorAfterValidation");
const { customResponse } = require('../../helpers/customResponse/customResponse');
const createNewCategory = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { categoryName } = req.body;
    return categoryServices
        .createNewCategory({ name: categoryName })
        .then((createdCategory) => {
        if (!createdCategory) {
            return customResponse(res, 422, 'Category not created');
        }
        return customResponse(res, 200, 'Category created', createdCategory);
    });
};
exports.createNewCategory = createNewCategory;
const getCategory = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { categoryName } = req.query;
    return categoryServices.getCategory(categoryName).then((category) => {
        console.log(category);
        if (!category || category.length < 1) {
            return customResponse(res, 422, 'Category not found');
        }
        return customResponse(res, 200, 'Category sended', category);
    });
};
exports.getCategory = getCategory;
const addTodoToCategory = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorAfterValidation_1.errorAftervalidation(errors, res);
    }
    const { todoID } = req.query;
    const { categoryName } = req.body;
    return categoryServices
        .categoryAddNewTodo(categoryName, todoID)
        .then((updatedCategory) => {
        if (!updatedCategory) {
            return customResponse(res, 422, 'Category not updated');
        }
        todoServices.find({ _id: todoID }).then((todo) => {
            if (!todo || todo.length < 1) {
                return customResponse(res, 422, 'Category not updated');
            }
            todo[0].category = updatedCategory.name;
            todo[0].save();
            return customResponse(res, 200, 'Category updated', updatedCategory);
        });
    });
};
exports.addTodoToCategory = addTodoToCategory;
//# sourceMappingURL=categoryController.js.map