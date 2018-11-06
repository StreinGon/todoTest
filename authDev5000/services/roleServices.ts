const mongoose = require('mongoose');
const { RoleModel } = require('../typegoouseClasses/role');

function createRoleOfUser(rights) {
  return new RoleModel({
    rights,
    _id: new mongoose.Types.ObjectId(),

  });
}
export { createRoleOfUser };
