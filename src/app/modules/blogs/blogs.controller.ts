import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import { StatusCodes } from 'http-status-codes';
import { BlogServices } from "./blogs.service";

// Create new blog:-------------------------------------------------------------------------
const createBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogServices.createBlog(req.body);

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
  const { blogId } = req.query;
  const result = await BlogServices.getBlogs(blogId as string);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: Array.isArray(result) ? "All Blogs Retrieved Successfully" : "Blog Data Retrieved Successfully",
    data: result
  })
})





// put/patch:-------------------------------------------------------------------------
// const updateUser = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   const payload = req.body;
//   const decodedToken = req.user; // Getting the logged-in user JWT_token
//   const user = await BlogServices.updateUser(userId, payload, decodedToken);

//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.CREATED,
//     message: "User Updated Successfully",
//     data: user,
//   })
// })


// delete---------------------------------
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
  // singleUser,
  // updateUser,
  deleteBlog
};

