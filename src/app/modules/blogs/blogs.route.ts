import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogZodSchema, updateBlogZodSchema } from "./blogs.validation";
import { BlogController } from "./blogs.controller";
import { multerUpload } from "../../config/multer.config";

export const blogRoutes = Router();

blogRoutes.post('/blogs', multerUpload.single("file"), validateRequest(createBlogZodSchema), BlogController.createBlog);       // create blog
blogRoutes.get('/blogs', BlogController.getBlogs);                                               // get all blogs and single blog with blog-id
blogRoutes.patch('/:blogId', multerUpload.single("file"), validateRequest(updateBlogZodSchema), BlogController.updateBlog);  // update blog
blogRoutes.delete('/:blogId', BlogController.deleteBlog);                                      // delete blog