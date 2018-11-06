"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ImageModel } = require('../typegoouseClasses/image');
function createImage(payload) {
    return new ImageModel({
        name: payload.name,
        destination: payload.destination,
        url: payload.url,
        originalname: payload.originalname,
    });
}
exports.createImage = createImage;
const find = (payload) => {
    return ImageModel.find(payload);
};
exports.find = find;
//# sourceMappingURL=imageServices.js.map