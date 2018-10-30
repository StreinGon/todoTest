const imageModel = require("../models/photo");

function createImage(payload) {
  return new imageModel({
    name: payload.name,
    destination: payload.destination,
    url: payload.url,
    originalname: payload.originalname
  });
}
const find = payload => {
  return imageModel.find(payload);
};

module.exports = {
  createImage,
  find
};
