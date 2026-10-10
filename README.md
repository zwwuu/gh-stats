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

# One-time setup: env file, MSW service worker, Playwright browsers
npm run setup
```

### 3. Configure Environment

Copy the example environment configuration (already done by `npm run setup`, safe to re-run — it never overwrites an existing `.env`):

```bash
npm run env:init
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
| `NEXT_PUBLIC_GTM_ID` | Optional Google Tag Manager Container ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GITHUB_URL` | Link to the project's source repository | `https://github.com/zwwuu/gh-stats` |
| `NEXT_PUBLIC_USE_MOCK` | Enable local mock data instead of calling live GitHub API | `true` or `false` |

> [!TIP]
> When developing locally or running automated tests, set `NEXT_PUBLIC_USE_MOCK=true` to prevent hitting GitHub unauthenticated rate limits.
>
> Mock mode is powered by [Mock Service Worker](https://mswjs.io/) (`mock/handlers.ts`), which intercepts GitHub API requests at the network layer. The app code runs unchanged — no mock branches — so mocks exercise the real data-fetching path. Handlers personalize responses from URL params (e.g. any `/repos/:owner/:repo` renders its own identity), paginate releases with `Link` headers like the real API, and visiting `/notfound/anything` simulates a 404. After `npm install`, run `npm run msw:init` once to (re)generate the service worker file.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run build` | Compiles and builds the production bundle |
| `npm run check` | Runs Biome lint (check-only) and TypeScript checks — CI-safe |
| `npm run clean` | Removes the `.next` build cache |
| `npm run dev` | Starts the Next.js development server on `http://localhost:3000` |
| `npm run e2e` | Runs Playwright end-to-end suite against MSW mocks |
| `npm run e2e:install` | One-time download of Playwright browsers |
| `npm run e2e:ui` | Runs Playwright with the interactive UI for debugging tests |
| `npm run env:init` | One-time copy of `.env.example` to `.env` (never overwrites) |
| `npm run msw:init` | One-time (re)generation of the MSW service worker in `public/` |
| `npm run setup` | One-time project setup: `env:init` + `msw:init` + `e2e:install` |
| `npm run lint` | Checks formatting and lint with Biome (no writes) |
| `npm run lint:fix` | Formats and lints code with Biome, applying safe fixes |
| `npm run preview` | Builds and immediately runs the production server |
| `npm run start` | Runs the built production server |
| `npm run test` | Alias for `npm run e2e` |
| `npm run typecheck` | Validates TypeScript types across the project (`tsc --noEmit`) |

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
