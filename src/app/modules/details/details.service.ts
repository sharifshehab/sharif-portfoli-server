import { IDetails } from "./details.interface";
import { Details } from "./details.model";

// Add details:---------------------------------------------------------------------------------------------------------
const addDetails = async (payload: IDetails) => {
  const details = await Details.create(payload);
  return details
}


// Get details:---------------------------------------------------------------------------------------------------------
const getDetails = async () => {
  const details = await Details.find();
  return details;
};


// To update details:---------------------------------------------------------------------------------------------------------
const updateDetails = async (detailsId: string, payload: Partial<IDetails>) => {
  const newUpdatedDetails = await Details.findByIdAndUpdate(detailsId, payload, { new: true, runValidators: true });
  return newUpdatedDetails
}


export const DetailsServices = {
  addDetails,
  getDetails,
  updateDetails
}