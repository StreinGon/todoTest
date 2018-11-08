import { Request } from "express";
import { Response } from "express-serve-static-core";

const customResponse = require('../customResponse/customResponse');
const constants = require('../../constants');

const userCheck = (req: Request, res: Response): Response | void => {
  const currentUser = req.user;
  if (currentUser._id === null || currentUser._id === undefined) {
    return customResponse(res, 401, constants.statusConstants.UNAUTHORIZED);
  }
};
export { userCheck };
