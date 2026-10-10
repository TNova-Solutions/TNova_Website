
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
        { bold: "Training", rest: "MERN · Java · Python bootcamps" },
        { bold: "Products", rest: "Internal Hub · Interview Platform" },
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
            image: "/assets/capabilities/machineLearning.jpeg",
        },
        {
            icon: "▱",
            title: "Mobile App Development",
            desc: "Cross-platform Android & iOS apps in React Native — camera, offline storage, push notifications, and polished native-feeling UI.",
            tags: ["React Native", "Expo", "iOS / Android"],
            image: "/assets/capabilities/mobileApplicationDevelopment.webp",
        },
        {
            icon: "⌁",
            title: "Backend & API Development",
            desc: "Secure, documented REST APIs with authentication, database design, and cloud deployment — built to scale from prototype to production.",
            tags: ["FastAPI", "Node.js", "PostgreSQL"],
            image: "/assets/capabilities/apiDevelopment.webp",
        },
        {
            icon: "◫",
            title: "Cloud & Database Architecture",
            desc: "Cost-optimised infrastructure on AWS, Render, Supabase and Firebase — we pick the stack that fits your scale, not the most expensive one.",
            tags: ["AWS", "Firebase", "Supabase"],
            image: "/assets/capabilities/cloudDatabaseArchitecture.jpg",
        },
        {
            icon: "◬",
            title: "Web Development",
            desc: "Marketing sites, dashboards, and internal tools built in React and Next.js — fast, accessible, and easy for your team to maintain.",
            tags: ["React", "Next.js", "Design Systems"],
            image: "/assets/capabilities/webDevelopment.jpg",
        },
        {
            icon: "◔",
            title: "Research & Prototyping",
            desc: "Conference-ready demos and proof-of-concept builds for academic and early-stage teams who need to show working software, fast.",
            tags: ["Rapid Prototyping", "PoC", "Academic"],
            image: "/assets/capabilities/researchPrototyping.jpg",
        },
    ]
};

const Work = {
    tag: "Selected work",
    title: "Real builds, real constraints.",
    desc: `A look at what we're currently building — from AI-powered field tools to client product launches.`,
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
    desc: `Every engagement follows the same four stages — scoped, priced, and signed off before the next one starts.`,
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
    desc: `TNova is run by its founders, end to end — from the first client call to the final commit.`,
    founders: [
        {
            initials: "TM",
            image: "/assets/founders/ThepakarMurugesan.png",
            name: "Thepakar Murugesan",
            role: "Founder & Chief Executive Officer",
            bio: "Leads client strategy, project scoping, and delivery across every TNova engagement — the first and last point of contact for every client.",
        },
        {
            initials: "NK",
            image: "/assets/founders/NareshKrishna.jpeg",
            name: "Naresh Krishna",
            role: "Co-Founder & Director",
            bio: "Owns technical architecture and engineering delivery — from mobile apps and backend systems to machine learning pipelines.",
        },
    ]

}

const Band = {
    title: "Have a build — or a team to train — in mind?",
    desc: `Tell us what you need: a product build, a bootcamp, trainers for your campus or company, or a product demo. We reply within 48 hours.`
}
const Contact = {
    tag: "Contact",
    title: "Let's talk about what you're building.",
    desc: `Send a brief or just say hello — Thepakar and Naresh personally review every inquiry.`,
    interests: [
        { value: "project", label: "Build a software project" },
        { value: "training", label: "Bootcamp / training programme" },
        { value: "trainer", label: "Hire trainers for my college or company" },
        { value: "internal-hub", label: "TNova Internal Hub demo" },
        { value: "interview-platform", label: "TNova Interview Platform demo" },
        { value: "other", label: "Something else" },
    ],
    contact: {
        email: "info@tnovasolutions.com",
        phone: "+91 99448 80268",
        phoneHref: "+919944880268",
        location: "Tamil Nadu, India",
        website: "www.tnovasolutions.com",
    },
}

const Training = {
    tag: "Training & trainers",
    title: "We train developers — and we place trainers where you need them.",
    desc: `TNova runs project-based bootcamps for learners, and supplies working-engineer trainers to colleges and companies that want industry-grade instruction on their own premises.`,
    tracks: [
        {
            title: "MERN Full-Stack",
            desc: "MongoDB, Express, React and Node.js — from first component to a deployed, tested application.",
            tags: ["MongoDB", "Express", "React", "Node.js"],
        },
        {
            title: "Java Full-Stack",
            desc: "Core Java, Spring-based back ends and a modern front end, built around a capstone project.",
            tags: ["Java", "Spring", "SQL", "Frontend"],
        },
        {
            title: "Python Full-Stack",
            desc: "Python, REST APIs and databases with a web front end, including an introduction to applied AI.",
            tags: ["Python", "FastAPI", "PostgreSQL", "React"],
        },
    ],
    trainerService: {
        title: "Trainer provisioning for colleges & companies",
        desc: "Need a trainer for a semester course, a corporate upskilling batch or a short workshop? We assign practising engineers, agree the syllabus and schedule with you up front, and report progress against it.",
        points: [
            "Curriculum agreed with you before the first session",
            "Trainers who build software for a living",
            "On-site, online or hybrid delivery",
            "Hands-on projects and assessments, not slides alone",
        ],
        cta: { label: "Request a trainer", interest: "trainer" },
    },
    bootcampCta: { label: "Enquire about a bootcamp", interest: "training" },
};

// Set liveUrl to a product's public URL to switch its card to an "Open app" button.
// status: "development" | "beta" | "live"
const Products = {
    tag: "Our products",
    title: "Software we build for our own use — and for yours.",
    desc: `Alongside client work, TNova builds products that solve problems we see repeatedly in teams and campuses.`,
    items: [
        {
            title: "TNova Internal Hub",
            status: "In development",
            statusType: "progress",
            desc: "An internal employee and HR platform: one place for people records, day-to-day HR workflows and company communication.",
            highlights: ["Employee directory & profiles", "HR workflows", "Role-based access"],
            interest: "internal-hub",
            liveUrl: "",
        },
        {
            title: "TNova Interview Platform",
            status: "In development",
            statusType: "progress",
            desc: "A structured interview platform covering aptitude, coding, technical and HR rounds, so hiring teams and campuses can run consistent assessments.",
            highlights: ["Aptitude & coding rounds", "Technical & HR rounds", "Consistent scoring"],
            interest: "interview-platform",
            liveUrl: "",
        },
    ],
};

const User = {
    submitMsg: `Your message has been noted. We will get back to you within 48 hours at the email you provide.`,
    submissions: [],
}

const Footer = {
    brandName: "TNova Solutions",
    tagLine: `Innovate · Integrate · Elevate`,
    footerItem: [
        {
            title: "Services",
            footerLink: [
                { link: `AI & Machine Learning`, href: `#capabilities` },
                { link: `Mobile Apps`, href: `#capabilities` },
                { link: `Backend & APIs`, href: `#capabilities` },
                { link: `Web Development`, href: `#capabilities` },
                { link: `Training & Trainers`, href: `#training` },
                { link: `Products`, href: `#products` },
            ]

        },
        {
            title: "Company",
            footerLink: [
                { link: `Our Work`, href: `#work` },
                { link: `Process`, href: `#process` },
                { link: `Team`, href: `#team` },
                { link: `Contact`, href: `#contact` },
            ]

        }
    ],
    footerContact: {
        email: `info@tnovasolutions.com`,
        phone: `+91 99448 80268`,
        phoneHref: `+919944880268`,
        location: 'Tamil Nadu, India'
    },
    footerBottom: {
        copyRights: `© ${year} TNova Solutions Pvt Ltd. All rights reserved.`,
        website: `www.tnovasolutions.com`
    }
}

// Export both at once
module.exports = { Hero, Capabilities, Work, Process, Team, Band, Contact, User, Footer, Training, Products };