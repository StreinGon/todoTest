"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("@src/models/category");
exports.createNewCategory = (payload) => {
    return category_1.CategoryModel.create(payload);
};
exports.find = (payload) => {
    return category_1.CategoryModel.find(payload);
};
exports.getCategory = (categoryName) => {
    return exports.find({ name: categoryName })
        .populate('todos')
        .then((category) => {
        if (!category) {
            return null;
        }
        return category;
    })
        .catch((err) => {
        if (err) {
            return err;
        }
    });
};
exports.AddNewTodo = (categoryName, id) => {
    return exports.find({ name: categoryName }).then((category) => {
        category[0].todos.push(id);
        category[0].save();
        return category[0];
    });
};
//# sourceMappingURL=categoryServices.js.map