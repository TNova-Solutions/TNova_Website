import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Capabilities from "./components/sections/capabilities/Capabilities";
import Contact from "./components/sections/contact/Contact";
import CtaBand from "./components/sections/ctaBand/CtaBand";
import Footer from "./components/sections/footer/Footer";
import Hero from "./components/sections/hero/Hero";
import Marquee from "./components/sections/marquee/Marquee";
import Nav from "./components/sections/nav/Nav";
import Process from "./components/sections/process/Process";
import Products from "./components/sections/products/Products";
import Team from "./components/sections/team/Team";
import Training from "./components/sections/training/Training";
import Work from "./components/sections/work/Work";
import { useSiteContent } from "./hooks/useSiteContent";
import NotFoundPage from "./pages/NotFoundPage";

function HomePage({ globalState, dispatch }) {
  return (
    <div className="tnova-root">
      <Nav globalState={globalState} dispatch={dispatch} />
      <main>
        <Hero globalState={globalState} dispatch={dispatch} />
        <Marquee globalState={globalState} dispatch={dispatch} />
        <Capabilities globalState={globalState} dispatch={dispatch} />
        <Work globalState={globalState} dispatch={dispatch} />
        <Training globalState={globalState} dispatch={dispatch} />
        <Products globalState={globalState} dispatch={dispatch} />
        <Process globalState={globalState} dispatch={dispatch} />
        <Team globalState={globalState} dispatch={dispatch} />
        <CtaBand globalState={globalState} dispatch={dispatch} />
        <Contact globalState={globalState} dispatch={dispatch} />
      </main>
      <Footer globalState={globalState} dispatch={dispatch} />
    </div>
  );
}

/**
 * TNova Solutions marketing site: a single scrolling page, one section component per block under
 * components/sections/. All copy comes from the API (/api/content) and falls back to
 * constants/defaultContent.js, which is generated from server/src/db/data.js (`npm run sync:content`).
 */
export default function App() {
  const { globalState, dispatch } = useSiteContent();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage globalState={globalState} dispatch={dispatch} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
