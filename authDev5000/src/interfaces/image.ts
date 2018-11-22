import { Document } from 'mongoose';

export interface IImage extends Document {
  name: String;
  destination: String;
  url: String;
  originalname: String;
  createdAt: Date;
}
