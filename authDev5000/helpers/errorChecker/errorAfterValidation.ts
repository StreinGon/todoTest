import { Response } from "express";

const { customResponse } = require('../../helpers/customResponse/customResponse');

export function errorAftervalidation(errors, res: Response): Promise<Response> {
  let ErrormsgTest = '';
  errors.array().forEach((mes) => {
    if (ErrormsgTest === '') {
      ErrormsgTest += mes.msg;
    } else {
      ErrormsgTest += `,  ${mes.msg}`;
    }
  });
  return customResponse(res, 422, ErrormsgTest);
}

