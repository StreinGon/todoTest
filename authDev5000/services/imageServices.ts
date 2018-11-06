const { ImageModel } = require('../typegoouseClasses/image');

function createImage(payload) {
  return new ImageModel({
    name: payload.name,
    destination: payload.destination,
    url: payload.url,
    originalname: payload.originalname,
  });
}
const find = (payload) => {
  return ImageModel.find(payload);
};

export {
  createImage,
  find,
};
