import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const capabilitiesSlice = createSlice({
    name: 'capabilitiesSection',
    initialState,
    reducers: {
        setCapabilitiesData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setCapabilitiesData } = capabilitiesSlice.actions;
export default capabilitiesSlice.reducer;