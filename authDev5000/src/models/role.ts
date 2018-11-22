import { Model, model, Schema } from 'mongoose';

import { IRole } from '@src/interfaces/role';
import { ROLES } from '@src/constants/modelConstants';

const Role = new Schema({
  rights: Number,
  createdAt: { type: Date, default: Date.now },
});

export const RoleModel: Model<IRole> = model<IRole>(ROLES, Role);
