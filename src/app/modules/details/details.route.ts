import { Router } from "express";
import { Role } from "../user/user.interface";
import { DetailsController } from "./details.controller";
import { detailZodSchema, updateDetailZodSchema } from "./details.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

export const detailsRoutes = Router();

detailsRoutes.post('/details', checkAuth(Role.ADMIN), validateRequest(detailZodSchema), DetailsController.addDetails);                  // add details
detailsRoutes.get('/details', DetailsController.getDetails);                                                                          // get details
detailsRoutes.patch('/:detailsId', checkAuth(Role.ADMIN), validateRequest(updateDetailZodSchema), DetailsController.updateDetails);  // update details
