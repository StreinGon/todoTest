const mongoose = require('mongoose');
const { RoleModel } = require('../models/role');

function createRoleOfUser(rights) {
  return new RoleModel({
    rights,
    _id: new mongoose.Types.ObjectId(),

  });
}
export { createRoleOfUser };
