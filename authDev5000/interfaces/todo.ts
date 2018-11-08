import mongoose = require('mongoose');
import { Document } from "mongoose";

interface ITodo extends Document {
    todoName: String;
    task: String;
    success: Boolean;
    image: Array<mongoose.Schema.Types.ObjectId>;
    category: String;
    todoOwner: mongoose.Schema.Types.ObjectId;
    priority: mongoose.Schema.Types.ObjectId;
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
export { ITodo }