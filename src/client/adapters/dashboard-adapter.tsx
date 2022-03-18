import { IApprovedRejectedBooking, IGridBooking, IInputtedBooking } from "@client/entities/booking-models";
import { RESPONSE_STATUS, STATUS_BOOKING } from "@utils/constant-data";
import { BaseAdapter } from "./base/base-adapter";

class DashboardAdapter extends BaseAdapter {

    public async asyncGetAllBooking() {
        const result = await this.GET<IGridBooking[]>({
            url: "get-all-booking"
        });
        if (result.status === RESPONSE_STATUS.SUCCESS) {
            return result.data;
        }
        return [];
    }

    public async asyncCreateBooking(booking: IInputtedBooking) {
        const result = await this.POST<boolean>({
            url: "create-booking",
            body: booking
        });
        if (result.status === RESPONSE_STATUS.SUCCESS) {
            return result.data;
        }
        return false;
    }

    public async asyncApprovedRejectedBooking(booking: IApprovedRejectedBooking) {
        const result = await this.PUT<boolean>({
            url: "update-status",
            body: booking
        });
        if (result.status === RESPONSE_STATUS.SUCCESS) {
            return result.data;
        }
        return false;
    }

    public async asyncCancelBooking(id: string) {
        const result = await this.DELETE<boolean>({
            url: "cancel-booking",
            params: {
                id
            }
        });
        if (result.status === RESPONSE_STATUS.SUCCESS) {
            return result.data;
        }
        return false;
    }

}

export const dashboardAdapter = new DashboardAdapter("Dashboard");