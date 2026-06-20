# TNova Solutions — Company Website

A modern, single-page React website for TNova Solutions Pvt Ltd, built with Vite + React 18.

## Design

- **Theme**: Dark Slate (`#1C2526`) + Emerald Green (`#00A86B` / `#00D68F`) — matches the TNova logo exactly
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (labels/eyebrows)
- **Signature element**: An animated ribbon-T mark echoing the real logo, used as a recurring visual motif

## Sections included

1. **Hero** — headline, CTA, live stats
2. **Capability marquee** — scrolling tech stack ticker
3. **Capabilities** — all 6 service lines (AI/ML, Mobile, Backend, Cloud, Web, Research)
4. **Work** — featured projects (Fish Freshness App + internal platform)
5. **Process** — 4-step engagement process
6. **Team** — Thipakar Murugesan (Founder & CEO) and Naresh Krishna (Co-Founder & Director)
7. **CTA band** — conversion prompt
8. **Contact** — working contact form + direct contact details
9. **Footer** — full sitemap + contact

## Running locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) in your browser.

## Building for production

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy anywhere (Vercel, Netlify, Render Static Sites,
GitHub Pages, or your own hosting).

## Deploying — easiest options

### Vercel (recommended, free tier)
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Vercel auto-detects Vite — click Deploy
4. Add your domain (e.g. tnovasolutions.com) in Project Settings → Domains

### Netlify (also free)
1. Push to GitHub
2. netlify.com → Add new site → Import from Git
3. Build command: `npm run build`, publish directory: `dist`
4. Add custom domain in Site Settings → Domain management

## Editing content

All content lives in `src/TNovaWebsite.jsx` — it's a single file by design so it's easy to
search and edit. Look for these sections marked with comments:

- `navLinks` — top navigation items
- The capabilities array inside `<section id="capabilities">` — service descriptions
- The team cards inside `<section id="team">` — founder bios
- `ContactSection` component at the bottom — contact info and form

## Replacing the logo

The actual TNova ribbon-T logo is recreated as an inline SVG component (`RibbonMark`) at the
top of the file, so it stays crisp at any size and matches your brand gradient exactly. If you
want to use the original PNG/AI file instead, replace `<RibbonMark />` usages with an
`<img src="/logo.png" />` tag — the PNG is already included in `public/logo.png`.

## Contact details currently in the site

- Email: info@tnovasolutions.com
- Phone: +91 99448 80268
- Location: Tamil Nadu, India

Update these directly in `src/TNovaWebsite.jsx` (search for the phone number or email) if they change.
