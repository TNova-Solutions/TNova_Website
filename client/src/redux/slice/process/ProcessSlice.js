import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const processSlice = createSlice({
    name: 'processSection',
    initialState,
    reducers: {
        setProcessData: (state, action) => {        
            return action.payload;
        },
    }
});

export const { setProcessData } = processSlice.actions;
export default processSlice.reducer;