"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelConstants_1 = require("@src/constants/modelConstants");
const loggerSchema = new mongoose_1.Schema({
    timestamp: { type: Date, default: Date.now },
    act: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: modelConstants_1.USERS },
});
exports.LoggerModel = mongoose_1.model(modelConstants_1.LOGGER, loggerSchema);
//# sourceMappingURL=logger.js.map