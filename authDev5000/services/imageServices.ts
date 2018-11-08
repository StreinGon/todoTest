const { ImageModel } = require('../models/image');
import mongoose from 'mongoose'

function createImage(payload: Object): mongoose.Query {
  return new ImageModel(payload);
}
const find = (payload: Object): mongoose.Query => {
  return ImageModel.find(payload);
};

export {
  createImage,
  find,
};
