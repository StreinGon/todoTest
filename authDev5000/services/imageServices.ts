const imageModel = require('../models/image');

function createImage(payload) {
  return new imageModel({
    name: payload.name,
    destination: payload.destination,
    url: payload.url,
    originalname: payload.originalname,
  });
}
const find = (payload) => {
  return imageModel.find(payload);
};

export {
  createImage,
  find,
};
