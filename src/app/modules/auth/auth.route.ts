import { Router } from "express";
import { AuthControllers } from "./auth.controller";

export const AuthRoutes = Router()

AuthRoutes.post("/login", AuthControllers.credentialsLogin);  
AuthRoutes.post("/refresh-token", AuthControllers.getNewAccessToken);
AuthRoutes.post("/logout", AuthControllers.logout);
