import { Response } from 'express';

import { customResponse } from '@src/helpers/customResponse/customResponse';

export function errorAftervalidation(errors, res: Response): Response {
  let errorMsgTest = '';
  errors.array().forEach((mes): void => {
    if (errorMsgTest === '') {
      errorMsgTest += mes.msg;
    } else {
      errorMsgTest += `,  ${mes.msg}`;
    }
  });
  return customResponse(res, 422, errorMsgTest);
}
