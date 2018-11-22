import { DocumentQuery } from 'mongoose';

import { ILogger } from '@src/interfaces/logger';
import { LoggerModel } from '@src/models/logger';

export function createLog(payload: Object): Promise<ILogger> {
  return LoggerModel.create(payload);
}

export const find = (payload: Object): DocumentQuery<ILogger[], ILogger> => {
  return LoggerModel.find(payload);
};
