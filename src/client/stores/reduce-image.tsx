import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IImageState {
    logofull: string;
}

const initialState: IImageState = {
    logofull: ""
};

export const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setBase64LogoFull: (state, action: PayloadAction<string>) => {
            state.logofull = action.payload;
        }
    }
});

export const { setBase64LogoFull } = imageSlice.actions;

export default imageSlice.reducer;