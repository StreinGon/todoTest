const mongoose = require('mongoose');
const constants = require('../constants');

const imageSchema = mongoose.Schema({
  name: String,
  destination: String,
  url: String,
  originalname: String,
  createdAt: { type: Date, default: Date.now },
});
const imageModel = mongoose.model(constants.modelConstants.IMAGES, imageSchema);
export default imageModel;
