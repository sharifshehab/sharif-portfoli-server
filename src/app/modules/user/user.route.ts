import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { userController } from "./user.controller";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

export const userRoutes = Router();

userRoutes.post('/register', validateRequest(createUserZodSchema), userController.createUser);  // Create user

userRoutes.get('/me', checkAuth(Role.ADMIN), userController.getUser);  // Get user

