import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const contactSlice = createSlice({
    name: 'contactSection',
    initialState,
    reducers: {
        setContactData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setContactData } = contactSlice.actions;
export default contactSlice.reducer;