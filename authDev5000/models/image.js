const mongoose = require("mongoose");
const constants = require("../constants");

const imageSchema = mongoose.Schema({
  name: String,
  destination: String,
  url: String,
  originalname: String
});
const imageModel = mongoose.model(constants.modelConstants.IMAGES, imageSchema);
module.exports = imageModel;
