"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryModel = require('../models/category');
const createNewCategory = (payload) => {
    return CategoryModel.create(payload);
};
exports.createNewCategory = createNewCategory;
const find = (payload) => {
    return CategoryModel.find(payload);
};
exports.find = find;
const getCategory = (categoryName) => {
    return find({ name: categoryName })
        .populate('todos')
        .then((category) => {
        if (!category) {
            return false;
        }
        return category;
    })
        .catch((err) => {
        if (err) {
            return err;
        }
    });
};
exports.getCategory = getCategory;
const categoryAddNewTodo = (categoryName, id) => {
    return find({ name: categoryName }).then((category) => {
        category[0].todos.push(id);
        category[0].save();
        return category[0];
    });
};
exports.categoryAddNewTodo = categoryAddNewTodo;
//# sourceMappingURL=categoryServices.js.map