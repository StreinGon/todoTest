"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants = require("@src/constants/index");
const modelConstants_1 = require("@src/constants/modelConstants");
const CategorySchema = new mongoose_1.Schema({
    name: String,
    todos: [{ type: mongoose_1.Schema.Types.ObjectId, ref: constants.modelConstants.TODOS }],
});
const CategoryModel = mongoose_1.model(modelConstants_1.CATEGORY, CategorySchema);
exports.CategoryModel = CategoryModel;
//# sourceMappingURL=category.js.map