import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const ctaBandSlice = createSlice({
    name: 'ctaBandSection',
    initialState,
    reducers: {
        setCtaBandData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setCtaBandData } = ctaBandSlice.actions;
export default ctaBandSlice.reducer;