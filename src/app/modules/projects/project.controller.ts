import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import { StatusCodes } from 'http-status-codes';
import { ProjectServices } from "./project.service";
import { IProject } from "./project.interface";

// post:-------------------------------------------------------------------------
const createProject: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const payload: IProject = {
    ...req.body,                // project data
    thumbnail: req.file?.path  // project image
  }
  const user = await ProjectServices.createProject(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Project Created Successfully",
    data: user,
  })
}
);

// get:-------------------------------------------------------------------------
/* all user */
const getProjects = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.query;
  const result = await ProjectServices.getProjects(projectId as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: Array.isArray(result) ? "All Projects Retrieved Successfully" : "Projects Data Retrieved Successfully",
    data: result
  })
})

// patch:-------------------------------------------------------------------------
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const payload: IProject = {
    ...req.body,                // project update data
    thumbnail: req.file?.path  // project update image
  }
  const user = await ProjectServices.updateProject(projectId as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Project Updated Successfully",
    data: user,
  })
})

// delete---------------------------------
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const result = await ProjectServices.deleteProject(projectId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Project Deleted Successfully",
    data: result,
  })
});


export const ProjectController = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
};

