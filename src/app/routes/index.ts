import { Router } from "express";
import { blogRoutes } from "../modules/blogs/blogs.route";
import { projectRoutes } from "../modules/projects/project.route";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const routes = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes
  },
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/blog",
    route: blogRoutes
  },
  {
    path: "/project",
    route: projectRoutes
  },
]

moduleRoutes.forEach((route) => {
  routes.use(route.path, route.route)
})