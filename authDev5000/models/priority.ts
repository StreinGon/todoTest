const mongoose = require('mongoose');
const constants = require('../constants');
import { Model, model } from "mongoose";
import { IPriority } from "../interfaces/priority";

const prioritySchema = mongoose.Schema({
  value: Number,
  name: String,
});

const PriorityModel: Model<IPriority> = model<IPriority>(constants.modelConstants.PRIORITY, prioritySchema);
export { PriorityModel }