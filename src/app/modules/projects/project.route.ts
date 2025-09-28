import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./project.validation";
import { ProjectController } from "./project.controller";

export const projectRoutes = Router();

projectRoutes.post('/register', validateRequest(createUserZodSchema), ProjectController.createUser);  // create user
projectRoutes.get('/all-users', ProjectController.getAllUsers);  // get all users
projectRoutes.get('/:userId', ProjectController.singleUser);    // get single user
projectRoutes.put('/:id', validateRequest(updateUserZodSchema), ProjectController.updateUser);  // update user
projectRoutes.delete('/:userId', ProjectController.deleteUser);   // delete user