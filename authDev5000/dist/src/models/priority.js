"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelConstants_1 = require("@src/constants/modelConstants");
const prioritySchema = new mongoose_1.Schema({
    value: Number,
    name: String,
});
exports.PriorityModel = mongoose_1.model(modelConstants_1.PRIORITY, prioritySchema);
//# sourceMappingURL=priority.js.map