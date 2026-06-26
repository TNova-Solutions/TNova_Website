// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

import { capabilitiesSlice } from '../slice/CapabilitiesSlice';
import { contactSlice } from '../slice/ContactSlice';
import { ctaBandSlice } from '../slice/CtaBandSlice';
import { footerSlice } from '../slice/FooterSlice';
import { heroSlice } from '../slice/HeroSlice';
import { processSlice } from '../slice/ProcessSlice';
import { teamSlice } from '../slice/TeamSlice';
import { userSlice } from '../slice/UserSlice';
import { workSlice } from '../slice/WorkSlice';

export const store = configureStore({
  reducer: {

    capabilities: capabilitiesSlice.reducer,
    contact: contactSlice.reducer,
    ctaBand: ctaBandSlice.reducer,
    footer: footerSlice.reducer,
    hero: heroSlice.reducer,
    process: processSlice.reducer,
    team: teamSlice.reducer,
    work: workSlice.reducer,
    user: userSlice.reducer
  },
});