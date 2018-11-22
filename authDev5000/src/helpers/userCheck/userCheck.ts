import { Request } from 'express';
import { Response } from 'express-serve-static-core';

import  { customResponse } from '@src/helpers/customResponse/customResponse';
import  * as constants  from '@src/constants/index';

export const userCheck = (req: Request, res: Response): Response | void => {
  const currentUser = req.user;
  if (currentUser._id === null || currentUser._id === undefined) {
    return customResponse(res, 401, constants.statusConstants.UNAUTHORIZED);
  }
};
