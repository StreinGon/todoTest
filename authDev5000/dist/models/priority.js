"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const constants = require('../constants');
const mongoose_1 = require("mongoose");
const prioritySchema = mongoose.Schema({
    value: Number,
    name: String,
});
const PriorityModel = mongoose_1.model(constants.modelConstants.PRIORITY, prioritySchema);
exports.PriorityModel = PriorityModel;
//# sourceMappingURL=priority.js.map