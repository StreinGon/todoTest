const mongoose = require('mongoose');
import { Schema, Model, model } from "mongoose";
import { IRole } from "../interfaces/role";
const { Schema } = mongoose;
const constants = require('../constants');

const Role = new Schema({
  rights: Number,
  createdAt: { type: Date, default: Date.now },
});

const RoleModel: Model<IRole> = model<IRole>(constants.modelConstants.ROLES, Role);

export { RoleModel }