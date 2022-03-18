import { bookingModel, IBooking, IProposedDate } from "@server/models/booking-model";
import { IModifications } from "@server/shared/common-model";
import { STATUS_BOOKING } from "@utils/constant-data";
import { isEmpty } from "@utils/function-data";
import { Types } from "mongoose";

export class BookingService {
    public async getAllBooking(userId?: Types.ObjectId) {
        const result: IBooking[] = await bookingModel.find({
            $and: [
                { isDeleted: false },
                !isEmpty(userId) ? { "modifications.0.modifiedBy": userId } : {}
            ]
        }).populate("eventType");
        return result;
    }

    public async create(userId: Types.ObjectId, item: IBooking) {
        item.modifications = [{
            modifiedBy: userId
        }];
        const data = new bookingModel(item);
        const result: IBooking = await data.save();
        return result ? true : false;
    }

    public async updateStatusApproved(userId: Types.ObjectId, id: string, proposedDate: IProposedDate[]) {
        const result: IBooking = await bookingModel.findByIdAndUpdate(
            {
                _id: id,
                status: STATUS_BOOKING.PENDING
            },
            {
                ...this.pushModification(userId),
                status: STATUS_BOOKING.APPROVED,
                proposedDate
            }
        );
        return result ? true : false;
    }

    public async updateStatusRejected(userId: Types.ObjectId, id: string, reason?: string) {
        const result: IBooking = await bookingModel.findByIdAndUpdate(
            {
                _id: id,
                status: STATUS_BOOKING.PENDING
            },
            {
                ...this.pushModification(userId),
                status: STATUS_BOOKING.REJECTED,
                reason
            }
        );
        return result ? true : false;
    }

    public async cancelBooking(userId: Types.ObjectId, id: string) {
        const result: IBooking = await bookingModel.findByIdAndUpdate(
            {
                _id: id,
                status: STATUS_BOOKING.PENDING
            },
            {
                ...this.pushModification(userId),
                isDeleted: true
            }
        );
        return result ? true : false;
    }

    private pushModification(userId: Types.ObjectId, note?: string) {
        const modification: IModifications = {
            modifiedBy: userId,
            modifiednote: note
        };
        return {
            $push: { modifications: modification }
        }
    }
}