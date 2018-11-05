const mongoose = require('mongoose');
const constants = require('../constants');

const prioritySchema = mongoose.Schema({
  value: Number,
  name: String,
});
const priorityModel = mongoose.model(
  constants.modelConstants.PRIORITY,
  prioritySchema,
  'priority',
);
export default priorityModel;
