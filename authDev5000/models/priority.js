const mongoose = require("mongoose");

const prioritySchema = mongoose.Schema({
  value: Number
});
const priorityModel = mongoose.model("Priority", prioritySchema, "priority");
module.exports = priorityModel;
