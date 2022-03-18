import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "./reduce-global";
import imageReducer from "./reduce-image";
import metaDataReducer from "./reduce-meta-data";
import dashboardReducer from "./reduce-dashboard";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    image: imageReducer,
    metaData: metaDataReducer,
    dashboard: dashboardReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;