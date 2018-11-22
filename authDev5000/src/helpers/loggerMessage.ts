import * as loggerServices from '@src/services/loggerServices';
import { mapped } from '@src/constants/loggerConstants';

export const loggerMessage = (req, payload?: Object, error?: String): void => {
  if (!error) {
    const message = mapped.get(`${req.method} ${req.baseUrl}`);
    const part = `${req.method} ${req.baseUrl}${message}`;
    loggerServices
    .createLog({ act:`${part}${payload ? payload : ''}`, user: req.user })
    .then(() => {}).catch((err: Error): Error => err);
  } else {
    loggerServices
    .createLog({ act: `${req.method} ${req.baseUrl} ${error}`, user: req.user })
    .then(() => {}).catch((err: Error): Error => err);
  }
};
