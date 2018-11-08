import mongoose from 'mongoose'
const { RoleModel } = require('../models/role');

function createRoleOfUser(rights: number) {
  return new RoleModel({
    rights,
    _id: new mongoose.Types.ObjectId(),

  });
}
export { createRoleOfUser };
