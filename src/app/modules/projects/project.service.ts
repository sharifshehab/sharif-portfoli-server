import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IProject } from "./project.interface";
import { Project } from "./project.model";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";



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
  const existingProject = await Project.findById(projectId);
  if (!existingProject) {
    throw new Error("Project not found.");
  }

  const newUpdatedProject = await Project.findByIdAndUpdate(projectId, payload, { new: true, runValidators: true });

  // Make sure to put this, after "findByIdAndUpdate"
  if (payload.thumbnail && existingProject.thumbnail) {
    // Delete the old Image from the "Cloudinary" website
    await deleteImageFromCLoudinary(existingProject.thumbnail);
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