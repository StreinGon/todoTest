import { Document } from 'mongoose';
import mongoose = require('mongoose');

export interface ILogger extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  timestamp: Date;
  act: String;
  user: mongoose.Schema.Types.ObjectId;
}
