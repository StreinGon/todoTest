const mongoose = require('mongoose');
import { Model, model } from "mongoose";
import { IUser } from "../interfaces/user";
const { Schema } = mongoose;
const constants = require('../constants');

const Users = new Schema({
  username: String,
  mail: String,
  password: String,
  avatar: { type: Schema.ObjectId, ref: constants.modelConstants.IMAGES },
  role: { type: Schema.ObjectId, ref: constants.modelConstants.ROLES },
  todos: [{ type: Schema.ObjectId, ref: constants.modelConstants.TODOS }],
  createdAt: { type: Date, default: Date.now },
  invite: { type: Schema.ObjectId, ref: 'SharedTodos' },
});


const UserModel: Model<IUser> = model<IUser>(constants.modelConstants.USERS, Users);
export { UserModel }