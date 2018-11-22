import { Document } from 'mongoose';

export interface IRole extends Document {
  rights: Number;
  createdAt: Date;
}
