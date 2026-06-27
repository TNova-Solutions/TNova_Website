import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const footerSlice = createSlice({
    name: 'footerSection',
    initialState,
    reducers: {
        setFooterData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setFooterData } = footerSlice.actions;
export default footerSlice.reducer;