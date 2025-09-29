import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectZodSchema, updateProjectZodSchema } from "./project.validation";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";

export const projectRoutes = Router();

projectRoutes.post('/projects', multerUpload.single("file"), validateRequest(createProjectZodSchema), ProjectController.createProject);       // create project
projectRoutes.get('/projects', ProjectController.getProjects);                                                  // get all projects and single project with project-id
projectRoutes.patch('/:projectId', multerUpload.single("file"), validateRequest(updateProjectZodSchema), ProjectController.updateProject);  // update project
projectRoutes.delete('/:projectId', ProjectController.deleteProject);                                         // delete project