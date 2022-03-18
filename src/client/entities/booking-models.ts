import { STATUS_BOOKING } from "@utils/constant-data";

export interface IGridBooking {
    id: string;
    event: string;
    location: string;
    proposedDate: IProposedDate[];
    status: string;
}

export interface IProposedDate {
    date: Date;
    isSelected?: boolean;
}

export interface IInputtedBooking {
    eventCode: string;
    location: string;
    proposedDate: IProposedDate[];
}

export interface IApprovedRejectedBooking {
    id: string;
    status: STATUS_BOOKING;
    proposedDate?: IProposedDate[];
    reason?: string;
}