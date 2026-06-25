import { useEffect } from 'react'
import "./styles/global.css";
import Nav from "./components/sections/nav/Nav";
import Hero from "./components/sections/hero/Hero";
import Marquee from "./components/sections/marquee/Marquee";
import Capabilities from "./components/sections/capabilities/Capabilities";
import Work from "./components/sections/work/Work";
import Process from "./components/sections/process/Process";
import Team from "./components/sections/team/Team";
import CtaBand from "./components/sections/ctaBand/CtaBand";
import Contact from "./components/sections/contact/Contact";
import Footer from "./components/sections/footer/Footer";
import { useSelector, useDispatch } from 'react-redux';

/**
 * TNova Solutions — marketing site.
 *
 * Layout is a single scrolling page; each section is its own component
 * under components/sections/. Shared, reusable pieces (logo mark, reveal
 * animation, counter, terminal) live under components/ui/. Brand colours
 * and copy live under constants/ — edit those files to update content
 * without touching component logic.
 */
export default function App() {
  /**
   * Here we are getting data from the store and updated in globalState variable
   * globalState - object have all the api response
   * dispatch - function dispatch the api response to store
   * passing to all the components directly destructure global state and dispatch function from the component
   */
  const dispatch = useDispatch()
  const globalState = useSelector((state) => state);
  console.log("globalState", globalState);
  return (
    <div className="tnova-root">
      <Nav globalState={globalState} dispatch={dispatch} />
      <Hero globalState={globalState} dispatch={dispatch} />
      <Marquee globalState={globalState} dispatch={dispatch} />
      <Capabilities globalState={globalState} dispatch={dispatch} />
      <Work globalState={globalState} dispatch={dispatch} />
      <Process globalState={globalState} dispatch={dispatch} />
      <Team globalState={globalState} dispatch={dispatch} />
      <CtaBand globalState={globalState} dispatch={dispatch} />
      <Contact globalState={globalState} dispatch={dispatch} />
      <Footer globalState={globalState} dispatch={dispatch} />
    </div>
  );
}
