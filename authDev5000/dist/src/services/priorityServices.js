"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const priority_1 = require("@src/models/priority");
function createPriority(value) {
    return new priority_1.PriorityModel({
        value,
    });
}
exports.createPriority = createPriority;
exports.find = (payload) => {
    return priority_1.PriorityModel.findOne(payload);
};
//# sourceMappingURL=priorityServices.js.map