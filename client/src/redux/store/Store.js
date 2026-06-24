// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import heroSlice from '../slice/HeroSlice';
import capabilitiesSlice from '../slice/Capabilities';
import workSlice from '../slice/WorkSlice';
import processSlice from '../slice/ProcessSlice';

export const store = configureStore({
  reducer: {
    hero: heroSlice,
    capabilities: capabilitiesSlice,
    work: workSlice,
    process: processSlice
  },
});