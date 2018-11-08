"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ImageModel } = require('../models/image');
function createImage(payload) {
    return new ImageModel(payload);
}
exports.createImage = createImage;
const find = (payload) => {
    return ImageModel.find(payload);
};
exports.find = find;
//# sourceMappingURL=imageServices.js.map