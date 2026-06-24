const Hero = {
    content: [{
        head: {
            title: "We build software that",
            accent: "ships."
        },
        subHead: {
            desc: `TNova Solutions designs and builds mobile apps, backend systems, and machine learning products for teams who need a technical partner that owns delivery end-to-end — not just code.`
        }
    }],
    stats: [
        { value: 2026, suffix: "", duration: 1200, label: "Founded", isYear: true },
        { value: 5, suffix: "+", duration: 1000, label: "Service lines" },
        { value: 100, suffix: "%", duration: 1400, label: "In-house delivery" },
        { value: 24, suffix: "/7", duration: 1000, label: "Project visibility" },
    ],
    marquee: [
        { bold: "AI / ML", rest: "model training & deployment" },
        { bold: "Mobile", rest: "React Native + Expo" },
        { bold: "Backend", rest: "FastAPI · Node.js" },
        { bold: "Cloud", rest: "AWS · Render · Supabase" },
        { bold: "Web", rest: "React · Next.js" },
        { bold: "Research", rest: "academic & startup prototypes" },
    ]
};

const Capabilities = {
    tag: "What we do",
    title: "Five service lines, one team that ships the whole stack.",
    desc: `We don't hand off between specialists — the same team that trains your model builds the app it runs on, and the API that connects them.`,
    services: [
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
            image: "https://www.connectinfosoft.com/uploads/post/1319What-is-an-apI-development-definition-types-specifications-documentation-blog.webp"
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
        {
            icon: "◔",
            title: "Research & Prototyping",
            desc: "Conference-ready demos and proof-of-concept builds for academic and early-stage teams who need to show working software, fast.",
            tags: ["Rapid Prototyping", "PoC", "Academic"],
            image: "https://i.ytimg.com/vi/gng3t5IGAI8/maxresdefault.jpg"
        },
    ]
};

const Work = {
    tag: "Selected work",
    title: "Real builds, real constraints.",
    desc: `A look at what we're currently building — from AI-powered field tools to
            client product launches.`,
    workItems: [
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
    ]

}

const Process = {
    tag: "How we work",
    title: "A process built around milestones you can see",
    desc: `Every engagement follows the same four stages — scoped, priced, and signed
            off before the next one starts.`,
    processSteps: [

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

    ]

}
// Export both at once
module.exports = { Hero, Capabilities, Work, Process };