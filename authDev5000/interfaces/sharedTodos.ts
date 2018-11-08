import mongoose = require('mongoose');
import { Document } from "mongoose";

interface ISharedTodo extends Document {
    todos: Array<mongoose.Schema.Types.ObjectId>;
    allowed: Array<mongoose.Schema.Types.ObjectId>;
}
export { ISharedTodo }