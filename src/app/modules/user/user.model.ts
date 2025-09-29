import { model, Schema } from "mongoose";
import { IUser, Role, } from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please provide user name'],
        },
        email: {
            type: String,
            required: true,
            immutable: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            trim: true
        },
        role: {
            type: String,
            enum: {
                values: Object.values(Role),
                message: 'User role not supported, got {VALUE}'
            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);
export const User = model<IUser>('User', userSchema);
