var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Role = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rights: Number
});
const RoleModel = mongoose.model("Roles", Role, "roles");
module.exports = RoleModel;
