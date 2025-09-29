import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectZodSchema, updateProjectZodSchema } from "./project.validation";
import { ProjectController } from "./project.controller";

export const projectRoutes = Router();

projectRoutes.post('/projects', validateRequest(createProjectZodSchema), ProjectController.createProject);       // create blog
projectRoutes.get('/projects', ProjectController.getProjects);                                                  // get all blogs and single blog with blog-id
projectRoutes.patch('/:projectId', validateRequest(updateProjectZodSchema), ProjectController.updateProject);  // update blog
projectRoutes.delete('/:projectId', ProjectController.deleteProject);                                         // delete blog