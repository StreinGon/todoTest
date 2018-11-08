import { Document } from "mongoose";

interface IRole extends Document {
    rights: Number;
    createdAt: Date;
}
export { IRole }