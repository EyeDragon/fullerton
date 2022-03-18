import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
    isAdmin: boolean,
    refreshGrid: boolean,
}

const initialState: IGlobalState = {
    isAdmin: false,
    refreshGrid: false
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        checkUserIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        },
        activateRefreshGrid: (state) => {
            state.refreshGrid = !state.refreshGrid;
        }
    }
});

export const { checkUserIsAdmin, activateRefreshGrid } = globalSlice.actions;

export default globalSlice.reducer;