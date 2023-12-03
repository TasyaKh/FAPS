import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import {ICustomSolutionsLocalities} from "../../entities/entities";

interface Distances extends IBase{
    data: ICustomSolutionsLocalities[] | null;
}

const initialState: Distances = {
    data: [],
    loading: true,
    error: null,
};

export const fetchSolutionsLocalities = createAsyncThunk('points/fetchSolutionsLocalities', async (district_id: number) => {
    const {data} = await axiosInstance.get(`/api/points/solutions-localities`, {params: {district_id: district_id}});
    return data;
});

const distanceSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSolutionsLocalities.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSolutionsLocalities.fulfilled, (state, action: PayloadAction<ICustomSolutionsLocalities[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSolutionsLocalities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch distances.';
            })
    },
});

export const pointsReducer = distanceSlice.reducer;