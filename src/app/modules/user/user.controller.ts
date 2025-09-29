/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { userServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/asyncCatch";
import sendResponse from "../../utils/sendResponse";


// Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await userServices.createUser(req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Created Successfully",
        data: user,
    })
});

// Get user
const getUser = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user;
    const allUsers = await userServices.getUser(decodedToken as JwtPayload);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User info Retrieved Successfully",
        data: allUsers,
    })
});



export const userController = {
    createUser,
    getUser
};

