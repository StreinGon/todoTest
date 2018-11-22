import { Document } from 'mongoose';

import { IPriority } from './priority';
import { IUser } from './user';
import { IImage } from './image';

export interface ITodo extends Document {
  todoName: String;
  task: String;
  success: Boolean;
  image: IImage[];
  category: String;
  todoOwner: IUser;
  priority: IPriority;
  timeTracking: {
    investigation: Number,
    onFact: Number,
  };
  status: String;
  dates: {
    start: Date,
    end: Date,
  };
  createdAt: Date;
}
