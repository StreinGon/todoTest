"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const priorityModel = require('../models/priority');
function createPriority(value) {
    return new priorityModel({
        value: value.value,
    });
}
exports.createPriority = createPriority;
const find = (payload) => {
    return priorityModel.findOne(payload);
};
exports.find = find;
//# sourceMappingURL=priorityServices.js.map