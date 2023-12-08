import { configureStore } from '@reduxjs/toolkit';
import {distanceReducer} from "./slices/distance";

const store = configureStore({
    reducer: {
        distance: distanceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;