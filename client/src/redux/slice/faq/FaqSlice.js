import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const faqSlice = createSlice({
    name: 'faqSection',
    initialState,
    reducers: {
        setFaqData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setFaqData } = faqSlice.actions;
export default faqSlice.reducer;