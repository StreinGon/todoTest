"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator/check');
const categoryServices = require("../../services/categoryServices");
const todoServices = require("../../services/todoServices");
const { errorAfterValidation } = require('../../helpers/errorChecker/errorAfterValidation');
const { customResponse } = require('../../helpers/customResponse/customResponse');
const createNewCategory = (req, res) => {
    const errors = validationResult(req);
    const Errormsg = '';
    if (!errors.isEmpty()) {
        return errorAfterValidation(errors, Errormsg, res);
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
    const Errormsg = '';
    if (!errors.isEmpty()) {
        return errorAfterValidation(errors, Errormsg, res);
    }
    const { categoryName } = req.query;
    return categoryServices.getCategory(categoryName).then((category) => {
        if (!category) {
            return customResponse(res, 422, 'Category not found');
        }
        return customResponse(res, 200, 'Category sended', category);
    });
};
exports.getCategory = getCategory;
const addTodoToCategory = (req, res) => {
    const errors = validationResult(req);
    const Errormsg = '';
    if (!errors.isEmpty()) {
        return errorAfterValidation(errors, Errormsg, res);
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
            todo[0].category = updatedCategory.name;
            todo[0].save();
            return customResponse(res, 200, 'Category updated', updatedCategory);
        });
    });
};
exports.addTodoToCategory = addTodoToCategory;
//# sourceMappingURL=categoryController.js.map