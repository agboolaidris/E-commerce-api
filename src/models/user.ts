import { Schema, model, Document, HookNextFunction } from "mongoose";
import bcrypt from "bcrypt";

export interface userInput extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  mobile?: string;
  avater?: string;
  resetpasswordExpire?: string;
  resetpasswordToken?: string;
}

const schema = new Schema<userInput>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    password: { type: String, required: true, unique: true },
    mobile: { type: String },
    avater: { type: String },
    resetpasswordToken: { type: String },
    resetpasswordExpire: { type: Date },
  },
  { timestamps: true }
);

//hash password
schema.pre("save", async function (next: HookNextFunction) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = model<userInput>("User", schema);
