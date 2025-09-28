import { model, Schema } from "mongoose";
import { IBlog } from "./blogs.interface";

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  thumbnail: { type: String, required: true, },
  tags: { type: [String], required: true }
}, {
  timestamps: true,
  versionKey: false
})

export const Blog = model<IBlog>("Blog", blogSchema)