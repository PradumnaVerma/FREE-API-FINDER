# API-Pulse: Autonomous Discovery & Validation Engine

## What This Is

A 100% free-to-operate API directory that autonomously crawls GitHub and public directories for API endpoints, validates them, and serves them on a High-Octane dark-mode UI. It leverages Gemini 3 Flash for intelligence and GitHub Actions/Pages for zero-cost operation.

## Core Value

A zero-hosting-cost, self-updating API directory powered by a flat-file database and Gemini 3 Flash.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Scraper module using Python/Playwright to crawl GitHub and extract API metadata
- [ ] Analyzer module using Gemini 3 Flash Free Tier to parse JSON metadata (Provider, Owner, Auth Type, Documentation Link)
- [ ] Validator module (async Python) to check endpoints for 200 OK status and response latency
- [ ] Frontend dashboard built with React/Vite/Tailwind CSS
- [ ] "High-Octane" dark-mode UI with Neon accents, card-based layout, glassmorphism, search and category filters
- [ ] Auto-deployment configuration for GitHub Pages via GitHub Actions
- [ ] Data persistence exclusively through `data.json` flat-file

### Out of Scope

- Paid API LLMs — using Gemini 3 Flash Free Tier to ensure zero operating costs
- Backend databases (Postgres, MongoDB, etc.) — using flat-file `data.json` to ensure zero hosting costs
- Traditional hosting services — deploying entirely on GitHub Pages

## Context

- The project relies on zero-cost infrastructure to maintain operations indefinitely without a budget.
- The workflow relies heavily on autonomous agents and asynchronous scripts for continuous validation.
- The UI needs to feel premium, modern, and dynamic despite being a static site.

## Constraints

- **Database**: Flat-file (`data.json`) — To ensure zero hosting costs.
- **Intelligence**: Gemini 3 Flash Free Tier — To maintain free operation.
- **Deployment**: GitHub Actions + GitHub Pages — For zero-cost hosting and automation.
- **UI Style**: Modern Dark Mode, Neon accents, card-based layout — For a premium user experience.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Flat-file Database | Zero hosting costs requirement | — Pending |
| GitHub Pages | Free static hosting integrated with Actions | — Pending |
| Gemini 3 Flash | Sufficient capability with a free tier | — Pending |

---
*Last updated: 2026-04-30 after initialization*

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
