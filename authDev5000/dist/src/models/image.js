"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelConstants_1 = require("@src/constants/modelConstants");
const imageSchema = new mongoose_1.Schema({
    name: String,
    destination: String,
    url: String,
    originalname: String,
    createdAt: { type: Date, default: Date.now },
});
exports.ImageModel = mongoose_1.model(modelConstants_1.IMAGES, imageSchema);
//# sourceMappingURL=image.js.map