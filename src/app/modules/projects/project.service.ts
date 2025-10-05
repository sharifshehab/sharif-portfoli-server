
import { IProject } from "./project.interface";
import { Project } from "./project.model";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";



// To create user:---------------------------------------------------------------------------------------------------------
const createProject = async (payload: IProject) => {
  const blog = await Project.create(payload);
  return blog
}


// To get all users:---------------------------------------------------------------------------------------------------------
const getProjects = async (query: Record<string, string>) => {
  const { projectId, limit } = query

  if (projectId) {
    const singleProject = await Project.findById(projectId);
    return singleProject;
  } else {
    const limitNumber = limit ? parseInt(limit) : 0;
    const project = limitNumber > 0
      ? await Project.find().limit(limitNumber).sort({ createdAt: -1 })
      :
      await Project.find().sort({ createdAt: -1 });

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
  return project;
}

export const ProjectServices = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
}