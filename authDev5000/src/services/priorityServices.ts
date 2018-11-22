import mongoose from 'mongoose';

import { IPriority } from '@src/interfaces/priority';
import { PriorityModel } from '@src/models/priority';

export function createPriority(value: Number): IPriority {
  return new PriorityModel({
    value,
  });
}

export const find = (payload: Number): mongoose.Query<IPriority> => {
  return PriorityModel.findOne(payload);
};
