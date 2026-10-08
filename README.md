# Notes — Study Notes Marketplace

> ## Status: 🟡 In Progress
>
> <progress value="78" max="100"></progress>
>
> **Progress: 78%** — Full frontend works and builds; needs the Django backend + Google OAuth client ID to be fully usable

<p align="center">
  <img src="./banner.webp" alt="Notes banner" width="100%" />
</p>

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

## What it is

A study-notes marketplace web app: students browse, preview, and purchase class notes; creators upload notes and manage their library; admins get a dashboard for users, purchases, and content. The frontend is React + Vite with Tailwind and Framer Motion animations, Google OAuth login, and a PDF viewer for reading notes in the browser. It talks to the [`notes_backend`](../notes_backend) Django REST API (`http://127.0.0.1:8000/api` by default, overridable via `VITE_API_BASE_URL`).

## What works (verified)

- ✅ **Full page set** — Landing, Login, Home, Topics, Grid, PDF viewer, Profile, Purchases, Settings, SetupProfile + admin Dashboard/Login/Purchases
- ✅ **Frontend builds cleanly** — `vite build` verified, outputs working `dist/`
- ✅ **Google OAuth wiring** — `@react-oauth/google` integrated in the login flow
- ✅ **API client layer** — `DataContext.jsx` covers auth, folders, items, purchases, profile (`fetch`-based, token auth)
- ✅ **Admin section** — separate admin login, dashboard, sidebar, purchase management
- ✅ **Vercel config** — `vercel.json` present for one-click deploy

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Auth | Google OAuth 2.0 (`@react-oauth/google`), JWT from backend |
| Data | REST via `fetch` to Django backend (`VITE_API_BASE_URL`) |
| Hosting | Vercel-ready (`vercel.json`) |

## How to run

You need **Node 18+** and the backend running (see `notes_backend`).

```bash
npm install
# point at your backend (optional; defaults to http://127.0.0.1:8000/api)
# VITE_API_BASE_URL=http://127.0.0.1:8000/api
npm run dev      # http://localhost:5173
```

Production build (tested):

```bash
npm run build    # verified working — outputs dist/
npm run preview  # serve the production build locally
```

You'll also need a Google OAuth client ID for the login button to function — the UI renders without it, but sign-in will fail.

## Screenshots

No screenshots are committed in the repo (`notescheck.pdf` is a document, not a screenshot). The banner above is generated.

## What you can add more

- [ ] **Real screenshots / demo GIF** — the landing page is animation-heavy; show it off
- [ ] **Search + filters** — by subject, class, price, rating
- [ ] **Creator payouts** — purchases exist; wire actual money flow (Razorpay/Stripe)
- [ ] **Note previews** — first-N-pages watermarked preview before purchase
- [ ] **Ratings & reviews** — social proof for note quality
- [ ] **Offline reading** — cache purchased PDFs with a service worker

## Project structure

```
├── src/
│   ├── pages/            # Landing, Login, Home, Topics, Grid, Pdf, Profile,
│   │                     # Purchases, Settings, SetupProfile
│   ├── pages/admin/      # AdminSidebar, Dashboard, Login, Purchases
│   ├── components/       # Layout, Sidebar, RightPanel
│   ├── context/          # DataContext.jsx — API client + auth state
│   └── data/dummyData.js # Fallback/demo data
├── banner.webp
├── vercel.json
└── vite.config.js
```

---
*README written after code audit on 2026-10-08.*
