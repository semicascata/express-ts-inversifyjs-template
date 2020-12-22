import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  pages: number;
  photo: string;
  active: boolean;
  createdAt: Date;
}

const BookSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  author: {
    type: String,
    required: true,
    index: true,
  },
  pages: {
    type: Number,
    required: false,
    default: 0,
  },
  photo: {
    data: Buffer,
    contentType: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IBook>("Book", BookSchema);
