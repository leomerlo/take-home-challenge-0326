# Augur Security — Threat Intelligence Dashboard

> Frontend Engineering Take-Home Assignment

## Overview

**Threat Intelligence Dashboard** displays, filters, and explores threat indicators (malicious IPs, domains, file hashes, URLs).

## See it in action
Visit [link] to see it in action

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

## What To Build

Refer to the assignment document for full requirements. In short:

1. **Dashboard layout** — Sidebar navigation, page header, stats row, data table, detail panel
2. **Data table** — Fetch and display indicators with sorting by column
3. **Filtering** — Search input + severity/type/source dropdowns
4. **Detail panel** — Click a row to show full indicator details in a side panel
5. **State management** — Loading, error, and empty states
6. **Pagination** — Navigate through the full dataset

## Testing

```bash
npm test          # Run tests
npm run test:ui   # Run with Vitest UI
```

The project includes Vitest + React Testing Library. Write tests for your key components and hooks.

## Submission

1. Ensure `npm install && npm run dev` works cleanly
2. Ensure `npm test` passes
3. Add your notes below, then zip the project (excluding `node_modules`)

---

### Candidate Notes

1. In case the current design system is using CSS vars, I opted out of moving the values into tailwind's theme and used the vars with tailwinds.
2. I used TanStack Query for data fetching to bring this assignment closer to a production-ready implementation, with caching and robust loading/error handling.
3. Added sorting on the server side, even though the mock only showed filtering on Indicator and Last Seen, it seemed prudent to create the feature for all columns.