import { Schema, model, Document } from "mongoose";

export interface productInput extends Document {
  name: string;
  slug: string;
  description: string;
  price: Number;
  quantity: Number;
  offer?: Number;
  images: [string];
  createdBy: string;
}

const schema = new Schema<productInput>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    offer: { type: Number },
    images: [{ type: String, required: true }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
export const Product = model<productInput>("Product", schema);
