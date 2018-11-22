import { Model, model, Schema } from 'mongoose';

import { ISharedTodo } from '@src/interfaces/sharedTodos';
import { TODOS, USERS, SHARED } from '@src/constants/modelConstants';

const SharedTodosSchema = new Schema({
  todos: [{ type:  Schema.Types.ObjectId, ref: TODOS }],
  allowed: [{ type:  Schema.Types.ObjectId, ref: USERS }],
});
export const SharedTodosModel: Model<ISharedTodo> = model<ISharedTodo>(SHARED, SharedTodosSchema);
