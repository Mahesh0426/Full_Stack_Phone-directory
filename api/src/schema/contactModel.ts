import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  phone: number;
}

const contactSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
});

export default mongoose.model<IContact>("Contact", contactSchema);
