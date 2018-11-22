import mongoose = require('mongoose');
import { Document } from 'mongoose';

export interface ICategory extends Document {
  name: String;
  todos: mongoose.Schema.Types.ObjectId[];
}
