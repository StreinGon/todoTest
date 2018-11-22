"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@src/models/logger");
function createLog(payload) {
    return logger_1.LoggerModel.create(payload);
}
exports.createLog = createLog;
exports.find = (payload) => {
    return logger_1.LoggerModel.find(payload);
};
//# sourceMappingURL=loggerServices.js.map