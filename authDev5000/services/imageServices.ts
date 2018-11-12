
import mongoose from 'mongoose'
import { IImage } from "../interfaces/image";
const { ImageModel } = require('../models/image');

function createImage(payload: Object): IImage {
  return new ImageModel(payload);
}
const find = (payload: Object): mongoose.Query<IImage> => {
  return ImageModel.find(payload);
};

export {
  createImage,
  find,
};
