import { Document, model, Schema, Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId;
    username?: string;
    password?: string;
    role?: "User" | "Admin";
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
});

export const userModel = model<IUser & Document>("User", userSchema, "User");