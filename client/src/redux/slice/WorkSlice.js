import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const workSlice = createSlice({
    name: 'workSection',
    initialState,
    reducers: {
        setWorkData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setWorkData } = workSlice.actions;
export default workSlice.reducer;