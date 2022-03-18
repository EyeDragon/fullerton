import { BookingService } from "./booking-service";
import { EventTypeService } from "./event-type-service";
import { UserService } from "./user-service";

class Services {
    private _userService: UserService = null;
    private _eventTypeService: EventTypeService = null;
    private _bookingService: BookingService = null;

    public get userService() {
        return this._userService = this._userService ?? new UserService();
    }

    public get eventTypeService() {
        return this._eventTypeService = this._eventTypeService ?? new EventTypeService();
    }

    public get bookingService() {
        return this._bookingService = this._bookingService ?? new BookingService();
    }
}

export const services = new Services();