import { Request } from "express";


export class file {
    name: String;
    destination: String;
    filename: String;
    originalname: String;
}

interface IRequest extends Request {
    files: Array<file>;
    file: file;
}
export { IRequest }