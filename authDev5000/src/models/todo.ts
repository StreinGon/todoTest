import { Model, model, Schema } from 'mongoose';

import { ITodo } from '@src/interfaces/todo';

import { IMAGES, USERS, PRIORITY, TODOS } from '@src/constants/modelConstants';

const Todo = new Schema({
  todoName: String,
  task: String,
  success: Boolean,
  image: [{ type: Schema.Types.ObjectId, ref: IMAGES }],
  category: String,
  todoOwner: { type: Schema.Types.ObjectId, ref: USERS },
  priority: { type: Schema.Types.ObjectId, ref: PRIORITY },
  timeTracking: {
    investigation: Number,
    onFact: Number,
  },
  status: String,
  dates: {
    start: Date,
    end: Date,
  },
  createdAt: { type: Date, default: Date.now },
});
export const TodoModel: Model<ITodo> = model<ITodo>(TODOS, Todo);
