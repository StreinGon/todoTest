import { IPriority } from "../interfaces/priority";
import mongoose from 'mongoose'
const { PriorityModel } = require('../models/priority');


function createPriority(value: Number): IPriority {
  return new PriorityModel({
    value: value,
  });
}
const find = (payload: Number): mongoose.Query<IPriority> => {
  return PriorityModel.findOne(payload);
};
export {
  createPriority,
  find,
};
