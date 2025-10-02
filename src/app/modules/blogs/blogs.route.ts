import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogZodSchema, updateBlogZodSchema } from "./blogs.validation";
import { BlogController } from "./blogs.controller";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

export const blogRoutes = Router();

blogRoutes.post('/blogs', checkAuth(Role.ADMIN), multerUpload.single("file"), validateRequest(createBlogZodSchema), BlogController.createBlog);       // create blog
blogRoutes.get('/blogs', BlogController.getBlogs);                                               // get all blogs and single blog with blog-id
blogRoutes.patch('/:blogId', checkAuth(Role.ADMIN), multerUpload.single("file"), validateRequest(updateBlogZodSchema), BlogController.updateBlog);  // update blog
blogRoutes.delete('/:blogId', checkAuth(Role.ADMIN), BlogController.deleteBlog);                                      // delete blog