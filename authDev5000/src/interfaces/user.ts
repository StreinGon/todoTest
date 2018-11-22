import mongoose = require('mongoose');
import { Document } from 'mongoose';
import { IRole } from './role';

export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  username: String;
  mail: String;
  password: String;
  avatar: mongoose.Schema.Types.ObjectId;
  role: IRole;
  todos: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  invite: mongoose.Schema.Types.ObjectId;
}
