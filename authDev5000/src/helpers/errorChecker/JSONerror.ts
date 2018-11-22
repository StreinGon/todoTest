import { IError } from '@src/interfaces/error';
import { Request, Response } from 'express';
import { customResponse } from '@src/helpers/customResponse/customResponse';
import { INVALID_JSON } from '@src/constants/statusCodeConstants';

export const jsonError = (error: IError, request: Request, response,next): Response | void => {
  if (error instanceof SyntaxError) {
    return customResponse(response, 400, INVALID_JSON);

  }
  return next();
};
