const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  path: String , 
  originalname: String
});
const imageModel = module.exports = mongoose.model('Image', imageSchema);
module.exports=imageModel;