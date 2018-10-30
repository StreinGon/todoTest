const priorityModel = require("../models/priority");

function createPriority(value) {
  return new priorityModel({
    value: value.value
  });
}
const find = payload => {
  return priorityModel.findOne(payload);
};
module.exports = {
  createPriority,
  find
};
