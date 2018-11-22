"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("@src/models/image");
function createImage(payload) {
    return new image_1.ImageModel(payload);
}
exports.createImage = createImage;
exports.find = (payload) => {
    return image_1.ImageModel.find(payload);
};
//# sourceMappingURL=imageServices.js.map