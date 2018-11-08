import { IError } from "../../interfaces/error";
import { Request, Response } from "express";
import { NextFunction } from "connect";

const JSONerrorChecker = (error: IError, request: Request, response, next: NextFunction): Response | void => {
  if (error instanceof SyntaxError) {
    return response.status(400).json({ message: 'Invalid json' });
  }
  return next();
};
export { JSONerrorChecker };
