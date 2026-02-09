const data = [
  {
    name: "Eastern Europe",
    region: "Europe",
    status: "Active",
    intensity: "High",
    updated: "2024-09-12",
    monthsActive: 18,
    risk: 92,
    coordinates: [49.5, 31.3],
    summary: "Cross-border strikes and infrastructure disruption impacting energy corridors.",
  },
  {
    name: "Sahel Corridor",
    region: "Africa",
    status: "Escalating",
    intensity: "High",
    updated: "2024-08-30",
    monthsActive: 10,
    risk: 88,
    coordinates: [15.5, -1.6],
    summary: "Militia expansion driving displacement and food insecurity across three states.",
  },
  {
    name: "Red Sea Maritime",
    region: "Middle East",
    status: "Active",
    intensity: "Medium",
    updated: "2024-09-08",
    monthsActive: 9,
    risk: 74,
    coordinates: [20.0, 39.2],
    summary: "Shipping disruptions with increased naval patrols and drone activity.",
  },
  {
    name: "South China Sea",
    region: "Asia-Pacific",
    status: "Tense",
    intensity: "Medium",
    updated: "2024-08-20",
    monthsActive: 14,
    risk: 69,
    coordinates: [13.1, 114.2],
    summary: "Expanded maritime patrols and contested infrastructure buildup.",
  },
  {
    name: "Northern Andes",
    region: "Americas",
    status: "Active",
    intensity: "Medium",
    updated: "2024-09-01",
    monthsActive: 6,
    risk: 61,
    coordinates: [3.4, -73.1],
    summary: "Armed groups contesting routes, increasing civilian exposure.",
  },
  {
    name: "Caucasus",
    region: "Europe",
    status: "Fragile",
    intensity: "Low",
    updated: "2024-07-26",
    monthsActive: 4,
    risk: 46,
    coordinates: [40.2, 45.3],
    summary: "Ceasefire holding with sporadic skirmishes and monitoring gaps.",
  },
];

const regionFilter = document.getElementById("regionFilter");
const intensityFilter = document.getElementById("intensityFilter");
const statusFilter = document.getElementById("statusFilter");
const timelineFilter = document.getElementById("timelineFilter");
const timelineLabel = document.getElementById("timelineLabel");
const resetBtn = document.getElementById("resetBtn");
const watchlist = document.getElementById("watchlist");
const narrativeFeed = document.getElementById("narrativeFeed");
const activeCount = document.getElementById("activeCount");
const highRiskCount = document.getElementById("highRiskCount");
const riskIndex = document.getElementById("riskIndex");

const map = L.map("map", {
  zoomControl: false,
  worldCopyJump: true,
}).setView([18, 10], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.control.zoom({ position: "bottomright" }).addTo(map);

let markers = [];

const buildOptions = (select, options, label) => {
  select.innerHTML = "";
  const all = document.createElement("option");
  all.value = "All";
  all.textContent = `All ${label}`;
  select.appendChild(all);
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
};

const buildNarrative = (items) => {
  narrativeFeed.innerHTML = "";
  items.slice(0, 5).forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.name}</strong> · ${item.summary}`;
    narrativeFeed.appendChild(li);
  });
};

const intensityColor = (intensity) => {
  if (intensity === "High") return "var(--high)";
  if (intensity === "Medium") return "var(--medium)";
  return "var(--low)";
};

const updateMarkers = (items) => {
  markers.forEach((marker) => marker.remove());
  markers = items.map((item) => {
    const marker = L.circleMarker(item.coordinates, {
      radius: 8 + item.risk / 25,
      color: intensityColor(item.intensity),
      fillColor: intensityColor(item.intensity),
      fillOpacity: 0.7,
      weight: 1.5,
    }).addTo(map);

    marker.bindPopup(
      `<div class="popup">
        <strong>${item.name}</strong><br />
        Risk score: ${item.risk}<br />
        Status: ${item.status}<br />
        Updated: ${item.updated}
      </div>`
    );
    return marker;
  });
};

const updateWatchlist = (items) => {
  watchlist.innerHTML = "";
  items
    .slice()
    .sort((a, b) => b.risk - a.risk)
    .forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td><span class="badge ${item.intensity.toLowerCase()}">${item.risk}</span></td>
        <td>${item.status}</td>
        <td>${item.updated}</td>
      `;
      watchlist.appendChild(row);
    });
};

const updateMetrics = (items) => {
  activeCount.textContent = items.length;
  highRiskCount.textContent = items.filter((item) => item.intensity === "High").length;
  const average = items.reduce((sum, item) => sum + item.risk, 0) / (items.length || 1);
  riskIndex.textContent = Math.round(average);
};

const applyFilters = () => {
  const region = regionFilter.value;
  const intensity = intensityFilter.value;
  const status = statusFilter.value;
  const timeline = Number(timelineFilter.value);
  timelineLabel.textContent = `Last ${timeline} months`;

  const filtered = data.filter((item) => {
    const matchesRegion = region === "All" || item.region === region;
    const matchesIntensity = intensity === "All" || item.intensity === intensity;
    const matchesStatus = status === "All" || item.status === status;
    const matchesTimeline = item.monthsActive <= timeline;
    return matchesRegion && matchesIntensity && matchesStatus && matchesTimeline;
  });

  updateMarkers(filtered);
  updateWatchlist(filtered);
  updateMetrics(filtered);
  buildNarrative(filtered);
};

const setup = () => {
  buildOptions(regionFilter, [...new Set(data.map((item) => item.region))], "regions");
  buildOptions(intensityFilter, ["High", "Medium", "Low"], "intensity");
  buildOptions(statusFilter, [...new Set(data.map((item) => item.status))], "status");
  applyFilters();
};

[regionFilter, intensityFilter, statusFilter, timelineFilter].forEach((input) => {
  input.addEventListener("input", applyFilters);
});

resetBtn.addEventListener("click", () => {
  regionFilter.value = "All";
  intensityFilter.value = "All";
  statusFilter.value = "All";
  timelineFilter.value = 12;
  applyFilters();
});

setup();
