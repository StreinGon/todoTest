import { Model, model, Schema } from 'mongoose';

import { IUser } from '@src/interfaces/user';
import { IMAGES, ROLES, TODOS, SHARED, USERS } from '@src/constants/modelConstants';

const Users = new Schema({
  username: String,
  mail: String,
  password: String,
  avatar: { type: Schema.Types.ObjectId, ref: IMAGES },
  role: { type: Schema.Types.ObjectId, ref: ROLES },
  todos: [{ type: Schema.Types.ObjectId, ref: TODOS }],
  createdAt: { type: Date, default: Date.now },
  invite: { type: Schema.Types.ObjectId, ref: SHARED },
});

export const UserModel: Model<IUser> = model<IUser>(USERS, Users);
