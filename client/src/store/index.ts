import { configureStore } from '@reduxjs/toolkit';
import {distanceReducer} from "./slices/distance";
import {pointsReducer} from "./slices/points";

const store = configureStore({
    reducer: {
        distance: distanceReducer,
        points: pointsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;