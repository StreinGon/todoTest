const { PriorityModel } = require('../models/priority');


function createPriority(value: Number) {
  return new PriorityModel({
    value: value,
  });
}
const find = (payload: Number) => {
  return PriorityModel.findOne(payload);
};
export {
  createPriority,
  find,
};
