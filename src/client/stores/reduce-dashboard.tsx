import { IGridBooking } from "@client/entities/booking-models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS_BOOKING } from "@utils/constant-data";

export interface IDashboardState {
    showModal: boolean;
    titleModal: string;
    adminSubmit: STATUS_BOOKING;
    selectedBooking: IGridBooking;
}

const initialState: IDashboardState = {
    showModal: false,
    titleModal: "",
    adminSubmit: STATUS_BOOKING.PENDING,
    selectedBooking: null
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setShowHideModal: (state, action: PayloadAction<boolean>) => {
            state.showModal = action.payload;
        },
        setTitleModal: (state, action: PayloadAction<string>) => {
            state.titleModal = action.payload;
        },
        setAdminSubmit: (state, action: PayloadAction<STATUS_BOOKING>) => {
            state.adminSubmit = action.payload;
        },
        setSelectedBooking: (state, action: PayloadAction<IGridBooking>) => {
            state.selectedBooking = action.payload;
        }
    }
});

export const { setShowHideModal, setTitleModal, setAdminSubmit, setSelectedBooking } = dashboardSlice.actions;

export default dashboardSlice.reducer;