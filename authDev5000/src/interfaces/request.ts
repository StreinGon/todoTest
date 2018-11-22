import { Request } from 'express';

export class File {
  name: String;
  destination: String;
  filename: String;
  originalname: String;
}

export interface IRequest extends Request {
  files: File[];
  file: File;
}
