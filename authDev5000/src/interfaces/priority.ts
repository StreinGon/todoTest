import { Document } from 'mongoose';

export interface IPriority extends Document {
  value: Number;
  name: String;
}
