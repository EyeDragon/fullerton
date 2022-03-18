import { IApprovedRejectedBooking } from "@client/entities/booking-models";
import { IUser } from "@server/models/user-model";
import { gridBookingMapping, newBookingMapping } from "@server/profiles/booking-mapping";
import { services } from "@server/services";
import { badRequest, successResponse } from "@shared/responses";
import { STATUS_BOOKING, StorageKey } from "@utils/constant-data";
import { Request, Response } from "express";
import store from "store2";

export class DashboardController {

    public static asyncGetAllBooking = async (req: Request, res: Response) => {
        try {
            const user = store.session.get(StorageKey.SERVER_USER_INFO) as IUser;
            const result = await services.bookingService.getAllBooking(user.role === "Admin" ? null : user._id);
            const resultView = result.map(item => gridBookingMapping.view(item));
            successResponse(res, "List of bookings", resultView);
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }

    public static asyncCreateBooking = async (req: Request, res: Response) => {
        try {
            const user = store.session.get(StorageKey.SERVER_USER_INFO) as IUser;
            const newBookingModel = await newBookingMapping.model(req.body);
            const result = await services.bookingService.create(user._id, newBookingModel);
            const message = result ? "success" : "failure";
            successResponse(res, message, result);
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }

    public static asyncUpdateStatusBooking = async (req: Request, res: Response) => {
        try {
            const data = req.body as IApprovedRejectedBooking;
            let result = false;
            const user = store.session.get(StorageKey.SERVER_USER_INFO) as IUser;
            if (data.status === STATUS_BOOKING.APPROVED) {
                result = await services.bookingService.updateStatusApproved(user._id, data.id, data.proposedDate);
            } else {
                result = await services.bookingService.updateStatusRejected(user._id, data.id, data.reason);
            }
            const message = result ? "success" : "failure";
            successResponse(res, message, result);
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }

    public static asyncCancelBooking = async (req: Request, res: Response) => {
        try {
            const id = req.params?.id;
            const user = store.session.get(StorageKey.SERVER_USER_INFO) as IUser;
            const result = await services.bookingService.cancelBooking(user._id, id);
            const message = result ? "success" : "failure";
            successResponse(res, message, result);
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }

}