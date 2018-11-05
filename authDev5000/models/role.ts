const mongoose = require('mongoose');

const { Schema } = mongoose;
const constants = require('../constants');

const Role = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rights: Number,
  createdAt: { type: Date, default: Date.now },
});
const RoleModel = mongoose.model(constants.modelConstants.ROLES, Role, 'roles');
export default RoleModel;
