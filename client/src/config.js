// API origin. Set VITE_API_BASE_URL (e.g. in Vercel project settings) to point at your deployed server.
// In development it is empty, so requests go to "/api/..." and Vite proxies them to localhost:5000.
const configured = import.meta.env.VITE_API_BASE_URL;
const fallbackProd = "https://t-nova-website-server.vercel.app";

const origin = configured ?? (import.meta.env.PROD ? fallbackProd : "");

// Always ends with exactly one slash: `${API_BASE_URL}api/content`
export const API_BASE_URL = `${origin.replace(/\/+$/, "")}/`;
