"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PriorityModel } = require('../typegoouseClasses/priority');
function createPriority(value) {
    return new PriorityModel({
        value: value.value,
    });
}
exports.createPriority = createPriority;
const find = (payload) => {
    return PriorityModel.findOne(payload);
};
exports.find = find;
//# sourceMappingURL=priorityServices.js.map