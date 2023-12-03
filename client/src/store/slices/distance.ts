import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import {ILocalitiDistToNearectMC} from "../../entities/entities";

interface Distances extends IBase{
    data: ILocalitiDistToNearectMC[] | null;
}

const initialState: Distances = {
    data: [],
    loading: true,
    error: null,
};

export const fetchLocalitiesWithDistMcs = createAsyncThunk('distance/fetchLocalitiesWithDistMcs', async (district_id: number) => {
    const {data} = await axiosInstance.get(`/api/distance/localities-nearest-faps`, {params: {district_id: district_id}});
    return data;
});

const distanceSlice = createSlice({
    name: 'distance',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLocalitiesWithDistMcs.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocalitiesWithDistMcs.fulfilled, (state, action: PayloadAction<ILocalitiDistToNearectMC[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLocalitiesWithDistMcs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch distances.';
            })
    },
});

export const distanceReducer = distanceSlice.reducer;