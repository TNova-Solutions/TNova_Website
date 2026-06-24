// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import heroSlice from '../slice/HeroSlice';
import capabilitiesSlice from '../slice/Capabilities';

export const store = configureStore({
  reducer: {
    hero: heroSlice,
    capabilities: capabilitiesSlice
  },
});