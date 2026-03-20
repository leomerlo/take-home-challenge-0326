# Augur Security — Threat Intelligence Dashboard

> Frontend Engineering Take-Home Assignment - Leandro Merlo - merloleandro@gmail.com

## Overview

**Threat Intelligence Dashboard** displays, filters, and explores threat indicators (malicious IPs, domains, file hashes, URLs).

## Git repo

https://github.com/leomerlo/take-home-challenge-0326

## Quick Start

```bash
npm install
npm run dev
```

This starts both the React dev server (`localhost:5173`) and the mock API (`localhost:3001`). The Vite dev server proxies `/api/*` requests to the API automatically.

-----

## API Documentation

Base URL: `http://localhost:3001` (proxied to `/api` in dev)

| Endpoint | Method | Description |
|---|---|---|
| `/api/indicators` | GET | Paginated indicator list |
| `/api/indicators/:id` | GET | Single indicator details |
| `/api/stats` | GET | Summary statistics |

### Query Parameters for `/api/indicators`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page (max 100) |
| `severity` | string | — | Filter: `critical`, `high`, `medium`, `low` |
| `type` | string | — | Filter: `ip`, `domain`, `hash`, `url` |
| `search` | string | — | Partial match on value, source, or tags |

### Response Shape

```json
{
  "data": [
    {
      "id": "uuid",
      "value": "185.220.101.34",
      "type": "ip",
      "severity": "critical",
      "source": "AbuseIPDB",
      "firstSeen": "2025-11-08T14:22:00.000Z",
      "lastSeen": "2026-02-03T19:45:00.000Z",
      "tags": ["tor-exit", "botnet"],
      "confidence": 94
    }
  ],
  "total": 500,
  "page": 1,
  "totalPages": 25
}
```

## Project Structure

```
├── design-reference.html   ← Visual spec (open in browser)
├── server/
│   ├── index.js            ← Express API server
│   └── data.js             ← Mock data generator (500 indicators)
├── src/
│   ├── api/                ← Your API client functions
│   ├── components/         ← Your React components
│   ├── hooks/              ← Your custom hooks
│   ├── styles/             ← Your stylesheets
│   │   └── global.css      ← Base reset (extend as needed)
│   ├── types/
│   │   └── indicator.ts    ← TypeScript interfaces (provided)
│   ├── App.tsx             ← Entry component (start here)
│   └── main.tsx            ← React bootstrap
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Testing

```bash
npm test          # Run tests
```

---

### Candidate Notes

1. In case the current design system is using CSS vars, I opted out of moving the values into tailwind's theme and used the vars with tailwinds.
2. I used TanStack Query for data fetching to bring this assignment closer to a production-ready implementation, with caching and robust loading/error handling.
3. Added sorting on the server side, even though the mock only showed filtering on Indicator and Last Seen, it seemed prudent to create the feature for all columns.
4. On branch `design-system-update`, I reviewed the design system and unified typography tokens (CSS variables / design tokens) so font sizes, weights, and line heights are standardized across the UI.