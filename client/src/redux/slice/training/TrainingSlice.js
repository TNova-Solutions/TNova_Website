import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const trainingSlice = createSlice({
    name: 'trainingSection',
    initialState,
    reducers: {
        setTrainingData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setTrainingData } = trainingSlice.actions;
export default trainingSlice.reducer;