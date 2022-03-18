import { IGenericMeta, IModifications, modifications } from "@shared/common-model";
import { Document, model, PopulatedDoc, Schema, Types } from "mongoose";

export interface IProposedDate {
    date: Date;
    isSelected?: boolean;
}

export interface IBooking {
    _id?: Types.ObjectId;
    eventType: PopulatedDoc<IGenericMeta>;
    location: string;
    proposedDate: IProposedDate[];
    status: string;
    reason?: string;
    isDeleted?: boolean;
    modifications?: IModifications[];
}

const bookingSchema = new Schema<IBooking>({
    eventType: { type: Types.ObjectId, required: true, ref: "EventType" },
    location: { type: String, required: true },
    proposedDate: [{
        date: { type: Date, required: true },
        isSelected: { type: Boolean, default: false }
    }],
    status: { type: String, required: true },
    reason: { type: String },
    isDeleted: { type: Boolean, default: false },
    modifications: [modifications]
});

export const bookingModel = model<IBooking & Document>("Booking", bookingSchema, "Booking");