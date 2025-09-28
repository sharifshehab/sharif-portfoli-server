import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogZodSchema, updateUserZodSchema } from "./blogs.validation";
import { BlogController } from "./blogs.controller";

export const blogRoutes = Router();

blogRoutes.post('/blogs', validateRequest(createBlogZodSchema), BlogController.createBlog);  // create blog
blogRoutes.get('/blogs', BlogController.getAllBlogs);  // get all blogs
// blogRoutes.get('/:userId', BlogController.singleUser);    // get single user
// blogRoutes.put('/:id', validateRequest(updateUserZodSchema), BlogController.updateUser);  // update user
// blogRoutes.delete('/:userId', BlogController.deleteUser);   // delete user