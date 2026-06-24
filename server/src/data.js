const Hero = {
    content: [{
        head: {
            title: "We build software that",
            accent: "ships."
        },
        sub: {
            content: `TNova Solutions designs and builds mobile apps, backend systems, and machine learning products for teams who need a technical partner that owns delivery end-to-end — not just code.`
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
    title: "What we do",
    head: "Five service lines, one team that ships the whole stack.",
    subHead: `  We don't hand off between specialists — the same team that trains your model builds the app it runs on, and the API that connects them.`,
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



// Export both at once
module.exports = { Hero, Capabilities };