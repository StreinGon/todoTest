const Rolemodel = require("../models/roleModel");
const mongoose = require("mongoose");

function createRoleOfUser(rights) {
  return new Rolemodel({
    _id: new mongoose.Types.ObjectId(),
    rights: rights
  });
}
module.exports = { createRoleOfUser };
