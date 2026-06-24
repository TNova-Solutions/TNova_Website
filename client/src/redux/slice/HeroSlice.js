import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const heroSlice = createSlice({
    name: 'heroSection',
    initialState,
    reducers: {
        setHeroData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setHeroData } = heroSlice.actions;
export default heroSlice.reducer;