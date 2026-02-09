# Pulse Atlas

A lightweight, zero-build conflict observatory that renders a strategic overview of global conflict
theaters with interactive analysis, risk metrics, and a live intelligence feed powered by real data.

## Features

- **14 active conflict zones** with detailed data: casualties, displaced populations, key actors,
  recent events, and 12-month risk trends
- **Live data from open APIs** — automatically fetches real conflict event data from UCDP and
  humanitarian reports from ReliefWeb, with graceful fallback to curated static data
- **Animated pulsing map markers** sized and colored by risk intensity, with connection arcs between
  related theaters
- **Slide-in detail panel** — click any conflict for a deep-dive view with risk gauge, trend
  sparkline, event timeline, actor tags, and links to related conflicts
- **Live intelligence feed** mixing ReliefWeb humanitarian reports (with LIVE tag) and curated
  events, sorted chronologically, with click-through to source reports
- **5-card stats bar** with animated counters: active theaters, high risk count, total displaced,
  estimated casualties, and composite risk index
- **Priority watchlist table** with sortable columns, inline sparkline charts, and row selection
- **Full-text search** across conflict names, summaries, and actor names
- **Multi-axis filters**: region, intensity level, status, and timeline range slider
- **Canvas sparklines** (no chart library needed) for risk trends in both the table and detail panel
- **Data source indicators** showing what's live vs static, with refresh button and localStorage
  caching
- **Keyboard shortcuts**: Escape to close detail panel
- **Responsive** down to mobile

## Data sources

| Source | What it provides | Auth required |
|---|---|---|
| [UCDP GED](https://ucdp.uu.se/) | Georeferenced conflict events with fatality counts | None (open API) |
| [ReliefWeb](https://reliefweb.int/) | Humanitarian situation reports and updates | `appname` parameter |

Data is fetched on page load, cached in localStorage for 1 hour, and can be manually refreshed.
If APIs are unreachable (CORS blocked, rate limited, offline), the app falls back to curated static
data seamlessly.

## Run locally

Open `src/index.html` in a browser. The app uses Leaflet and Inter font via CDN — no build step
required. Live data fetching happens automatically via browser `fetch()`.
