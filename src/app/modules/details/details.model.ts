import { model, Schema } from "mongoose";
import { IDetails, IEducation } from "./details.interface";

const educationSchema = new Schema<IEducation>({
  title: { type: String, required: true },
  institute: { type: String, required: true },
  session: { type: String, required: true },
}, {
  timestamps: false,
  versionKey: false
});

const detailsSchema = new Schema<IDetails>({
  about: { type: String, required: true },
  education: { type: [educationSchema], required: true }
}, {
  timestamps: true,
  versionKey: false
})

export const Details = model<IDetails>("Details", detailsSchema)