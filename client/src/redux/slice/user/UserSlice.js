import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const userSlice = createSlice({
    name: 'userSection',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;