import { Request, Response, NextFunction } from "express";
import { IError } from "../../interfaces/error";

const authError = (error: IError, request: Request, response: Response, next: NextFunction): Response | void => {
  if (error.status === 401) {
    return response.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};
export { authError };
