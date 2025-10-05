import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import { StatusCodes } from 'http-status-codes';
import { BlogServices } from "./blogs.service";
import { IBlog } from "./blogs.interface";

// Create new blog:-------------------------------------------------------------------------
const createBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const payload: IBlog = {
    ...req.body,
    thumbnail: req.file?.path
  }
  const blog = await BlogServices.createBlog(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Blog Created Successfully",
    data: blog,
  })
}
);

// Get blogs:-------------------------------------------------------------------------
/* All blogs & single blog with blog-id */
const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await BlogServices.getBlogs(query as Record<string, string>);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: Array.isArray(result) ? "All Blogs Retrieved Successfully" : "Blog Data Retrieved Successfully",
    data: result
  })
})


// Update blog:-------------------------------------------------------------------------
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blogId = req.params.blogId as string;
  const payload: IBlog = {
    ...req.body,                // blog update data
    thumbnail: req.file?.path  // blog update image
  }
  const user = await BlogServices.updateBlog(blogId, payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Blog Updated Successfully",
    data: user,
  })
})


// Delete blog:---------------------------------
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogServices.deleteBlog(blogId as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog Deleted Successfully",
    data: result,
  })
});


export const BlogController = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
};

