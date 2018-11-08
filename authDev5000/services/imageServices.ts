const { ImageModel } = require('../models/image');


function createImage(payload: Object) {
  return new ImageModel(payload);
}
const find = (payload: Object) => {
  return ImageModel.find(payload);
};

export {
  createImage,
  find,
};
