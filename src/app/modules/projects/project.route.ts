import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectZodSchema, updateProjectZodSchema } from "./project.validation";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

export const projectRoutes = Router();

projectRoutes.post('/projects', checkAuth(Role.ADMIN), multerUpload.single("file"), validateRequest(createProjectZodSchema), ProjectController.createProject);       // create project
projectRoutes.get('/projects', ProjectController.getProjects);                                                  // get all projects and single project with project-id
projectRoutes.patch('/:projectId', checkAuth(Role.ADMIN), multerUpload.single("file"), validateRequest(updateProjectZodSchema), ProjectController.updateProject);  // update project
projectRoutes.delete('/:projectId', checkAuth(Role.ADMIN), ProjectController.deleteProject);                                         // delete project