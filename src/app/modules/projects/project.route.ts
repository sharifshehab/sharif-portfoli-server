import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectZodSchema, updateProjectZodSchema } from "./project.validation";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";

export const projectRoutes = Router();

projectRoutes.post('/projects', multerUpload.single("file"), validateRequest(createProjectZodSchema), ProjectController.createProject);       // create blog
projectRoutes.get('/projects', ProjectController.getProjects);                                                  // get all blogs and single blog with blog-id
projectRoutes.patch('/:projectId', validateRequest(updateProjectZodSchema), ProjectController.updateProject);  // update blog
projectRoutes.delete('/:projectId', ProjectController.deleteProject);                                         // delete blog