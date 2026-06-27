import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const teamSlice = createSlice({
    name: 'teamSection',
    initialState,
    reducers: {
        setTeamData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setTeamData } = teamSlice.actions;
export default teamSlice.reducer;