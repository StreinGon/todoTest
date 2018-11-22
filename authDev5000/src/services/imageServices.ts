import { DocumentQuery } from 'mongoose';

import { IImage } from '@src/interfaces/image';
import { ImageModel } from '@src/models/image';

export function createImage(payload: Object): IImage {
  return new ImageModel(payload);
}

export const find = (payload: Object): DocumentQuery<IImage[], IImage> => {
  return ImageModel.find(payload);
};
