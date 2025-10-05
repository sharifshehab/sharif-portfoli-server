import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IBlog } from "./blogs.interface";
import { Blog } from "./blogs.model";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

// To create blog:---------------------------------------------------------------------------------------------------------
const createBlog = async (payload: IBlog) => {
  const blog = await Blog.create(payload);
  return blog
}


// To get all blogs and single blog with blog-id:---------------------------------------------------------------------------------------------------------
const getBlogs = async (query: Record<string, string>) => {
  const { blogId, limit } = query
  if (blogId) {
    const singleBlog = await Blog.findById(blogId);
    return singleBlog;
  } else {
    const limitNumber = limit ? parseInt(limit) : 0;
    const blog = limitNumber > 0
      ? await Blog.find().limit(limitNumber).sort({ createdAt: -1 })
      : await Blog.find().sort({ createdAt: -1 });

    return blog;
  }
};


// To update user:---------------------------------------------------------------------------------------------------------
const updateBlog = async (blogId: string, payload: Partial<IBlog>) => {
  const existingBlog = await Blog.findById(blogId);
  if (!existingBlog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found.");
  }

  const newUpdatedBlog = await Blog.findByIdAndUpdate(blogId, payload, { new: true, runValidators: true });

  // Make sure to put this, after "findByIdAndUpdate"
  if (payload.thumbnail && existingBlog.thumbnail) {
    // Delete the old Image from the "Cloudinary" website
    await deleteImageFromCLoudinary(existingBlog.thumbnail);
  }
  return newUpdatedBlog
}


// To delete blog:---------------------------------------------------------------------------------------------------------
const deleteBlog = async (blogId: string) => {
  const blog = await Blog.findByIdAndDelete(blogId);
  return blog;
}

export const BlogServices = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
}