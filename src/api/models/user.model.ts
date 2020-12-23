import { randomBytes } from "crypto";
import mongoose, { Document, Schema } from "mongoose";
import * as argon2 from "argon2";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hash password before save
UserSchema.pre<IUser>("save", async function (next) {
  // salt
  const salt = randomBytes(32);

  // only hash password if it has been modified or new
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await argon2.hash(this.password, { salt });
});

export default mongoose.model<IUser>("User", UserSchema);
