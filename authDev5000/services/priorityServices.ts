const { PriorityModel } = require('../models/priority');
import mongoose from 'mongoose'

function createPriority(value: Number): mongoose.Query {
  return new PriorityModel({
    value: value,
  });
}
const find = (payload: Number): mongoose.Query => {
  return PriorityModel.findOne(payload);
};
export {
  createPriority,
  find,
};
