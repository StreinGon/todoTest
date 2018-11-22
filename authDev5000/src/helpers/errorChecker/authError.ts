import { Request, Response } from 'express';
import { NextFunction } from 'connect';

import { IError } from '@src/interfaces/error';
import { customResponse } from '@src/helpers/customResponse/customResponse';
import { UNAUTHORIZED } from '@src/constants/statusCodeConstants';


export const authError = (error: IError, request: Request, response: Response, next: NextFunction): Response | void => {
  if (error.status === 401) {
    return customResponse(response, 401, UNAUTHORIZED);
  }
  return next();
};
