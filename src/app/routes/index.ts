import { Router } from "express";
import { blogRoutes } from "../modules/blogs/blogs.route";
import { projectRoutes } from "../modules/projects/project.route";

export const routes = Router();
const moduleRoutes = [
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