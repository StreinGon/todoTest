const { PriorityModel } = require('../typegoouseClasses/priority');

function createPriority(value) {
  return new PriorityModel({
    value: value.value,
  });
}
const find = (payload) => {
  return PriorityModel.findOne(payload);
};
export {
  createPriority,
  find,
};
