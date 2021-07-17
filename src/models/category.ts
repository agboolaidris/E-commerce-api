import { Schema, model, Document, HookNextFunction } from "mongoose";

export interface CategoryInput extends Document {
  name: string;
  slug: string;
  image?: string;
  parentId?: string;
}

const schema = new Schema<CategoryInput>(
  {
    name: { type: String, trim: true, required: true },
    slug: { type: String, unique: true, required: true },
    image: { type: String },
    parentId: { type: String },
  },
  { timestamps: true }
);

export const Category = model<CategoryInput>("Category", schema);
