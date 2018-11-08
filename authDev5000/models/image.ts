import { IImage } from "../interfaces/image";
import { Model, model } from "mongoose";
const mongoose = require('mongoose');


const imageSchema = mongoose.Schema({
  name: String,
  destination: String,
  url: String,
  originalname: String,
  createdAt: { type: Date, default: Date.now },
});

const ImageModel: Model<IImage> = model<IImage>("Image", imageSchema);
export { ImageModel }