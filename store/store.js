import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from './devices';

export const store = configureStore({
    reducer: {
        deviceItem: deviceReducer
    }
})