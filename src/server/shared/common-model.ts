import { IUser } from "@server/models/user-model";
import { PopulatedDoc, Types } from "mongoose";

export interface IModifications {
    modifiedDate?: Date;
    modifiedBy: PopulatedDoc<IUser>;
    modifiednote?: string;
}

export const modifications = {
    modifiedDate: { type: Date, required: true, default: new Date(Date.now()) },
    modifiedBy: { type: Types.ObjectId, required: true, ref: "User" },
    modifiednote: { type: String, required: false }
}
export interface IGenericMeta {
    _id?: Types.ObjectId;
    code?: string;
    label?: string;
}

export const genericMeta = {
    code: { type: String, required: true },
    label: { type: String, required: true }
}