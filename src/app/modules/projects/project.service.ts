import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IProject } from "./project.interface";
import { Project } from "./project.model";



// To create user:---------------------------------------------------------------------------------------------------------
const createProject = async (payload: IProject) => {
  // Checking is project with this name already exist
  const isProjectExist = await Project.findOne({ name: payload?.name });
  if (isProjectExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Project Name Already Exist");
  }

  const blog = await Project.create(payload);
  return blog
}


// To get all users:---------------------------------------------------------------------------------------------------------
const getProjects = async (projectId?: string) => {
  if (projectId) {
    const singleProject = await Project.findById(projectId);
    if (!singleProject) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
    }
    return singleProject;
  } else {
    const project = await Project.find();
    return project;
  }
};


// To update user:---------------------------------------------------------------------------------------------------------
const updateProject = async (projectId: string, payload: Partial<IProject>) => {

  const newUpdatedProject = await Project.findByIdAndUpdate(projectId, payload, { new: true, runValidators: true });
  if (!newUpdatedProject) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project Not Found")
  }
  return newUpdatedProject
}


// To delete user:---------------------------------------------------------------------------------------------------------
const deleteProject = async (projectId: string) => {
  const project = await Project.findByIdAndDelete(projectId);
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }
  return project;
}

export const ProjectServices = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
}