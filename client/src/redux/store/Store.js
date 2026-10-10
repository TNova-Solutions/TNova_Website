// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

import { capabilitiesSlice } from '../slice/capabilities/CapabilitiesSlice';
import { contactSlice } from '../slice/contact/ContactSlice';
import { ctaBandSlice } from '../slice/ctaBand/CtaBandSlice';
import { enquirySlice } from '../slice/enquiry/EnquirySlice';
import { footerSlice } from '../slice/footer/FooterSlice';
import { heroSlice } from '../slice/hero/HeroSlice';
import { processSlice } from '../slice/process/ProcessSlice';
import { productsSlice } from '../slice/products/ProductsSlice';
import { teamSlice } from '../slice/team/TeamSlice';
import { trainingSlice } from '../slice/training/TrainingSlice';
// from '../slice/process/ProcessSlice';
import { userSlice } from '../slice/user/UserSlice';
import { workSlice } from '../slice/work/WorkSlice';

export const store = configureStore({
  reducer: {

    capabilities: capabilitiesSlice.reducer,
    contact: contactSlice.reducer,
    ctaBand: ctaBandSlice.reducer,
    enquiry: enquirySlice.reducer,
    footer: footerSlice.reducer,
    hero: heroSlice.reducer,
    process: processSlice.reducer,
    products: productsSlice.reducer,
    training: trainingSlice.reducer,
    team: teamSlice.reducer,
    work: workSlice.reducer,
    user: userSlice.reducer
  },
});