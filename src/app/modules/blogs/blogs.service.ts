import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IBlog } from "./blogs.interface";
import { Blog } from "./blogs.model";
import { JwtPayload } from "jsonwebtoken";


// To create blog:---------------------------------------------------------------------------------------------------------
const createBlog = async (payload: IBlog) => {
  // Checking is blog with this title already exist
  const isBlogExist = await Blog.findOne({ title: payload?.title });
  if (isBlogExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Blog Title Already Exist");
  }

  const blog = await Blog.create(payload);
  return blog
}


// To get all users:---------------------------------------------------------------------------------------------------------
const getBlogs = async (blogId?: string) => {
  if (blogId) {
    const singleBlog = await Blog.findById(blogId);
    if (!singleBlog) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return singleBlog;
  } else {
    const blog = await Blog.find();
    return blog;
  }
};


// To get single user:---------------------------------------------------------------------------------------------------------
// const singleUser = async (payload: string) => {

//   // instead of "_id", use "slug" for finding a single data. It's more secure
//   const { slug } = payload;
//   const user = await User.findOne({ slug: slug });
//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//   }

//   return { user };
// }


// To update user:---------------------------------------------------------------------------------------------------------
// const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

//   // User and Guide can modify their own data, but not others’ data
//   if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
//     if (userId !== decodedToken.userId) {
//       throw new AppError(401, "You are not authorized")
//     }
//   }

//   const ifUserExist = await User.findById(userId);
//   if (!ifUserExist) {
//     throw new AppError(StatusCodes.NOT_FOUND, "User Not Found")
//   }

//   // Admin cannot assign "SUPER_ADMIN" role to anyone
//   if (decodedToken.role === Role.ADMIN && ifUserExist.role === Role.SUPER_ADMIN) {
//     throw new AppError(401, "You are not authorized")
//   }


//   // If trying to change a user role
//   if (payload.role) {
//     // "User" or "GUIDE" cannot uppdate "user's" role
//     if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
//       throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
//     }

//     // Block admins from touching SUPER_ADMIN roles
//     if (
//       (payload.role === Role.SUPER_ADMIN || ifUserExist.role === Role.SUPER_ADMIN) && decodedToken.role !== Role.SUPER_ADMIN
//     ) { throw new AppError(StatusCodes.FORBIDDEN, "Requires super-admin privileges"); }
//   }

//   // "User" or "GUIDE" cannot uppdate "user's" isActive, isDeleted, or isVerified status
//   if (payload.isActive || payload.isDeleted || payload.isVerified) {
//     if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
//       throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
//     }
//   }

//   const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

//   return newUpdatedUser
// }


// To delete user:---------------------------------------------------------------------------------------------------------
// const deleteUser = async (payload: string) => {
//   const { userId } = payload;
//   const user = await User.findByIdAndDelete(userId);
//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//   }

//   return { user };
// }

export const BlogServices = {
  createBlog,
  getBlogs,
  // singleUser,
  // updateUser,
  // deleteUser
}