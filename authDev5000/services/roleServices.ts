import mongoose from 'mongoose'
const { RoleModel } = require('../models/role');

function createRoleOfUser(rights: number): mongoose.Query {
  return new RoleModel({
    rights,
    _id: new mongoose.Types.ObjectId(),

  });
}
export { createRoleOfUser };
