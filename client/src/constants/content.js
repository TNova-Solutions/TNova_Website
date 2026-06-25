export const NAV_LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];


export const WORK_ITEMS = [
  {
    title: "Fish Freshness Indicator App",
    status: "In progress",
    statusType: "progress",
    desc: "An AI-powered mobile app that assesses fish freshness from eye and gill photographs — built for a fisheries research conference, from dataset collection through to a working Android prototype.",
    stack: ["TensorFlow Lite", "React Native", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Internal Delivery Platform",
    status: "Live",
    statusType: "live",
    desc: "TNova's own client dashboard for project tracking, milestone sign-off, and document delivery — used to run every engagement we take on.",
    stack: ["Next.js", "Supabase", "Tailwind"],
  },
];



export const TERMINAL_LINES = [
  { text: "$ tnova deploy --env=production", colorVar: "--tn-text" },
  { text: "> Training model... mobilenet_v2", colorVar: "--tn-muted" },
  { text: "> Build complete in 1.4s", colorVar: "--emerald-bright" },
  { text: "> Tests passed: 186 / 186", colorVar: "--emerald-bright" },
  { text: "> Deployed to production ✓", colorVar: "--emerald-dim-accent" },
];

export const CIRCUIT_PULSES = [
  // Original Pulses
  { type: "h", pos: "16%", delay: "0s", duration: "6.5s", colorVar: "--emerald-bright" },
  { type: "h", pos: "54%", delay: "2.4s", duration: "7.2s", colorVar: "--emerald-dim" },
  { type: "h", pos: "82%", delay: "4.1s", duration: "6s", colorVar: "--emerald-bright" },
  { type: "v", pos: "20%", delay: "1.1s", duration: "7s", colorVar: "--emerald-dim" },
  { type: "v", pos: "76%", delay: "3.3s", duration: "6.4s", colorVar: "--emerald-bright" },

  // New Horizontal Pulses
  { type: "h", pos: "8%", delay: "1.5s", duration: "5.8s", colorVar: "--emerald-dim" },
  { type: "h", pos: "35%", delay: "0.8s", duration: "7.5s", colorVar: "--emerald-bright" },
  { type: "h", pos: "68%", delay: "3.7s", duration: "6.2s", colorVar: "--emerald-dim" },
  { type: "h", pos: "92%", delay: "5.2s", duration: "6.8s", colorVar: "--emerald-bright" },

  // New Vertical Pulses
  { type: "v", pos: "12%", delay: "2.1s", duration: "5.5s", colorVar: "--emerald-bright" },
  { type: "v", pos: "40%", delay: "4.5s", duration: "7.8s", colorVar: "--emerald-dim" },
  { type: "v", pos: "55%", delay: "0.4s", duration: "6.1s", colorVar: "--emerald-bright" },
  { type: "v", pos: "88%", delay: "2.8s", duration: "5.9s", colorVar: "--emerald-dim" },
  { type: "v", pos: "96%", delay: "1.7s", duration: "6.6s", colorVar: "--emerald-bright" }
];
