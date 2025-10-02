import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import { StatusCodes } from 'http-status-codes';
import { DetailsServices } from "./details.service";

// Add details:-------------------------------------------------------------------------
const addDetails: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const details = await DetailsServices.addDetails(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Details Added Successfully",
    data: details,
  })
}
);

// Get details:-------------------------------------------------------------------------
const getDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await DetailsServices.getDetails();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Details Data Retrieved Successfully",
    data: result
  })
})


// Update details:-------------------------------------------------------------------------
const updateDetails = catchAsync(async (req: Request, res: Response) => {
  const detailsId = req.params.detailsId as string;
  const user = await DetailsServices.updateDetails(detailsId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Details Updated Successfully",
    data: user,
  })
})


export const DetailsController = {
  addDetails,
  getDetails,
  updateDetails
};

