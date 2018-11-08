"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const imageSchema = mongoose.Schema({
    name: String,
    destination: String,
    url: String,
    originalname: String,
    createdAt: { type: Date, default: Date.now },
});
const ImageModel = mongoose_1.model("Image", imageSchema);
exports.ImageModel = ImageModel;
//# sourceMappingURL=image.js.map