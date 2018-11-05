const mongoose = require('mongoose');
const Rolemodel = require('../models/role');

function createRoleOfUser(rights) {
  return new Rolemodel({
    rights,
    _id: new mongoose.Types.ObjectId(),

  });
}
export default createRoleOfUser;
