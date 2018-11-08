"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const constants = require('../constants');
const { Schema } = mongoose;
const CategorySchema = mongoose.Schema({
    name: String,
    todos: [{ type: Schema.ObjectId, ref: constants.modelConstants.TODOS }],
});
const CategoryModel = mongoose_1.model("Category", CategorySchema);
exports.CategoryModel = CategoryModel;
//# sourceMappingURL=category.js.map