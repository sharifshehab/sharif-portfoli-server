
import { StatusCodes } from "http-status-codes";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";


// Create user
const createUser = async (payload: IUser) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist");
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
    const user = await User.create({ ...payload, password: hashedPassword });
    return user
};


// Get user
const getUser = async (decodedToken: JwtPayload) => {
    const user = await User.findById(decodedToken.userId);
    return user;
};


export const userServices = {
    createUser,
    getUser
}