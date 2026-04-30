# Requirements: API-Pulse

**Defined:** 2026-04-30
**Core Value:** A zero-hosting-cost, self-updating API directory powered by a flat-file database and Gemini 3 Flash.

## v1 Requirements

### Scraper

- [ ] **SCRP-01**: Playwright script crawls GitHub and public directories for API endpoints
- [ ] **SCRP-02**: Identify 50+ public APIs
- [ ] **SCRP-03**: Auto-fix selectors and retry if blocked or structure changes

### Analyzer

- [ ] **ANAL-01**: Integrate Gemini 3 Flash Free Tier
- [ ] **ANAL-02**: Extract JSON metadata (Provider, Owner, Auth Type, Documentation Link)
- [ ] **ANAL-03**: Save data to `data.json` flat-file

### Validator

- [ ] **VALD-01**: Async Python checker to verify endpoint 200 OK status
- [ ] **VALD-02**: Measure and record response latency
- [ ] **VALD-03**: Update `last_checked` and `status` fields in `data.json`

### Frontend

- [ ] **UI-01**: React/Vite/Tailwind static site dashboard
- [ ] **UI-02**: "High-Octane" dark-mode UI with Neon accents
- [ ] **UI-03**: Card-based layout with glassmorphism components
- [ ] **UI-04**: Search and Category filters connected to `data.json`

### Infrastructure

- [ ] **INFR-01**: Auto-deployment configuration for GitHub Pages via GitHub Actions
- [ ] **INFR-02**: Trigger a Git Push to invoke Code Rabbit for PR review

## v2 Requirements

- None currently defined.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Paid API LLMs | Must maintain zero operating costs using Free Tier |
| Backend Database | Flat-file `data.json` is sufficient and guarantees zero hosting costs |
| Traditional Web Hosting | GitHub Pages is free and integrates seamlessly with Actions |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SCRP-01 | Phase 1 | Pending |
| SCRP-02 | Phase 1 | Pending |
| SCRP-03 | Phase 1 | Pending |
| ANAL-01 | Phase 1 | Pending |
| ANAL-02 | Phase 1 | Pending |
| ANAL-03 | Phase 1 | Pending |
| VALD-01 | Phase 2 | Pending |
| VALD-02 | Phase 2 | Pending |
| VALD-03 | Phase 2 | Pending |
| UI-01 | Phase 3 | Pending |
| UI-02 | Phase 3 | Pending |
| UI-03 | Phase 3 | Pending |
| UI-04 | Phase 3 | Pending |
| INFR-01 | Phase 4 | Pending |
| INFR-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-30*
*Last updated: 2026-04-30 after initial definition*
