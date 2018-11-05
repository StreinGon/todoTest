const priorityModel = require('../models/priority');

function createPriority(value) {
  return new priorityModel({
    value: value.value,
  });
}
const find = (payload) => {
  return priorityModel.findOne(payload);
};
export {
  createPriority,
  find,
};
