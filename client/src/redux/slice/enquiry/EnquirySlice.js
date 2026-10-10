import { createSlice } from '@reduxjs/toolkit';

// Which enquiry type the contact form should preselect (set by "Request a trainer", "Request a demo", ...).
export const enquirySlice = createSlice({
    name: 'enquirySection',
    initialState: { interest: 'project', role: '' },
    reducers: {
        setInterest: (state, action) => {
            state.interest = action.payload || 'project';
        },
        setRole: (state, action) => {
            state.role = action.payload || '';
        },
    },
});

export const { setInterest, setRole } = enquirySlice.actions;
export default enquirySlice.reducer;
