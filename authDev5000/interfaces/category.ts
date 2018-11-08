import mongoose = require('mongoose');
import { Document } from "mongoose";
interface ICategory extends Document {
    name: String;
    todos: Array<mongoose.Schema.Types.ObjectId>;
}
export { ICategory }