import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const careersSlice = createSlice({
    name: 'careersSection',
    initialState,
    reducers: {
        setCareersData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setCareersData } = careersSlice.actions;
export default careersSlice.reducer;