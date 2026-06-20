export const TOKENS = {
  slate: "#13131F",
  slateMid: "#1A1A33",
  slateDeep: "#0C0C16",
  emerald: "#5629F2",
  emeraldBright: "#9203E9",
  emeraldDim: "#2427E1",
  paper: "#F5F5FA",
  paperDim: "#E9E8F5",
  ink: "#13131F",
  mutedInk: "#5C5C72",
};

export const NAV_LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const MARQUEE_ITEMS = [
  { label: "AI / ML", text: "model training & deployment" },
  { label: "Mobile", text: "React Native + Expo" },
  { label: "Backend", text: "FastAPI · Node.js" },
  { label: "Cloud", text: "AWS · Render · Supabase" },
  { label: "Web", text: "React · Next.js" },
  { label: "Research", text: "academic & startup prototypes" },
];

export const CAPABILITIES = [
  {
    icon: "◧",
    title: "AI & Machine Learning",
    desc: "Custom computer vision and classification models, trained on your data and shipped as production-ready TensorFlow Lite or cloud endpoints.",
    tags: ["TensorFlow", "PyTorch", "Computer Vision"],
    image: "https://www.trentonsystems.com/hs-fs/hubfs/Machine_Learning%20.jpeg?width=8082&name=Machine_Learning%20.jpeg"
  },
  {
    icon: "▱",
    title: "Mobile App Development",
    desc: "Cross-platform Android & iOS apps in React Native — camera, offline storage, push notifications, and polished native-feeling UI.",
    tags: ["React Native", "Expo", "iOS / Android"],
    image: "https://riseuplabs.com/wp-content/uploads/2021/07/mobile-application-development-guidelines-riseuplabs.jpg"
  },
  {
    icon: "⌁",
    title: "Backend & API Development",
    desc: "Secure, documented REST APIs with authentication, database design, and cloud deployment — built to scale from prototype to production.",
    tags: ["FastAPI", "Node.js", "PostgreSQL"],
    image: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1709193955/catalog/1627772047465345024/wdojcqwjjbny1wfduvhj.webp"
  },
  {
    icon: "◫",
    title: "Cloud & Database Architecture",
    desc: "Cost-optimised infrastructure on AWS, Render, Supabase and Firebase — we pick the stack that fits your scale, not the most expensive one.",
    tags: ["AWS", "Firebase", "Supabase"],
    image: "https://www.exasol.com/app/uploads/2025/06/thumbnail-hub-data-warehouse-architecture-960x624.jpg"
  },
  {
    icon: "◬",
    title: "Web Development",
    desc: "Marketing sites, dashboards, and internal tools built in React and Next.js — fast, accessible, and easy for your team to maintain.",
    tags: ["React", "Next.js", "Design Systems"],
    image: "https://midriffinfosolution.org/wp-content/uploads/2022/03/web-development.jpg"
  },

];

export const WORK_PROJECTS = [
  {
    status: "In progress",
    statusClass: "status-progress",
    title: "Fish Freshness Indicator App",
    desc: "An AI-powered mobile app that assesses fish freshness from eye and gill photographs — built for a fisheries research conference, from dataset collection through to a working Android prototype.",
    stack: ["TensorFlow Lite", "React Native", "FastAPI", "PostgreSQL"],
  },
  {
    status: "Live",
    statusClass: "status-live",
    title: "Internal Delivery Platform",
    desc: "TNova's own client dashboard for project tracking, milestone sign-off, and document delivery — used to run every engagement we take on.",
    stack: ["Next.js", "Supabase", "Tailwind"],
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Scope & Quote",
    desc: "We turn your brief into a fixed-scope quotation with module-by-module pricing — so you know exactly what you're paying for before work starts.",
  },
  {
    n: "02",
    title: "Build in Milestones",
    desc: "Work is delivered in 3–4 milestones, each tied to a working deliverable: a trained model, a live API, a testable app build.",
  },
  {
    n: "03",
    title: "Test in the Real World",
    desc: "Before final delivery, we validate against real conditions — field tests, user testing, or load testing, depending on the product.",
  },
  {
    n: "04",
    title: "Hand Off & Support",
    desc: "You get full source code, documentation, and 30 days of post-launch support — no vendor lock-in, no black boxes.",
  },
];

export const TEAM_LEADERS = [
  {
    initials: "TM",
    name: "Thepakar Murugesan",
    role: "Founder & Chief Executive Officer",
    bio: "Leads client strategy, project scoping, and delivery across every TNova engagement — the first and last point of contact for every client.",
  },
  {
    initials: "NK",
    name: "Naresh Krishna",
    role: "Co-Founder & Director",
    bio: "Owns technical architecture and engineering delivery — from mobile apps and backend systems to machine learning pipelines.",
  },
];

export const CONTACT_INFO = [
  {
    icon: "✉",
    label: "Email",
    value: "info@tnovasolutions.com",
    href: "mailto:info@tnovasolutions.com",
  },
  {
    icon: "☎",
    label: "Phone",
    value: "+91 99448 80268",
    href: "tel:+919944880268",
  },
  {
    icon: "◉",
    label: "Location",
    value: "Tamil Nadu, India",
  },
];

export const CTA_BAND = {
  title: "Have a build in mind?",
  subtitle: "Tell us what you're building — we'll send back a scoped quotation within 48 hours.",
  primary: { text: "Start a project →", href: "#contact" },
  secondary: { text: "Email us directly", href: "mailto:contact@tnovasolutions.com" },
};

export const FOOTER_DATA = {
  brand: {
    name: "TNova Solutions",
    tagline: "Innovate · Integrate · Elevate",
  },
  services: [
    { label: "AI & Machine Learning", href: "#capabilities" },
    { label: "Mobile Apps", href: "#capabilities" },
    { label: "Backend & APIs", href: "#capabilities" },
    { label: "Web Development", href: "#capabilities" },
  ],
  company: [
    { label: "Our Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],
  contact: [
    { label: "contact@tnovasolutions.com", href: "mailto:contact@tnovasolutions.com" },
    { label: "+91 99448 80268", href: "tel:+919944880268" },
    { label: "Tamil Nadu, India" },
  ],
  copyright: "© 2026 TNova Solutions Pvt Ltd. All rights reserved.",
  website: "www.tnovasolutions.com",
};

export default {
  TOKENS,
  NAV_LINKS,
  MARQUEE_ITEMS,
  CAPABILITIES,
  WORK_PROJECTS,
  PROCESS_STEPS,
  TEAM_LEADERS,
  CONTACT_INFO,
  CTA_BAND,
  FOOTER_DATA,
};
