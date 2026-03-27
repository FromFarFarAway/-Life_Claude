# +LIFE Health OS

Personal health intelligence dashboard — a premium dark health-tech prototype built with Next.js.

## Overview

A deployable frontend prototype that visualizes longitudinal health data across nine health categories, with a seeded user profile (Anton Ivanov), real medical data from 2020–2025, and a scripted AI assistant.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4, premium dark visual system
- **Charts:** Recharts with null-safe longitudinal data
- **Data:** Static TypeScript objects — no backend required

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run lint
npm run build
```

## Deploy

```bash
npx vercel@latest --prod
```

No backend, no secrets, no database, no environment variables required.

## Data Assumptions

- This is a **frontend prototype** for product demonstration purposes
- Scores are **transparent product logic**, not clinical decision support or medical-device output
- Missing data is represented as missing (null), not normalized away or converted to zero
- The AI assistant is **scripted** with pre-seeded responses grounded in the dashboard's actual data
- All seeded medical values come from the project specification and are used for prototype logic only
