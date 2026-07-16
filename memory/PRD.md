# 4-11 Studio — Coming Soon Landing Page (PRD)

## Original Problem Statement
Make a landing page / coming soon page for "4-11 Studio" (ref: https://4eleven.in). Follow-up: make it award-worthy (Awwwards SOTD level) — kinetic hero with masked line reveal, numbered manifesto chapters, editorial marquee, premium motion (framer-motion + lenis), subtle parallax. Reference vibe: https://dzinrstudio.com.

## Brand
4-11 Studio — Mumbai creative agency / "campaign engine" by founders Rohan (Director) & Rubal (Creative). Services: Social Media Marketing, YouTube Strategy & Management, Influencer Activation, Event Production.

## Architecture
- Frontend: React (CRA + craco), TailwindCSS, framer-motion, lenis smooth scroll, react-fast-marquee, sonner toasts.
- Backend: FastAPI + MongoDB (motor). Routes under /api.
- Design: "Industrial Editorial / Brutalist Glamour" — Clash Display + Playfair Display italic + JetBrains Mono + Manrope. Accent #FF3B00. Dark default with light toggle. Grain overlay.

## What's Been Implemented (2026)
- Kinetic hero: parallax industrial background, masked line-by-line reveal (MUMBAI/CAMPAIGN/ENGINE), live countdown (persisted now+110 days via localStorage).
- Numbered manifesto chapters (01–03), editorial marquee, hover-spotlight capabilities list, founders section with parallax portrait.
- "Submit Brief" lead-capture form -> POST /api/briefs; animated "Brands Registered" counter (base 384 + stored briefs) via GET /api/briefs/count.
- Dark/light theme toggle, responsive layout, footer with social placeholders.
- Backend endpoints: POST/GET /api/briefs, GET /api/briefs/count. Validated (422 on bad email/missing fields).
- Fully tested: backend 100%, frontend 100% (iteration_1.json).

## Personas
- Brand/marketer submitting a brief to the studio.
- Founders reviewing captured leads (via GET /api/briefs).

## Backlog / Next
- P1: Simple admin view to browse submitted briefs.
- P1: Email notification on new brief (Resend integration).
- P2: Real founder photos, brand logos marquee, showreel video.
- P2: Configurable launch date + editable copy via CMS/env.
