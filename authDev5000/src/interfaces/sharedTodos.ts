import mongoose = require('mongoose');
import { Document } from 'mongoose';

export interface ISharedTodo extends Document {
  todos: mongoose.Schema.Types.ObjectId[];
  allowed: mongoose.Schema.Types.ObjectId[];
}
