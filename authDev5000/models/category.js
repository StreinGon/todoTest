const mongoose = require("mongoose");
const constants = require("../constants");

const { Schema } = mongoose;

const CategorySchema = mongoose.Schema({
  name: String,
  todos: [{ type: Schema.ObjectId, ref: constants.modelConstants.TODOS }]
});
const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;
