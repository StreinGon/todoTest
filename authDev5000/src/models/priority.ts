import { Model, model, Schema } from 'mongoose';

import { IPriority } from '@src/interfaces/priority';
import { PRIORITY } from '@src/constants/modelConstants';

const prioritySchema = new Schema({
  value: Number,
  name: String,
});

export const PriorityModel: Model<IPriority> = model<IPriority>(PRIORITY, prioritySchema);
