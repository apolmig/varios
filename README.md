# Pulse Atlas

A lightweight, zero-build conflict observatory that renders a strategic overview of global conflict
theaters with interactive analysis, risk metrics, and a live intelligence feed.

## Features

- **14 active conflict zones** with detailed data: casualties, displaced populations, key actors,
  recent events, and 12-month risk trends
- **Animated pulsing map markers** sized and colored by risk intensity, with connection arcs between
  related theaters
- **Slide-in detail panel** — click any conflict for a deep-dive view with risk gauge, trend
  sparkline, event timeline, actor tags, and links to related conflicts
- **Live intelligence feed** aggregating the latest events across all visible conflicts, sorted
  chronologically
- **5-card stats bar** with animated counters: active theaters, high risk count, total displaced,
  estimated casualties, and composite risk index
- **Priority watchlist table** with sortable columns, inline sparkline charts, and row selection
- **Full-text search** across conflict names, summaries, and actor names
- **Multi-axis filters**: region, intensity level, status, and timeline range slider
- **Canvas sparklines** (no chart library needed) for risk trends in both the table and detail panel
- **Keyboard shortcuts**: Escape to close detail panel
- **Responsive** down to mobile

## Run locally

Open `src/index.html` in a browser. The app uses Leaflet and Inter font via CDN — no build step
required.
