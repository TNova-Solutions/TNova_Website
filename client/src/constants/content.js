export const NAV_LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const TERMINAL_LINES = [
  { text: "$ tnova deploy --env=production", colorVar: "--tn-text" },
  { text: "> Training model... mobilenet_v2", colorVar: "--tn-muted" },
  { text: "> Build complete in 1.4s", colorVar: "--emerald-bright" },
  { text: "> Tests passed: 186 / 186", colorVar: "--emerald-bright" },
  { text: "> Deployed to production ✓", colorVar: "--emerald-dim-accent" },
];

export const CIRCUIT_PULSES = [
  // Horizontal Pulses (evenly spaced)
  { type: "h", pos: "8%", delay: "1.5s", duration: "5.8s", colorVar: "--emerald-dim" },
  { type: "h", pos: "22%", delay: "0.8s", duration: "7.5s", colorVar: "--emerald-bright" },
  { type: "h", pos: "36%", delay: "2.4s", duration: "7.2s", colorVar: "--emerald-dim" },
  { type: "h", pos: "50%", delay: "0s", duration: "6.5s", colorVar: "--emerald-bright" },
  { type: "h", pos: "64%", delay: "3.7s", duration: "6.2s", colorVar: "--emerald-dim" },
  { type: "h", pos: "78%", delay: "5.2s", duration: "6.8s", colorVar: "--emerald-bright" },
  { type: "h", pos: "92%", delay: "4.1s", duration: "6s", colorVar: "--emerald-bright" },

  // Vertical Pulses (evenly spaced)
  { type: "v", pos: "6%", delay: "2.1s", duration: "5.5s", colorVar: "--emerald-bright" },
  { type: "v", pos: "14%", delay: "4.5s", duration: "7.8s", colorVar: "--emerald-dim" },
  { type: "v", pos: "22%", delay: "0.4s", duration: "6.1s", colorVar: "--emerald-bright" },
  { type: "v", pos: "30%", delay: "2.8s", duration: "5.9s", colorVar: "--emerald-dim" },
  { type: "v", pos: "38%", delay: "1.7s", duration: "6.6s", colorVar: "--emerald-bright" },
  { type: "v", pos: "46%", delay: "1.1s", duration: "7s", colorVar: "--emerald-dim" },
  { type: "v", pos: "54%", delay: "3.3s", duration: "6.4s", colorVar: "--emerald-bright" },
  { type: "v", pos: "62%", delay: "2.1s", duration: "5.5s", colorVar: "--emerald-bright" },
  { type: "v", pos: "70%", delay: "4.5s", duration: "7.8s", colorVar: "--emerald-dim" },
  { type: "v", pos: "78%", delay: "0.4s", duration: "6.1s", colorVar: "--emerald-bright" },
  { type: "v", pos: "86%", delay: "2.8s", duration: "5.9s", colorVar: "--emerald-dim" },
  { type: "v", pos: "94%", delay: "1.7s", duration: "6.6s", colorVar: "--emerald-bright" },
];
