"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { imageModel } = require('../models/image');
function createImage(payload) {
    return new imageModel({
        name: payload.name,
        destination: payload.destination,
        url: payload.url,
        originalname: payload.originalname,
    });
}
exports.createImage = createImage;
const find = (payload) => {
    return imageModel.find(payload);
};
exports.find = find;
//# sourceMappingURL=imageServices.js.map