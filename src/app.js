/* ── Pulse Atlas – Enhanced Conflict Observatory ─────────────────────── */

const conflicts = [
  {
    id: "ua",
    name: "Ukraine – Donbas / Crimea",
    region: "Europe",
    status: "Active",
    intensity: "High",
    updated: "2025-01-28",
    monthsActive: 35,
    risk: 94,
    casualties: 190000,
    displaced: 6400000,
    coordinates: [48.5, 35.0],
    actors: ["Russia", "Ukraine", "NATO advisory"],
    summary:
      "Sustained conventional warfare with cross-border strikes, infrastructure disruption impacting European energy corridors, and ongoing attritional fighting across a 1,200 km front.",
    trend: [72, 78, 81, 85, 88, 90, 91, 93, 92, 94, 93, 94],
    events: [
      { date: "2025-01-26", text: "Power grid attacks knock out heat in three oblasts" },
      { date: "2025-01-18", text: "Counteroffensive retakes two settlements near Zaporizhzhia" },
      { date: "2025-01-05", text: "Drone swarm intercept over Kyiv sets single-day record" },
    ],
    related: ["caucasus"],
  },
  {
    id: "sahel",
    name: "Sahel Corridor",
    region: "Africa",
    status: "Escalating",
    intensity: "High",
    updated: "2025-01-25",
    monthsActive: 22,
    risk: 91,
    casualties: 18500,
    displaced: 3200000,
    coordinates: [15.5, -1.6],
    actors: ["JNIM", "ISGS", "Wagner / Africa Corps", "ECOWAS"],
    summary:
      "Jihadist militia expansion driving mass displacement and food insecurity across Mali, Burkina Faso, and Niger. Foreign military withdrawal has created security vacuums.",
    trend: [68, 72, 74, 78, 80, 83, 85, 87, 89, 90, 90, 91],
    events: [
      { date: "2025-01-22", text: "ISGS overruns garrison near Tillabéri" },
      { date: "2025-01-10", text: "IDP camp attack displaces 40,000 more" },
      { date: "2024-12-28", text: "Wagner column ambushed; six vehicles destroyed" },
    ],
    related: ["sudan", "drc"],
  },
  {
    id: "sudan",
    name: "Sudan Civil War",
    region: "Africa",
    status: "Active",
    intensity: "High",
    updated: "2025-01-27",
    monthsActive: 20,
    risk: 93,
    casualties: 15000,
    displaced: 9000000,
    coordinates: [15.6, 32.5],
    actors: ["SAF", "RSF", "SLM/A"],
    summary:
      "Full-scale civil war between Sudanese Armed Forces and Rapid Support Forces. Khartoum devastated, famine conditions expanding, and ethnic cleansing reported in Darfur.",
    trend: [60, 68, 75, 80, 84, 87, 89, 91, 92, 93, 93, 93],
    events: [
      { date: "2025-01-24", text: "RSF siege of El Fasher enters fourth month" },
      { date: "2025-01-15", text: "UN declares famine in North Darfur" },
      { date: "2025-01-02", text: "SAF recaptures Omdurman district in urban fighting" },
    ],
    related: ["sahel"],
  },
  {
    id: "gaza",
    name: "Gaza – Israel",
    region: "Middle East",
    status: "Active",
    intensity: "High",
    updated: "2025-01-28",
    monthsActive: 16,
    risk: 96,
    casualties: 42000,
    displaced: 1900000,
    coordinates: [31.4, 34.4],
    actors: ["Israel", "Hamas", "PIJ", "Hezbollah"],
    summary:
      "Intense urban warfare and bombardment with catastrophic humanitarian toll. Northern Gaza faces complete infrastructure collapse. Regional escalation risk remains critical.",
    trend: [45, 78, 88, 92, 94, 95, 96, 96, 95, 96, 96, 96],
    events: [
      { date: "2025-01-27", text: "Ceasefire negotiations stall over hostage exchange terms" },
      { date: "2025-01-20", text: "UNRWA forced to halt food distribution in north" },
      { date: "2025-01-08", text: "Cross-border exchange with Hezbollah intensifies" },
    ],
    related: ["redsea", "lebanon"],
  },
  {
    id: "redsea",
    name: "Red Sea Maritime",
    region: "Middle East",
    status: "Active",
    intensity: "Medium",
    updated: "2025-01-26",
    monthsActive: 14,
    risk: 74,
    casualties: 120,
    displaced: 0,
    coordinates: [14.8, 42.5],
    actors: ["Ansar Allah (Houthis)", "US CENTCOM", "EU NAVFOR"],
    summary:
      "Houthi anti-shipping campaign disrupting global trade through Bab al-Mandeb. Naval coalition conducting strikes on launch sites. Insurance costs for Suez transit have tripled.",
    trend: [30, 42, 55, 62, 68, 72, 74, 75, 74, 73, 74, 74],
    events: [
      { date: "2025-01-25", text: "Bulk carrier struck by drone 80 nm west of Hudaydah" },
      { date: "2025-01-14", text: "US strikes destroy six coastal radar installations" },
      { date: "2024-12-30", text: "Shipping rerouted adds $1M per container vessel transit" },
    ],
    related: ["gaza"],
  },
  {
    id: "lebanon",
    name: "Lebanon – Southern Front",
    region: "Middle East",
    status: "Tense",
    intensity: "Medium",
    updated: "2025-01-22",
    monthsActive: 10,
    risk: 71,
    casualties: 1800,
    displaced: 250000,
    coordinates: [33.3, 35.5],
    actors: ["Hezbollah", "Israel", "UNIFIL"],
    summary:
      "Sustained cross-border exchanges along the Blue Line. Targeted assassinations and precision strikes escalating. Southern Lebanese towns evacuated.",
    trend: [32, 38, 45, 52, 58, 62, 65, 68, 70, 71, 71, 71],
    events: [
      { date: "2025-01-20", text: "Israeli strike hits Dahiyeh; senior commander killed" },
      { date: "2025-01-11", text: "Hezbollah launches 60 rockets at Galilee" },
      { date: "2024-12-29", text: "UNIFIL post damaged in crossfire" },
    ],
    related: ["gaza"],
  },
  {
    id: "scs",
    name: "South China Sea",
    region: "Asia-Pacific",
    status: "Tense",
    intensity: "Medium",
    updated: "2025-01-20",
    monthsActive: 18,
    risk: 68,
    casualties: 0,
    displaced: 0,
    coordinates: [11.5, 114.5],
    actors: ["China (PLA-N)", "Philippines", "Vietnam", "US Indo-Pacific Command"],
    summary:
      "Escalating maritime confrontations around Second Thomas Shoal and Spratly Islands. Water cannon attacks on resupply missions and expanded artificial island militarization.",
    trend: [52, 54, 55, 58, 60, 62, 63, 64, 66, 67, 68, 68],
    events: [
      { date: "2025-01-18", text: "Philippine resupply mission blocked by coast guard swarm" },
      { date: "2025-01-06", text: "PLA-N deploys carrier group to disputed waters" },
      { date: "2024-12-22", text: "Vietnam protests new Chinese survey operations" },
    ],
    related: ["myanmar", "taiwan"],
  },
  {
    id: "taiwan",
    name: "Taiwan Strait",
    region: "Asia-Pacific",
    status: "Watchlist",
    intensity: "Low",
    updated: "2025-01-15",
    monthsActive: 24,
    risk: 55,
    casualties: 0,
    displaced: 0,
    coordinates: [24.0, 121.0],
    actors: ["China (PLA)", "Taiwan", "US 7th Fleet"],
    summary:
      "Elevated military posturing with record ADIZ incursions and large-scale amphibious exercises. Diplomatic tensions sustained after arms sales and transit diplomacy.",
    trend: [42, 44, 46, 48, 50, 51, 52, 53, 54, 55, 55, 55],
    events: [
      { date: "2025-01-12", text: "Record 71 PLA aircraft enter Taiwan ADIZ in 48 hours" },
      { date: "2024-12-28", text: "US approves $2B arms package for Taipei" },
      { date: "2024-12-15", text: "Joint PLA amphibious exercise near Fujian coast" },
    ],
    related: ["scs"],
  },
  {
    id: "myanmar",
    name: "Myanmar Civil War",
    region: "Asia-Pacific",
    status: "Active",
    intensity: "High",
    updated: "2025-01-24",
    monthsActive: 42,
    risk: 82,
    casualties: 50000,
    displaced: 2600000,
    coordinates: [19.7, 96.1],
    actors: ["Tatmadaw", "NUG / PDF", "Arakan Army", "TNLA"],
    summary:
      "Multi-front resistance war against military junta. Resistance forces have captured significant territory in Shan and Rakhine states. Junta increasingly reliant on airstrikes against civilian areas.",
    trend: [62, 64, 66, 70, 72, 74, 76, 78, 80, 81, 82, 82],
    events: [
      { date: "2025-01-22", text: "Resistance captures Lashio, largest city to fall" },
      { date: "2025-01-10", text: "Junta airstrikes hit IDP camp in Kayah state" },
      { date: "2024-12-31", text: "Arakan Army declares control of Rakhine coast" },
    ],
    related: ["scs"],
  },
  {
    id: "drc",
    name: "Eastern DRC",
    region: "Africa",
    status: "Escalating",
    intensity: "High",
    updated: "2025-01-23",
    monthsActive: 30,
    risk: 85,
    casualties: 12000,
    displaced: 7000000,
    coordinates: [-1.7, 29.2],
    actors: ["M23", "FARDC", "MONUSCO", "Rwanda (alleged)"],
    summary:
      "M23 advance threatens Goma. Dozens of armed groups active in North and South Kivu. Mineral wealth fuels conflict economy. Largest displacement crisis in Africa.",
    trend: [58, 62, 65, 68, 72, 75, 78, 80, 82, 83, 84, 85],
    events: [
      { date: "2025-01-21", text: "M23 advances to within 15 km of Goma" },
      { date: "2025-01-09", text: "MONUSCO peacekeepers withdraw from two bases" },
      { date: "2024-12-25", text: "Ethnic militia massacre in Ituri kills 80 civilians" },
    ],
    related: ["sahel"],
  },
  {
    id: "andes",
    name: "Northern Andes",
    region: "Americas",
    status: "Active",
    intensity: "Medium",
    updated: "2025-01-18",
    monthsActive: 12,
    risk: 58,
    casualties: 3200,
    displaced: 340000,
    coordinates: [3.4, -73.1],
    actors: ["EMC (FARC dissidents)", "ELN", "Colombian Armed Forces"],
    summary:
      "Armed groups contesting drug trafficking routes, increasing civilian exposure. Peace talks with ELN stalled. Mining region communities caught between factions.",
    trend: [45, 47, 48, 50, 52, 53, 54, 55, 56, 57, 58, 58],
    events: [
      { date: "2025-01-16", text: "ELN ceasefire collapses; clashes resume in Arauca" },
      { date: "2025-01-04", text: "Forced displacement of 5,000 from Chocó department" },
      { date: "2024-12-18", text: "Military operation disrupts EMC coca corridor" },
    ],
    related: ["haiti"],
  },
  {
    id: "haiti",
    name: "Haiti Gang Crisis",
    region: "Americas",
    status: "Escalating",
    intensity: "Medium",
    updated: "2025-01-19",
    monthsActive: 16,
    risk: 64,
    casualties: 5800,
    displaced: 580000,
    coordinates: [18.5, -72.3],
    actors: ["Gang coalitions (G-9, G-Pèp)", "HNP", "MSS (Kenya-led)"],
    summary:
      "Gangs control 80% of Port-au-Prince. Kenyan-led security mission understrength. Famine conditions in besieged neighborhoods. State institutions near collapse.",
    trend: [40, 44, 48, 52, 55, 57, 59, 60, 62, 63, 64, 64],
    events: [
      { date: "2025-01-17", text: "Gangs seize national hospital, force mass evacuation" },
      { date: "2025-01-06", text: "Kenya deploys 200 additional police officers" },
      { date: "2024-12-20", text: "Port-au-Prince airport closed after sniper fire" },
    ],
    related: ["andes"],
  },
  {
    id: "caucasus",
    name: "Caucasus",
    region: "Europe",
    status: "Fragile",
    intensity: "Low",
    updated: "2025-01-10",
    monthsActive: 8,
    risk: 42,
    casualties: 700,
    displaced: 120000,
    coordinates: [40.2, 45.3],
    actors: ["Azerbaijan", "Armenia", "Russian peacekeepers (withdrawn)"],
    summary:
      "Post-Karabakh ethnic cleansing aftermath. Armenian enclave fully depopulated. Border demarcation disputes and sporadic skirmishes along contested sectors.",
    trend: [60, 58, 55, 52, 50, 48, 46, 44, 43, 42, 42, 42],
    events: [
      { date: "2025-01-08", text: "Border demarcation talks resume in Geneva" },
      { date: "2024-12-22", text: "Skirmish at Syunik border post; two casualties" },
      { date: "2024-12-10", text: "Azerbaijan announces reconstruction in Karabakh" },
    ],
    related: ["ua"],
  },
  {
    id: "ethiopia",
    name: "Ethiopia – Amhara / Oromia",
    region: "Africa",
    status: "Active",
    intensity: "Medium",
    updated: "2025-01-20",
    monthsActive: 14,
    risk: 66,
    casualties: 8000,
    displaced: 4500000,
    coordinates: [9.0, 38.7],
    actors: ["ENDF", "Fano militia", "OLA", "Amhara regional forces"],
    summary:
      "Post-Tigray war instability has shifted to Amhara and Oromia regions. Fano militia insurgency challenges federal authority. State of emergency declared.",
    trend: [40, 45, 48, 52, 55, 58, 60, 62, 64, 65, 66, 66],
    events: [
      { date: "2025-01-18", text: "Fano captures district center in South Gondar" },
      { date: "2025-01-05", text: "State of emergency extended for three months" },
      { date: "2024-12-15", text: "Internet blackout imposed across Amhara region" },
    ],
    related: ["sudan", "drc"],
  },
];

/* ── State ───────────────────────────────────────────────────────────── */

let activeFilters = { region: "All", intensity: "All", status: "All", timeline: 48, search: "" };
let selectedConflict = null;
let sortColumn = "risk";
let sortAsc = false;
let liveReports = {};
let allRWReports = [];
let dataSources = { gdelt: false };
let highlightedRow = -1;
let isRefreshing = false;

/* ── DOM refs ────────────────────────────────────────────────────────── */

const $ = (id) => document.getElementById(id);
const regionFilter = $("regionFilter");
const intensityFilter = $("intensityFilter");
const statusFilter = $("statusFilter");
const timelineFilter = $("timelineFilter");
const timelineLabel = $("timelineLabel");
const resetBtn = $("resetBtn");
const searchInput = $("searchInput");
const watchlistBody = $("watchlist");
const narrativeFeed = $("narrativeFeed");
const detailPanel = $("detailPanel");
const detailClose = $("detailClose");
const overlay = $("overlay");

/* ── Map setup ───────────────────────────────────────────────────────── */

const map = L.map("map", { zoomControl: false, worldCopyJump: true }).setView([20, 15], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  maxZoom: 18,
}).addTo(map);

L.control.zoom({ position: "bottomright" }).addTo(map);

let markers = [];
let arcLines = [];

/* ── Utilities ───────────────────────────────────────────────────────── */

const intensityColor = (i) =>
  i === "High" ? "#ff6b6b" : i === "Medium" ? "#f7b731" : "#45aaf2";

const fmt = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + "K";
  return n.toLocaleString();
};

const statusIcon = (s) => {
  const icons = { Active: "\u25CF", Escalating: "\u25B2", Tense: "\u25C6", Fragile: "\u25CB", Watchlist: "\u25CB" };
  return icons[s] || "\u25CF";
};

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ── Toast notifications ────────────────────────────────────────────── */

function showToast(message, type = "info") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("visible"));

  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

/* ── Relative time helper ───────────────────────────────────────────── */

function timeAgo(ts) {
  if (!ts) return "";
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function updateLastFetchDisplay() {
  const el = $("lastFetchTime");
  if (!el) return;
  const ts = DataService.getLastFetchTime();
  el.textContent = ts ? `Updated ${timeAgo(ts)}` : "";
}

/* ── Animated counters ───────────────────────────────────────────────── */

function animateValue(el, start, end, duration) {
  if (start === end) { el.textContent = typeof end === "number" ? fmt(end) : end; return; }
  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = fmt(current);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const prevMetrics = { active: 0, highRisk: 0, displaced: 0, casualties: 0, risk: 0 };

function updateMetrics(items) {
  const active = items.length;
  const highRisk = items.filter((c) => c.intensity === "High").length;
  const displaced = items.reduce((s, c) => s + c.displaced, 0);
  const casualties = items.reduce((s, c) => s + c.casualties, 0);
  const risk = items.length ? Math.round(items.reduce((s, c) => s + c.risk, 0) / items.length) : 0;

  animateValue($("statTheaters"), prevMetrics.active, active, 600);
  animateValue($("statHighRisk"), prevMetrics.highRisk, highRisk, 600);
  animateValue($("statDisplaced"), prevMetrics.displaced, displaced, 800);
  animateValue($("statCasualties"), prevMetrics.casualties, casualties, 800);
  animateValue($("statRiskIndex"), prevMetrics.risk, risk, 600);

  // Color the risk index
  const riskEl = $("statRiskIndex");
  riskEl.className = "stat-value " + (risk >= 75 ? "risk-high" : risk >= 50 ? "risk-medium" : "risk-low");

  // Delta indicators
  setDelta("deltaTheaters", active, prevMetrics.active);
  setDelta("deltaHighRisk", highRisk, prevMetrics.highRisk);
  setDelta("deltaRisk", risk, prevMetrics.risk);

  Object.assign(prevMetrics, { active, highRisk, displaced, casualties, risk });
}

function setDelta(id, current, previous) {
  const el = $(id);
  if (!el || previous === 0) return;
  const diff = current - previous;
  if (diff === 0) { el.textContent = ""; return; }
  el.textContent = (diff > 0 ? "\u25B2 " : "\u25BC ") + Math.abs(diff);
  el.className = "stat-delta " + (diff > 0 ? "delta-up" : "delta-down");
}

/* ── Map markers ─────────────────────────────────────────────────────── */

function createPulseIcon(conflict) {
  const color = intensityColor(conflict.intensity);
  const size = 12 + conflict.risk / 10;
  return L.divIcon({
    className: "pulse-marker",
    html: `
      <div class="pulse-ring" style="border-color:${color};width:${size * 2.5}px;height:${size * 2.5}px"></div>
      <div class="pulse-core" style="background:${color};width:${size}px;height:${size}px"></div>
    `,
    iconSize: [size * 2.5, size * 2.5],
    iconAnchor: [size * 1.25, size * 1.25],
  });
}

function buildTooltipContent(c) {
  const parts = [`<strong>${escapeHtml(c.name)}</strong>`];
  parts.push(`<span class="tt-row">Risk: <b>${c.risk}</b> &middot; ${c.status}</span>`);
  if (c.casualties) parts.push(`<span class="tt-row">Casualties: ${fmt(c.casualties)}</span>`);
  if (c.displaced) parts.push(`<span class="tt-row">Displaced: ${fmt(c.displaced)}</span>`);
  return `<div class="map-tooltip">${parts.join("")}</div>`;
}

function updateMarkers(items) {
  markers.forEach((m) => m.remove());
  arcLines.forEach((l) => l.remove());
  markers = [];
  arcLines = [];

  items.forEach((c) => {
    const marker = L.marker(c.coordinates, { icon: createPulseIcon(c) }).addTo(map);
    marker.on("click", () => openDetail(c));
    marker.bindTooltip(buildTooltipContent(c), {
      direction: "top",
      offset: [0, -10],
      className: "custom-tooltip",
    });
    markers.push(marker);
  });

  // Connection arcs
  const itemMap = Object.fromEntries(items.map((c) => [c.id, c]));
  const drawn = new Set();
  items.forEach((c) => {
    (c.related || []).forEach((rid) => {
      const key = [c.id, rid].sort().join("-");
      if (drawn.has(key) || !itemMap[rid]) return;
      drawn.add(key);
      const other = itemMap[rid];
      const arc = L.polyline([c.coordinates, other.coordinates], {
        color: "rgba(90,228,255,0.15)",
        weight: 1.5,
        dashArray: "6 4",
      }).addTo(map);
      arcLines.push(arc);
    });
  });
}

/* ── Sparkline (canvas) ──────────────────────────────────────────────── */

function drawSparkline(canvas, data, color) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.scale(dpr, dpr);

  const min = Math.min(...data) - 5;
  const max = Math.max(...data) + 5;
  const step = w / (data.length - 1);

  // Fill
  ctx.beginPath();
  ctx.moveTo(0, h);
  data.forEach((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / (max - min)) * h;
    ctx.lineTo(x, y);
  });
  ctx.lineTo(w, h);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + "40");
  grad.addColorStop(1, color + "05");
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / (max - min)) * h;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // End dot
  const last = data[data.length - 1];
  const lx = (data.length - 1) * step;
  const ly = h - ((last - min) / (max - min)) * h;
  ctx.beginPath();
  ctx.arc(lx, ly, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

/* ── Regional risk chart (horizontal bars) ───────────────────────────── */

function drawRegionChart(items) {
  const canvas = $("regionChart");
  if (!canvas) return;

  // Aggregate by region
  const regionMap = {};
  items.forEach((c) => {
    if (!regionMap[c.region]) regionMap[c.region] = { risk: 0, count: 0, maxIntensity: "Low" };
    regionMap[c.region].risk += c.risk;
    regionMap[c.region].count++;
    if (c.intensity === "High" || (c.intensity === "Medium" && regionMap[c.region].maxIntensity === "Low")) {
      regionMap[c.region].maxIntensity = c.intensity;
    }
  });

  const regions = Object.entries(regionMap)
    .map(([name, d]) => ({ name, avgRisk: Math.round(d.risk / d.count), count: d.count, intensity: d.maxIntensity }))
    .sort((a, b) => b.avgRisk - a.avgRisk);

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.scale(dpr, dpr);

  const barH = 18;
  const gap = 10;
  const labelW = 85;
  const valueW = 36;
  const barMaxW = w - labelW - valueW - 16;

  regions.forEach((r, i) => {
    const y = i * (barH + gap) + 8;
    const color = intensityColor(r.intensity);
    const barW = (r.avgRisk / 100) * barMaxW;

    // Label
    ctx.fillStyle = "#7b8da8";
    ctx.font = "500 11px Inter, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText(r.name, 0, y + barH / 2);

    // Bar background
    ctx.fillStyle = "rgba(90,128,180,0.1)";
    ctx.beginPath();
    ctx.roundRect(labelW, y, barMaxW, barH, 4);
    ctx.fill();

    // Bar fill
    const grad = ctx.createLinearGradient(labelW, 0, labelW + barW, 0);
    grad.addColorStop(0, color + "cc");
    grad.addColorStop(1, color + "44");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(labelW, y, barW, barH, 4);
    ctx.fill();

    // Value
    ctx.fillStyle = color;
    ctx.font = "600 11px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(r.avgRisk, w - 4, y + barH / 2);
    ctx.textAlign = "left";

    // Count
    ctx.fillStyle = "#7b8da880";
    ctx.font = "400 9px Inter, sans-serif";
    ctx.fillText(`(${r.count})`, labelW + barW + 6, y + barH / 2);
  });
}

/* ── Watchlist table ─────────────────────────────────────────────────── */

function updateWatchlist(items) {
  watchlistBody.innerHTML = "";

  // Empty state
  const emptyEl = $("emptyState");
  if (emptyEl) emptyEl.style.display = items.length === 0 ? "flex" : "none";

  const sorted = items.slice().sort((a, b) =>
    sortAsc
      ? (a[sortColumn] > b[sortColumn] ? 1 : -1)
      : (b[sortColumn] > a[sortColumn] ? 1 : -1)
  );

  sorted.forEach((c, idx) => {
    const row = document.createElement("tr");
    row.className =
      (selectedConflict?.id === c.id ? "selected-row " : "") +
      "anim-row";
    row.style.setProperty("--i", idx);
    row.dataset.id = c.id;
    row.addEventListener("click", () => openDetail(c));
    row.innerHTML = `
      <td>
        <div class="wl-name">${escapeHtml(c.name)}</div>
        <div class="wl-actors">${c.actors.slice(0, 2).map(escapeHtml).join(", ")}</div>
      </td>
      <td><span class="badge ${c.intensity.toLowerCase()}">${c.risk}</span></td>
      <td><span class="status-chip ${c.status.toLowerCase().replace(/\s/g, "")}">${statusIcon(c.status)} ${c.status}</span></td>
      <td><canvas class="sparkline" width="80" height="28"></canvas></td>
      <td class="wl-displaced">${c.displaced ? fmt(c.displaced) : "\u2014"}</td>
      <td class="wl-updated">${c.updated}</td>
    `;
    watchlistBody.appendChild(row);

    const canvas = row.querySelector(".sparkline");
    if (canvas && c.trend) {
      requestAnimationFrame(() => drawSparkline(canvas, c.trend, intensityColor(c.intensity)));
    }
  });
}

/* ── Sortable headers ────────────────────────────────────────────────── */

document.querySelectorAll("th[data-sort]").forEach((th) => {
  th.addEventListener("click", () => {
    const col = th.dataset.sort;
    if (sortColumn === col) {
      sortAsc = !sortAsc;
    } else {
      sortColumn = col;
      sortAsc = false;
    }
    document.querySelectorAll("th[data-sort]").forEach((t) => t.classList.remove("sort-active", "sort-asc"));
    th.classList.add("sort-active");
    if (sortAsc) th.classList.add("sort-asc");
    applyFilters();
  });
});

/* ── Narrative feed ──────────────────────────────────────────────────── */

function buildNarrative(items) {
  narrativeFeed.innerHTML = "";

  const staticEvents = items
    .flatMap((c) => c.events.map((e) => ({
      ...e, conflict: c.name, intensity: c.intensity, id: c.id, source: "static",
    })));

  const rwEvents = [];
  if (allRWReports.length > 0) {
    for (const report of allRWReports.slice(0, 12)) {
      const matchedConflict = items.find((c) => {
        const rwReports = liveReports[c.id] || [];
        return rwReports.some((r) => r.id === report.id);
      });
      rwEvents.push({
        date: report.date,
        text: report.title,
        conflict: matchedConflict?.name || report.countries[0] || "Global",
        intensity: matchedConflict?.intensity || "Medium",
        id: matchedConflict?.id || null,
        source: "gdelt",
        url: report.url,
        rwSource: report.source,
      });
    }
  }

  const allEvents = [...rwEvents, ...staticEvents]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  allEvents.forEach((ev, idx) => {
    const li = document.createElement("li");
    li.className = "anim-feed";
    li.style.setProperty("--i", idx);
    const isLive = ev.source === "gdelt";
    li.innerHTML = `
      <div class="feed-header">
        <span class="feed-dot" style="background:${intensityColor(ev.intensity)}"></span>
        <strong>${escapeHtml(ev.conflict)}</strong>
        ${isLive ? '<span class="feed-live">LIVE</span>' : ""}
        <time>${ev.date}</time>
      </div>
      <p>${escapeHtml(ev.text)}</p>
      ${isLive && ev.rwSource ? `<span class="feed-source">${escapeHtml(ev.rwSource)}</span>` : ""}
    `;
    li.addEventListener("click", () => {
      if (isLive && ev.url) {
        window.open(ev.url, "_blank", "noopener");
      } else if (ev.id) {
        const c = conflicts.find((x) => x.id === ev.id);
        if (c) openDetail(c);
      }
    });
    narrativeFeed.appendChild(li);
  });
}

/* ── SVG risk arc ────────────────────────────────────────────────────── */

function setArc(risk, color) {
  const arcFill = $("arcFill");
  if (!arcFill) return;

  // The arc path total length (semicircle from 10,65 to 110,65 with r=50)
  const totalLen = arcFill.getTotalLength();
  const pct = Math.max(0, Math.min(100, risk)) / 100;

  arcFill.style.stroke = color;
  arcFill.style.strokeDasharray = totalLen;
  arcFill.style.strokeDashoffset = totalLen * (1 - pct);
  arcFill.style.filter = `drop-shadow(0 0 6px ${color})`;
}

/* ── Detail panel ────────────────────────────────────────────────────── */

function openDetail(conflict) {
  selectedConflict = conflict;
  detailPanel.classList.add("open");
  document.body.classList.add("detail-open");
  overlay.classList.add("active");

  const c = conflict;
  $("detailName").textContent = c.name;
  $("detailRegion").textContent = c.region;
  $("detailStatus").innerHTML = `<span class="status-chip ${c.status.toLowerCase().replace(/\s/g, "")}">${statusIcon(c.status)} ${c.status}</span>`;

  // Risk arc
  const riskColor = intensityColor(c.intensity);
  $("detailRisk").textContent = c.risk;
  $("detailRisk").className = "detail-risk-value " + (c.risk >= 75 ? "risk-high" : c.risk >= 50 ? "risk-medium" : "risk-low");
  requestAnimationFrame(() => setArc(c.risk, riskColor));

  $("detailSummary").textContent = c.summary;

  $("detailCasualties").textContent = c.casualties ? fmt(c.casualties) : "\u2014";
  $("detailDisplaced").textContent = c.displaced ? fmt(c.displaced) : "\u2014";
  $("detailDuration").textContent = c.monthsActive + " months";
  $("detailUpdated").textContent = c.updated;

  // Actors
  const actorsList = $("detailActors");
  actorsList.innerHTML = "";
  c.actors.forEach((a) => {
    const span = document.createElement("span");
    span.className = "actor-tag";
    span.textContent = a;
    actorsList.appendChild(span);
  });

  // Trend chart
  const trendCanvas = $("detailTrend");
  trendCanvas.width = 280;
  trendCanvas.height = 60;
  requestAnimationFrame(() => drawSparkline(trendCanvas, c.trend, riskColor));

  // Event timeline — merge live + static
  const evContainer = $("detailEvents");
  evContainer.innerHTML = "";

  const gdeltEvents = (liveReports[c.id] || []).slice(0, 5).map((r) => ({
    date: r.date,
    text: r.title,
    live: true,
    url: r.url,
  }));
  const staticEvents = c.events.map((e) => ({ ...e, live: false }));

  const allDetailEvents = [...gdeltEvents, ...staticEvents]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);

  allDetailEvents.forEach((ev) => {
    const div = document.createElement("div");
    div.className = "timeline-event" + (ev.live ? " timeline-live" : "");
    div.innerHTML = `
      <time>${ev.date}${ev.live ? ' <span class="data-src-tag">LIVE</span>' : ""}</time>
      <p>${escapeHtml(ev.text)}</p>
    `;
    if (ev.url) {
      div.style.cursor = "pointer";
      div.addEventListener("click", () => window.open(ev.url, "_blank", "noopener"));
    }
    evContainer.appendChild(div);
  });

  // Related conflicts
  const relContainer = $("detailRelated");
  relContainer.innerHTML = "";
  (c.related || []).forEach((rid) => {
    const rc = conflicts.find((x) => x.id === rid);
    if (!rc) return;
    const btn = document.createElement("button");
    btn.className = "related-btn";
    btn.innerHTML = `${escapeHtml(rc.name)} <span class="badge ${rc.intensity.toLowerCase()}">${rc.risk}</span>`;
    btn.addEventListener("click", () => openDetail(rc));
    relContainer.appendChild(btn);
  });

  applyFilters();
  map.flyTo(c.coordinates, 5, { duration: 0.8 });
}

function closeDetail() {
  selectedConflict = null;
  detailPanel.classList.remove("open");
  document.body.classList.remove("detail-open");
  overlay.classList.remove("active");
  applyFilters();
  map.flyTo([20, 15], 2, { duration: 0.8 });
}

detailClose.addEventListener("click", closeDetail);
overlay.addEventListener("click", closeDetail);

/* ── CSV export ──────────────────────────────────────────────────────── */

function exportCSV() {
  const filtered = getFiltered();
  const headers = ["Name", "Region", "Risk", "Status", "Intensity", "Casualties", "Displaced", "Months Active", "Updated", "Actors"];
  const rows = filtered.map((c) => [
    `"${c.name}"`,
    c.region,
    c.risk,
    c.status,
    c.intensity,
    c.casualties,
    c.displaced,
    c.monthsActive,
    c.updated,
    `"${c.actors.join("; ")}"`,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pulse-atlas-export-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

const exportBtn = $("exportBtn");
if (exportBtn) exportBtn.addEventListener("click", exportCSV);

/* ── Filters ─────────────────────────────────────────────────────────── */

const buildOptions = (select, options, label) => {
  select.innerHTML = "";
  const all = document.createElement("option");
  all.value = "All";
  all.textContent = `All ${label}`;
  select.appendChild(all);
  options.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o;
    opt.textContent = o;
    select.appendChild(opt);
  });
};

function getFiltered() {
  const { region, intensity, status, timeline, search } = activeFilters;
  const q = search.toLowerCase();
  return conflicts.filter((c) => {
    if (region !== "All" && c.region !== region) return false;
    if (intensity !== "All" && c.intensity !== intensity) return false;
    if (status !== "All" && c.status !== status) return false;
    if (c.monthsActive > timeline) return false;
    if (q && !c.name.toLowerCase().includes(q) && !c.summary.toLowerCase().includes(q) &&
        !c.actors.some((a) => a.toLowerCase().includes(q))) return false;
    return true;
  });
}

function applyFilters() {
  activeFilters.region = regionFilter.value;
  activeFilters.intensity = intensityFilter.value;
  activeFilters.status = statusFilter.value;
  activeFilters.timeline = Number(timelineFilter.value);
  activeFilters.search = searchInput.value;
  timelineLabel.textContent =
    activeFilters.timeline >= 48 ? "All time" : `Last ${activeFilters.timeline} months`;

  const filtered = getFiltered();
  updateMarkers(filtered);
  updateWatchlist(filtered);
  updateMetrics(filtered);
  buildNarrative(filtered);
  drawRegionChart(filtered);
  highlightedRow = -1;
}

/* ── Event listeners ─────────────────────────────────────────────────── */

let searchDebounce;
[regionFilter, intensityFilter, statusFilter, timelineFilter].forEach((el) =>
  el.addEventListener("input", applyFilters)
);
searchInput.addEventListener("input", () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(applyFilters, 150);
});

resetBtn.addEventListener("click", () => {
  regionFilter.value = "All";
  intensityFilter.value = "All";
  statusFilter.value = "All";
  timelineFilter.value = 48;
  searchInput.value = "";
  closeDetail();
  applyFilters();
});

/* ── Keyboard shortcuts ──────────────────────────────────────────────── */

document.addEventListener("keydown", (e) => {
  // Escape closes detail
  if (e.key === "Escape") {
    if (detailPanel.classList.contains("open")) {
      closeDetail();
      return;
    }
    if (document.activeElement === searchInput) {
      searchInput.blur();
      return;
    }
  }

  // "/" focuses search
  if (e.key === "/" && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
    return;
  }

  // j/k navigate watchlist rows
  if (document.activeElement === searchInput) return;
  const rows = watchlistBody.querySelectorAll("tr");
  if (rows.length === 0) return;

  if (e.key === "j" || e.key === "ArrowDown") {
    e.preventDefault();
    highlightedRow = Math.min(highlightedRow + 1, rows.length - 1);
    rows.forEach((r) => r.classList.remove("kb-highlight"));
    rows[highlightedRow].classList.add("kb-highlight");
    rows[highlightedRow].scrollIntoView({ block: "nearest" });
  }
  if (e.key === "k" || e.key === "ArrowUp") {
    e.preventDefault();
    highlightedRow = Math.max(highlightedRow - 1, 0);
    rows.forEach((r) => r.classList.remove("kb-highlight"));
    rows[highlightedRow].classList.add("kb-highlight");
    rows[highlightedRow].scrollIntoView({ block: "nearest" });
  }
  if (e.key === "Enter" && highlightedRow >= 0 && highlightedRow < rows.length) {
    const id = rows[highlightedRow].dataset.id;
    const c = conflicts.find((x) => x.id === id);
    if (c) openDetail(c);
  }
});

/* ── Data source indicator ────────────────────────────────────────────── */

function updateDataSourceUI() {
  const el = $("dataSourceStatus");
  if (!el) return;

  if (dataSources.gdelt) {
    el.innerHTML = '<span class="ds-live"></span> Live data: GDELT (global news)';
    el.className = "data-source-status live";
  } else {
    el.innerHTML = '<span class="ds-static"></span> Static data (APIs unavailable)';
    el.className = "data-source-status static";
  }
}

/* ── Live data loader ────────────────────────────────────────────────── */

async function loadLiveData(silent = false) {
  if (isRefreshing) return;
  isRefreshing = true;

  const loader = $("liveLoader");
  const refreshBtn = $("refreshBtn");
  if (loader) loader.classList.add("active");
  if (refreshBtn) refreshBtn.classList.add("refreshing");

  // Add shimmer to stat cards on first load
  if (!silent) {
    document.querySelectorAll(".stat-card").forEach((c) => c.classList.add("shimmer"));
  }

  try {
    const result = await DataService.fetchAll(conflicts);

    for (let i = 0; i < conflicts.length; i++) {
      const enriched = result.conflicts.find((c) => c.id === conflicts[i].id);
      if (enriched) Object.assign(conflicts[i], enriched);
    }

    liveReports = result.reports || {};
    allRWReports = result.sources.rwReports || [];
    dataSources = result.sources;

    applyFilters();
    updateDataSourceUI();
    updateLastFetchDisplay();

    if (silent) showToast("Live data refreshed automatically", "success");
  } catch (err) {
    console.warn("Live data load failed:", err.message);
    if (silent) showToast("Auto-refresh failed — will retry", "error");
  } finally {
    isRefreshing = false;
    if (loader) loader.classList.remove("active");
    if (refreshBtn) refreshBtn.classList.remove("refreshing");
    document.querySelectorAll(".stat-card").forEach((c) => c.classList.remove("shimmer"));
  }
}

/* ── Init ────────────────────────────────────────────────────────────── */

function setup() {
  buildOptions(regionFilter, [...new Set(conflicts.map((c) => c.region))].sort(), "regions");
  buildOptions(intensityFilter, ["High", "Medium", "Low"], "intensity levels");
  buildOptions(statusFilter, [...new Set(conflicts.map((c) => c.status))].sort(), "statuses");
  applyFilters();
  updateDataSourceUI();
  updateLastFetchDisplay();
  loadLiveData();

  // Auto-refresh every 12 hours
  DataService.scheduleAutoRefresh(() => loadLiveData(true));

  // Update relative time display every 60s
  setInterval(updateLastFetchDisplay, 60000);
}

const refreshBtn = $("refreshBtn");
if (refreshBtn) {
  refreshBtn.addEventListener("click", () => {
    DataService.clearCache();
    loadLiveData();
  });
}

setup();
