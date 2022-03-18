import { IGenericMeta } from "@client/entities/meta-models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMetaDataState {
    eventTypes: IGenericMeta[];
}

const initialState: IMetaDataState = {
    eventTypes: []
};

export const metaDataSlice = createSlice({
    name: "meta-data",
    initialState,
    reducers: {
        fetchEventTypes: (state, action: PayloadAction<IGenericMeta[]>) => {
            state.eventTypes = action.payload;
        }
    }
});

export const { fetchEventTypes } = metaDataSlice.actions;

export default metaDataSlice.reducer;