import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const productsSlice = createSlice({
    name: 'productsSection',
    initialState,
    reducers: {
        setProductsData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setProductsData } = productsSlice.actions;
export default productsSlice.reducer;