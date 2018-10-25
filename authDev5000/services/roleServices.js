const mongoose = require("mongoose");
const Rolemodel = require("../models/role");

function createRoleOfUser(rights) {
  return new Rolemodel({
    _id: new mongoose.Types.ObjectId(),
    rights
  });
}
module.exports = { createRoleOfUser };
