/* ── Pulse Atlas – Live Data Service ─────────────────────────────────── */
/* Fetches from UCDP (conflict events) and ReliefWeb (humanitarian reports) */
/* Falls back to static data gracefully if APIs are unavailable */

const DataService = (() => {
  const UCDP_BASE = "https://ucdpapi.pcr.uu.se/api";
  const UCDP_VERSION = "24.0.10";
  const RW_BASE = "https://api.reliefweb.int/v1";

  const CACHE_KEY = "pulse_atlas_cache";
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour

  /* ── Country mappings ────────────────────────────────────────────── */

  // UCDP uses specific country names in its dataset
  const UCDP_COUNTRIES = {
    ua: ["Ukraine"],
    sahel: ["Mali", "Burkina Faso", "Niger"],
    sudan: ["Sudan"],
    gaza: ["Israel"],
    redsea: ["Yemen"],
    lebanon: ["Lebanon"],
    myanmar: ["Myanmar (Burma)"],
    drc: ["DR Congo (Zaire)"],
    andes: ["Colombia"],
    haiti: ["Haiti"],
    caucasus: ["Armenia", "Azerbaijan"],
    ethiopia: ["Ethiopia"],
    scs: [],
    taiwan: [],
  };

  // ReliefWeb country names for filtering reports
  const RW_COUNTRIES = {
    ua: "Ukraine",
    sahel: "Mali",
    sudan: "Sudan",
    gaza: "occupied Palestinian territory",
    redsea: "Yemen",
    lebanon: "Lebanon",
    myanmar: "Myanmar",
    drc: "Democratic Republic of the Congo",
    andes: "Colombia",
    haiti: "Haiti",
    caucasus: "Azerbaijan",
    ethiopia: "Ethiopia",
    scs: "Philippines",
    taiwan: "China",
  };

  /* ── Cache ───────────────────────────────────────────────────────── */

  function getCache(key) {
    try {
      const raw = localStorage.getItem(CACHE_KEY + "_" + key);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) return null;
      return data;
    } catch {
      return null;
    }
  }

  function setCache(key, data) {
    try {
      localStorage.setItem(
        CACHE_KEY + "_" + key,
        JSON.stringify({ data, ts: Date.now() })
      );
    } catch {
      // Storage full or unavailable — ignore
    }
  }

  /* ── Fetch with timeout ──────────────────────────────────────────── */

  async function fetchJSON(url, timeoutMs = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  /* ── UCDP: Georeferenced Event Data ─────────────────────────────── */

  async function fetchUCDPEvents(year) {
    const cacheKey = `ucdp_${year}`;
    const cached = getCache(cacheKey);
    if (cached) return cached;

    // Fetch events aggregated across all pages (up to 3 pages = 3000 events)
    const allEvents = [];
    for (let page = 0; page < 3; page++) {
      const url =
        `${UCDP_BASE}/gedevents/${UCDP_VERSION}` +
        `?pagesize=1000&page=${page}&Year=${year}`;
      const json = await fetchJSON(url, 15000);
      if (!json.Result || json.Result.length === 0) break;
      allEvents.push(...json.Result);
      if (json.Result.length < 1000) break;
    }

    // Aggregate by country: total fatalities, event count, latest events
    const byCountry = {};
    for (const ev of allEvents) {
      const country = ev.country;
      if (!byCountry[country]) {
        byCountry[country] = {
          country,
          totalDeaths: 0,
          civilianDeaths: 0,
          eventCount: 0,
          events: [],
        };
      }
      const c = byCountry[country];
      c.totalDeaths += ev.best || 0;
      c.civilianDeaths += ev.deaths_civilians || 0;
      c.eventCount++;
      if (c.events.length < 5) {
        c.events.push({
          date: ev.date_start,
          deaths: ev.best || 0,
          location: ev.where_description || "",
          type: ev.type_of_violence,
          sideA: ev.side_a || "",
          sideB: ev.side_b || "",
        });
      }
    }

    setCache(cacheKey, byCountry);
    return byCountry;
  }

  // Fetch multiple years and merge
  async function fetchUCDPMultiYear(years) {
    const merged = {};
    const results = await Promise.allSettled(years.map((y) => fetchUCDPEvents(y)));
    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      for (const [country, data] of Object.entries(result.value)) {
        if (!merged[country]) {
          merged[country] = { ...data, events: [...data.events] };
        } else {
          merged[country].totalDeaths += data.totalDeaths;
          merged[country].civilianDeaths += data.civilianDeaths;
          merged[country].eventCount += data.eventCount;
          merged[country].events.push(...data.events);
        }
      }
    }
    // Sort events by date descending, keep top 5
    for (const c of Object.values(merged)) {
      c.events.sort((a, b) => b.date.localeCompare(a.date));
      c.events = c.events.slice(0, 5);
    }
    return merged;
  }

  /* ── ReliefWeb: Humanitarian reports ─────────────────────────────── */

  async function fetchReliefWebReports(countries, limit = 30) {
    const cacheKey = "rw_reports";
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const countryNames = [...new Set(Object.values(countries))];

    // Build filter for multiple countries
    const countryFilter = countryNames
      .map((c) => `filter[conditions][0][conditions][][field]=country&filter[conditions][0][conditions][][value]=${encodeURIComponent(c)}`)
      .join("&");

    const url =
      `${RW_BASE}/reports?appname=pulse-atlas-observatory&limit=${limit}` +
      `&preset=latest` +
      `&filter[conditions][0][operator]=OR&${countryFilter}` +
      `&fields[include][]=title` +
      `&fields[include][]=date` +
      `&fields[include][]=country` +
      `&fields[include][]=source` +
      `&fields[include][]=url` +
      `&sort[]=date.created:desc`;

    const json = await fetchJSON(url, 12000);
    const reports = (json.data || []).map((r) => ({
      id: r.id,
      title: r.fields?.title || "",
      date: r.fields?.date?.created?.split("T")[0] || "",
      countries: (r.fields?.country || []).map((c) => c.name),
      source: (r.fields?.source || []).map((s) => s.shortname || s.name).join(", "),
      url: r.fields?.url || "",
    }));

    setCache(cacheKey, reports);
    return reports;
  }

  /* ── Enrich conflicts with live data ─────────────────────────────── */

  function enrichConflicts(conflicts, ucdpData) {
    return conflicts.map((conflict) => {
      const countries = UCDP_COUNTRIES[conflict.id] || [];
      let liveDeaths = 0;
      let liveCivilianDeaths = 0;
      let liveEventCount = 0;
      const liveEvents = [];

      for (const countryName of countries) {
        const d = ucdpData[countryName];
        if (!d) continue;
        liveDeaths += d.totalDeaths;
        liveCivilianDeaths += d.civilianDeaths;
        liveEventCount += d.eventCount;
        liveEvents.push(...d.events);
      }

      if (liveEventCount === 0) return conflict;

      // Sort and trim live events
      liveEvents.sort((a, b) => b.date.localeCompare(a.date));
      const topEvents = liveEvents.slice(0, 5);

      return {
        ...conflict,
        ucdpDeaths: liveDeaths,
        ucdpCivilianDeaths: liveCivilianDeaths,
        ucdpEventCount: liveEventCount,
        ucdpEvents: topEvents,
        dataSource: "ucdp",
      };
    });
  }

  /* ── Map ReliefWeb reports to our conflicts ──────────────────────── */

  function mapReportsToConflicts(reports, conflicts) {
    const mapped = {};
    for (const conflict of conflicts) {
      const rwCountry = RW_COUNTRIES[conflict.id];
      if (!rwCountry) continue;
      mapped[conflict.id] = reports.filter((r) =>
        r.countries.some(
          (c) => c.toLowerCase().includes(rwCountry.toLowerCase()) ||
                 rwCountry.toLowerCase().includes(c.toLowerCase())
        )
      );
    }
    return mapped;
  }

  /* ── Public API ──────────────────────────────────────────────────── */

  return {
    /**
     * Fetch all live data and return enrichment objects.
     * Returns { conflicts, reports, sources } where:
     *   - conflicts: enriched conflict array
     *   - reports: ReliefWeb reports mapped by conflict ID
     *   - sources: { ucdp: bool, reliefweb: bool } indicating what loaded
     */
    async fetchAll(baseConflicts) {
      const sources = { ucdp: false, reliefweb: false, ucdpYear: null };
      let enrichedConflicts = baseConflicts;
      let reports = {};

      // Determine years to fetch (current and previous, as UCDP has lag)
      const currentYear = new Date().getFullYear();
      const years = [currentYear, currentYear - 1, currentYear - 2];

      // Fetch UCDP and ReliefWeb in parallel
      const [ucdpResult, rwResult] = await Promise.allSettled([
        fetchUCDPMultiYear(years),
        fetchReliefWebReports(RW_COUNTRIES),
      ]);

      if (ucdpResult.status === "fulfilled") {
        enrichedConflicts = enrichConflicts(baseConflicts, ucdpResult.value);
        sources.ucdp = true;
        sources.ucdpYear = years.join("-");
      } else {
        console.warn("UCDP fetch failed:", ucdpResult.reason?.message);
      }

      if (rwResult.status === "fulfilled") {
        reports = mapReportsToConflicts(rwResult.value, baseConflicts);
        sources.reliefweb = true;
        sources.rwReports = rwResult.value;
      } else {
        console.warn("ReliefWeb fetch failed:", rwResult.reason?.message);
      }

      return { conflicts: enrichedConflicts, reports, sources };
    },

    clearCache() {
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith(CACHE_KEY))
          .forEach((k) => localStorage.removeItem(k));
      } catch {
        // ignore
      }
    },
  };
})();
