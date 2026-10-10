import { useEffect, useMemo } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "../config";
import defaultContent from "../constants/defaultContent";
import { setCapabilitiesData } from "../redux/slice/capabilities/CapabilitiesSlice";
import { setContactData } from "../redux/slice/contact/ContactSlice";
import { setCtaBandData } from "../redux/slice/ctaBand/CtaBandSlice";
import { setFooterData } from "../redux/slice/footer/FooterSlice";
import { setHeroData } from "../redux/slice/hero/HeroSlice";
import { setProcessData } from "../redux/slice/process/ProcessSlice";
import { setProductsData } from "../redux/slice/products/ProductsSlice";
import { setTeamData } from "../redux/slice/team/TeamSlice";
import { setTrainingData } from "../redux/slice/training/TrainingSlice";
import { setWorkData } from "../redux/slice/work/WorkSlice";

// API section name -> [store key, action creator]
const SECTION_ACTIONS = {
  hero: ["hero", setHeroData],
  capabilities: ["capabilities", setCapabilitiesData],
  work: ["work", setWorkData],
  process: ["process", setProcessData],
  team: ["team", setTeamData],
  training: ["training", setTrainingData],
  products: ["products", setProductsData],
  band: ["ctaBand", setCtaBandData],
  contact: ["contact", setContactData],
  footer: ["footer", setFooterData],
};

/**
 * Loads all site content with ONE request and returns the state the sections render from.
 * Bundled default content is used until (or instead of) the API response, so the page is never blank
 * and still works if the API is down or cold-starting.
 */
export function useSiteContent() {
  const dispatch = useDispatch();
  const state = useSelector((s) => s);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}api/content`);
        if (cancelled || !data || typeof data !== "object") return;

        Object.entries(SECTION_ACTIONS).forEach(([apiKey, [, action]]) => {
          const section = data[apiKey];
          if (section && Object.keys(section).length > 0) {
            dispatch(action(section));
          }
        });
      } catch (error) {
        // Keep showing bundled content.
        console.warn("Using bundled site content (API unavailable):", error?.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const globalState = useMemo(() => {
    const merged = { ...state };
    Object.keys(defaultContent).forEach((key) => {
      merged[key] = state[key] ?? defaultContent[key];
    });
    return merged;
  }, [state]);

  return { globalState, dispatch };
}
