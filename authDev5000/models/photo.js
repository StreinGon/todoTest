const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  name: String,
  destination: String,
  url: String,
  originalname: String
});
const imageModel = mongoose.model("Image", imageSchema);
module.exports = imageModel;
