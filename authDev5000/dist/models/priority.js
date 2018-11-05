"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const constants = require('../constants');
const prioritySchema = mongoose.Schema({
    value: Number,
    name: String,
});
const priorityModel = mongoose.model(constants.modelConstants.PRIORITY, prioritySchema, 'priority');
exports.default = priorityModel;
//# sourceMappingURL=priority.js.map