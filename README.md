<div align="center">

# 📊 GH Stats

**Track download counts, analyze release performance, and follow your favorite open-source projects.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Primer Design System](https://img.shields.io/badge/Primer-React-24292e?logo=github)](https://primer.style/react/)
[![Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?logo=biome)](https://biomejs.dev/)

[Features](#-features) • [Quick Start](#-quick-start) • [Environment Variables](#-environment-variables) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

**GH Stats** is a modern, responsive web application built with Next.js and GitHub's Primer Design System. It empowers developers, maintainers, and open-source enthusiasts to get instant analytics on GitHub repository releases, track download metrics per asset, inspect version histories, and discover trending software across GitHub.

Whether monitoring release adoption for your own repositories or auditing dependencies, GH Stats provides clear visualizations without requiring complex setup.

---

## ✨ Features

- 📊 **Interactive Release Analytics**:
  - Interactive charts powered by Apache ECharts.
  - Data zoom controls, timeline navigation, and instant chart image export.
  - Highlights highest and lowest performing releases automatically.

- ⚡ **High-Performance Virtualized List**:
  - Seamlessly browse repositories with hundreds of releases and assets using `react-virtuoso`.
  - Detailed asset breakdowns including file size, individual download counts, and direct download links.

- 🔍 **Filtering, Search & Data Export**:
  - Filter out draft releases, pre-releases, or releases without downloadable assets.
  - Instant live search across release tags and titles.
  - One-click export to **CSV** or **JSON** for offline reporting.

- 📝 **Markdown Changelog Modal**:
  - View full GitHub release notes and changelogs rendered with GitHub Flavored Markdown (`remark-gfm`).

- 🔖 **Local Bookmarks & Sidebar**:
  - Bookmark frequent repositories to local storage for quick one-click access.

- 🔥 **Trending Discovery**:
  - Discover popular open-source repositories trending across GitHub with customizable time windows.

- 👤 **Owner & Organization Profiles**:
  - View all public repositories for any GitHub user or organization (`/[owner]`).

- 🔑 **API Rate Limit Monitor & PAT Support**:
  - Real-time GitHub API rate-limit meter in the navigation bar.
  - Add your personal GitHub Token (PAT) directly in the UI to increase rate limits from 60 to 5,000 requests/hour.

- 🎨 **Primer Native Design**:
  - Official GitHub Primer design language with full support for Light, Dark, and Auto system theme switching.

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router, Server & Client Components) |
| **UI Library** | [React 19](https://react.dev/) |
| **Design System** | [Primer React](https://primer.style/react/) & [Octicons](https://primer.style/foundations/icons/) |
| **Data Visualization** | [Apache ECharts](https://echarts.apache.org/) & `echarts-for-react` |
| **State & Fetching** | [SWR](https://swr.vercel.app/) & [@octokit/rest](https://github.com/octokit/rest.js) |
| **List Virtualization** | [React Virtuoso](https://virtuoso.dev/) |
| **Markdown Parsing** | [react-markdown](https://github.com/remarkjs/react-markdown) & `remark-gfm` |
| **Tooling & Linter** | [Biome](https://biomejs.dev/) & [TypeScript](https://www.typescriptlang.org/) |
| **Testing** | [Playwright](https://playwright.dev/) (End-to-End testing) |

---

## 🚀 Quick Start

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x, 20.x, or later recommended)
- `npm`, `pnpm`, or `yarn`

### 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/zwwuu/gh-stats.git
cd gh-stats

# Install dependencies
npm install
```

### 3. Configure Environment

Copy the example environment configuration:

```bash
cp .env.example .env
```

Edit `.env` to configure application settings (see [Environment Variables](#-environment-variables)).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Default / Example |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_TITLE` | Application title displayed in header and metadata | `"GH Stats"` |
| `NEXT_PUBLIC_APP_DESCRIPTION` | App description for SEO and banner headers | `"Track download counts..."` |
| `NEXT_PUBLIC_APP_URL` | Canonical base URL of the site | `https://ghstats.xyz` |
| `NEXT_PUBLIC_GITHUB_URL` | Link to the project's source repository | `https://github.com/zwwuu/gh-stats` |
| `NEXT_PUBLIC_USE_MOCK` | Enable local mock data instead of calling live GitHub API | `true` or `false` |
| `NEXT_PUBLIC_GTM_ID` | Optional Google Tag Manager Container ID | `G-XXXXXXXXXX` |

> [!TIP]
> When developing locally or running automated tests, set `NEXT_PUBLIC_USE_MOCK=true` to prevent hitting GitHub unauthenticated rate limits.
>
> Mock mode is powered by [Mock Service Worker](https://mswjs.io/) (`mock/handlers.ts`), which intercepts GitHub API requests at the network layer. The app code runs unchanged — no mock branches — so mocks exercise the real data-fetching path. Handlers personalize responses from URL params (e.g. any `/repos/:owner/:repo` renders its own identity), paginate releases with `Link` headers like the real API, and visiting `/notfound/anything` simulates a 404. After `npm install`, run `npx msw init public/` once to (re)generate the service worker file.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server on `http://localhost:3000` |
| `npm run build` | Compiles and builds the production bundle |
| `npm run start` | Runs the built production server |
| `npm run preview` | Builds and immediately runs the production server |
| `npm run lint` | Formats and lints code using Biome |
| `npm run typecheck` | Validates TypeScript types across the project (`tsc --noEmit`) |
| `npm run check` | Runs both Biome linting and TypeScript checks |
| `npm run e2e` | Runs Playwright end-to-end test suite |

---

## 📂 Project Structure

```text
gh-stats/
├── e2e/                     # Playwright end-to-end tests
├── mock/                    # Mock responses for offline development
├── public/                  # Static assets and favicons
├── src/
│   ├── app/                 # Next.js App Router pages and metadata routes
│   │   ├── [owner]/         # Owner/organization repository listing
│   │   │   └── [repo]/      # Repository stats and release analytics
│   │   ├── about/           # About page
│   │   ├── contact-us/      # Contact information page
│   │   ├── privacy-policy/  # Privacy policy
│   │   ├── terms-of-service/# Terms of service
│   │   ├── layout.tsx       # Root layout with Primer theme provider
│   │   └── page.tsx         # Home page with search and trending grid
│   ├── components/          # Reusable UI & feature components
│   │   ├── features/        # Business logic components (StatChart, ReleaseList, etc.)
│   │   ├── layout/          # Navbar, Footer, Page layout containers
│   │   └── ui/              # Atom-level UI primitives & buttons
│   ├── contexts/            # React contexts (Theme, Settings, Bookmarks)
│   └── lib/                 # Octokit client, formatters, and utilities
├── biome.json               # Biome linter and formatter configuration
├── playwright.config.ts     # Playwright configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Ensure linting and type checks pass:
   ```bash
   npm run check
   ```
4. Commit your changes (`git commit -m 'Add amazing feature'`).
5. Push to the branch (`git push origin feature/amazing-feature`).
6. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
