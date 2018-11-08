import { Document } from "mongoose";

interface IPriority extends Document {
    value: Number;
    name: String;
}
export { IPriority }