import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const ctaBandSlice = createSlice({
    name: 'ctaBandSection',
    initialState,
    reducers: {
        setCtaBand: (state, action) => {
            return action.payload;
        },
    }
});

export const { setCtaBand } = ctaBandSlice.actions;
export default ctaBandSlice.reducer;