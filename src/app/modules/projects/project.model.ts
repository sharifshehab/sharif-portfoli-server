import { model, Schema } from "mongoose";
import { IProjectChallenges, IProject, IUpcomingFeatures } from "./project.interface";


const upcomingFeaturesSchema = new Schema<IUpcomingFeatures>({
  title: { type: String, required: true },
  description: { type: String, required: true }
}, {
  versionKey: false,
  _id: false
});

const projectChallengesSchema = new Schema<IProjectChallenges>({
  title: { type: String, required: true },
  description: { type: String, required: true }
}, {
  versionKey: false,
  _id: false
});



const projectSchema = new Schema<IProject>({
  name: { type: String, required: true, unique: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  technology: { type: [String], required: true },
  features: { type: [String], required: true },
  githubRepo: { type: String, required: true },
  liveLink: { type: String, required: true },
  upcomingFeatures: { type: [upcomingFeaturesSchema], required: true },
  projectChallenges: { type: [projectChallengesSchema], required: true }
}, {
  timestamps: true,
  versionKey: false
})

export const Project = model<IProject>("Project", projectSchema)