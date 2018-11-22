import { Model, model, Schema } from 'mongoose';

import { ILogger } from '@src/interfaces/logger';
import { USERS, LOGGER } from '@src/constants/modelConstants';

const loggerSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  act: String,
  user: { type: Schema.Types.ObjectId, ref: USERS },
});
export const LoggerModel: Model<ILogger> = model<ILogger>(LOGGER, loggerSchema);
