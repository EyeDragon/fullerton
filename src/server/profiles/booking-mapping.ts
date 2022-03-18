import * as BookingClient from "@entities/booking-models";
import * as BookingServer from "@models/booking-model";
import { IGenericMeta } from "@server/shared/common-model";
import { STATUS_BOOKING } from "@utils/constant-data";
import { eventTypeMapping } from "./meta-mappting";

export const gridBookingMapping = {
    view: (model: BookingServer.IBooking): BookingClient.IGridBooking => {
        return {
            id: String(model._id),
            event: (model.eventType as IGenericMeta)?.label,
            location: model.location,
            proposedDate: model.proposedDate.map<BookingClient.IProposedDate>(item => ({
                date: item.date,
                isSelected: item.isSelected
            })),
            status: model.status
        };
    }
}

export const newBookingMapping = {
    model: async (view: BookingClient.IInputtedBooking): Promise<BookingServer.IBooking> => {
        const event = (await eventTypeMapping.model(view.eventCode));
        return {
            eventType: event._id,
            location: view.location,
            proposedDate: view.proposedDate.map<BookingServer.IProposedDate>(item => ({
                date: item.date
            })),
            status: STATUS_BOOKING.PENDING
        };
    }
}