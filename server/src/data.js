
const year = new Date().getFullYear();

const Hero = {
    content: [{
        head: {
            title: "We build software that",
            accent: ` ships.` // Notice the space added before 'ships'
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
            image: "https://www.trentonsystems.com/hs-fs/hubfs/Machine_Learning%20.jpeg?width=8082&name=Machine_Learning%20.jpeg",
            url: "https://en.wikipedia.org/wiki/Machine_learning"
        },
        {
            icon: "▱",
            title: "Mobile App Development",
            desc: "Cross-platform Android & iOS apps in React Native — camera, offline storage, push notifications, and polished native-feeling UI.",
            tags: ["React Native", "Expo", "iOS / Android"],
            image: "https://riseuplabs.com/wp-content/uploads/2021/07/mobile-application-development-guidelines-riseuplabs.jpg",
            url: "https://en.wikipedia.org/wiki/Mobile_app_development"
        },
        {
            icon: "⌁",
            title: "Backend & API Development",
            desc: "Secure, documented REST APIs with authentication, database design, and cloud deployment — built to scale from prototype to production.",
            tags: ["FastAPI", "Node.js", "PostgreSQL"],
            image: "https://www.connectinfosoft.com/uploads/post/1319What-is-an-apI-development-definition-types-specifications-documentation-blog.webp",
            url: "https://en.wikipedia.org/wiki/Application_programming_interface"
        },
        {
            icon: "◫",
            title: "Cloud & Database Architecture",
            desc: "Cost-optimised infrastructure on AWS, Render, Supabase and Firebase — we pick the stack that fits your scale, not the most expensive one.",
            tags: ["AWS", "Firebase", "Supabase"],
            image: "https://www.exasol.com/app/uploads/2025/06/thumbnail-hub-data-warehouse-architecture-960x624.jpg",
            url: "https://en.wikipedia.org/wiki/Cloud_computing"
        },
        {
            icon: "◬",
            title: "Web Development",
            desc: "Marketing sites, dashboards, and internal tools built in React and Next.js — fast, accessible, and easy for your team to maintain.",
            tags: ["React", "Next.js", "Design Systems"],
            image: "https://midriffinfosolution.org/wp-content/uploads/2022/03/web-development.jpg",
            url: "https://en.wikipedia.org/wiki/Web_development"
        },
        {
            icon: "◔",
            title: "Research & Prototyping",
            desc: "Conference-ready demos and proof-of-concept builds for academic and early-stage teams who need to show working software, fast.",
            tags: ["Rapid Prototyping", "PoC", "Academic"],
            image: "https://i.ytimg.com/vi/gng3t5IGAI8/maxresdefault.jpg",
            url: "https://en.wikipedia.org/wiki/Prototype"
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

const Team = {
    tag: "Leadership",
    title: "Founded by two people who ship.",
    desc: `TNova is run by its founders, end to end — from the first client call to the
            final commit.`,
    founders: [
        {
            initials: "TM",
            image: "/assets/ThepakarMurugesan.png",
            name: "Thepakar Murugesan",
            role: "Founder & Chief Executive Officer",
            bio: "Leads client strategy, project scoping, and delivery across every TNova engagement — the first and last point of contact for every client.",
        },
        {
            initials: "NK",
            image: "/assets/NareshKrishna.jpeg",
            name: "Naresh Krishna",
            role: "Co-Founder & Director",
            bio: "Owns technical architecture and engineering delivery — from mobile apps and backend systems to machine learning pipelines.",
        },
    ]

}

const Band = {
    title: "Have a build in mind?",
    desc: `Tell us what you're building — we'll send back a scoped quotation within 48
            hours.`
}
const Contact = {
    tag: "Contact",
    title: "Let's talk about what you're building.",
    desc: `Send a brief or just say hello — Thepakar and Naresh personally review every
            inquiry.`,
    contact: {
        email: "info@tnovasolutions.com",
        phone: "+91 99448 80268",
        phoneHref: "+919944880268",
        location: "Tamil Nadu, India",
        website: "www.tnovasolutions.com",
    },
    submitMsg: `Thanks — your message has been noted. We&apos;ll get back to you within 48
                hours at the email you provid.`
}

const Footer = {
    brandName: "TNova Solutions",
    tagLine: `Innovate · Integrate · Elevate`,
    footerItem: [
        {
            title: "Services",
            footerLink: [
                { link: `AI &amp; Machine Learning` },
                { link: `Mobile Apps` },
                { link: `Backend &amp; APIs` },
                { link: `Web Development` },
            ]

        },
        {
            title: "Company",
            footerLink: [
                { link: `Our Work` },
                { link: `Process` },
                { link: `Team` },
                { link: `Contact` },
            ]

        }
    ],
    footerContact: {
        email: `info@tnovasolutions.com"`,
        phone: `+91 99448 80268`,
        location: 'Tamil Nadu, India'
    },
    footerBottom: {
        copyRights: `© ${year} TNova Solutions Pvt Ltd. All rights reserved.`,
        website: `www.tnovasolutions.com`
    }
}

// Export both at once
module.exports = { Hero, Capabilities, Work, Process, Team, Band, Contact, Footer };