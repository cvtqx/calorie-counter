import { configureStore } from "@reduxjs/toolkit";
import dailyMenuSlice from "./dailyMenu-Slice";

const store = configureStore({
    reducer: {
        dailyMenu: dailyMenuSlice.reducer,
    }
});

export default store;