import { Document } from "mongoose";

interface IImage extends Document {
    name: String;
    destination: String;
    url: String;
    originalname: String;
    createdAt: Date;
}
export { IImage }