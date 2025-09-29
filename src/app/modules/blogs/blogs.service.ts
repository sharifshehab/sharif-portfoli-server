import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IBlog } from "./blogs.interface";
import { Blog } from "./blogs.model";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

// To create blog:---------------------------------------------------------------------------------------------------------
const createBlog = async (payload: IBlog) => {
  // Checking is blog with this title already exist
  const isBlogExist = await Blog.findOne({ title: payload?.title });
  if (isBlogExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Blog Title Already Exist");
  }

  const blog = await Blog.create(payload);
  return blog
}


// To get all blogs and single blog with blog-id:---------------------------------------------------------------------------------------------------------
const getBlogs = async (blogId?: string) => {
  if (blogId) {
    const singleBlog = await Blog.findById(blogId);
    if (!singleBlog) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return singleBlog;
  } else {
    const blog = await Blog.find();
    return blog;
  }
};


// To update user:---------------------------------------------------------------------------------------------------------
const updateBlog = async (blogId: string, payload: Partial<IBlog>) => {
  // Email address cannot be changed
  if (payload?.email) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email Cannot Be Changed")
  }
  const existingBlog = await Blog.findById(blogId);
  if (!existingBlog) {
    throw new Error("Blog not found.");
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
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
}

export const BlogServices = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
}