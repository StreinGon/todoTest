import { Model, model, Schema } from 'mongoose';

import { IImage } from '@src/interfaces/image';
import { IMAGES } from '@src/constants/modelConstants';

const imageSchema = new Schema({
  name: String,
  destination: String,
  url: String,
  originalname: String,
  createdAt: { type: Date, default: Date.now },
});

export const ImageModel: Model<IImage> = model<IImage>(IMAGES, imageSchema);
