/* ── Pulse Atlas – Live Data Service ─────────────────────────────────── */
/* Fetches live news from GDELT DOC 2.0 API (free, CORS-enabled, no auth) */
/* Falls back to static data gracefully if API is unavailable */

const DataService = (() => {
  const GDELT_BASE = "https://api.gdeltproject.org/api/v2/doc/doc";

  const CACHE_KEY = "pulse_atlas_cache";
  const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours
  const LAST_FETCH_KEY = "pulse_atlas_last_fetch";

  /* ── Search queries per conflict zone ─────────────────────────────── */

  const GDELT_QUERIES = {
    ua: "Ukraine war conflict",
    sahel: "Sahel Mali Burkina Faso Niger conflict",
    sudan: "Sudan war conflict Darfur",
    gaza: "Gaza conflict Israel Palestine",
    redsea: "Yemen Houthi Red Sea",
    lebanon: "Lebanon Hezbollah conflict",
    myanmar: "Myanmar military conflict",
    drc: "Congo DRC conflict militia",
    andes: "Colombia conflict FARC guerrilla",
    haiti: "Haiti gang violence crisis",
    caucasus: "Armenia Azerbaijan Nagorno-Karabakh",
    ethiopia: "Ethiopia conflict Tigray Amhara",
    scs: "South China Sea dispute military",
    taiwan: "Taiwan strait China military tension",
  };

  /* ── Country keywords for matching articles to conflict zones ────── */

  const COUNTRY_KEYWORDS = {
    ua: ["ukraine", "kyiv", "kiev"],
    sahel: ["mali", "burkina", "niger", "sahel"],
    sudan: ["sudan", "khartoum", "darfur"],
    gaza: ["gaza", "palestinian", "hamas"],
    redsea: ["yemen", "houthi", "red sea"],
    lebanon: ["lebanon", "hezbollah", "beirut"],
    myanmar: ["myanmar", "burma"],
    drc: ["congo", "drc", "kinshasa"],
    andes: ["colombia", "bogota", "farc"],
    haiti: ["haiti", "port-au-prince"],
    caucasus: ["armenia", "azerbaijan", "karabakh"],
    ethiopia: ["ethiopia", "tigray", "amhara"],
    scs: ["south china sea", "spratlys", "philippines"],
    taiwan: ["taiwan", "strait"],
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

  /* ── GDELT DOC 2.0: Global news articles ─────────────────────────── */

  async function fetchGDELTArticles(query, maxRecords = 15) {
    const url =
      `${GDELT_BASE}?query=${encodeURIComponent(query)}` +
      `&mode=ArtList&format=json&maxrecords=${maxRecords}` +
      `&timespan=2w&sort=DateDesc`;
    const json = await fetchJSON(url, 12000);
    return (json.articles || []).map((a) => ({
      title: a.title || "",
      url: a.url || "",
      source: a.domain || a.source || "",
      date: a.seendate ? a.seendate.slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3") : "",
      image: a.socialimage || "",
      language: a.language || "English",
    }));
  }

  async function fetchAllGDELT() {
    const cacheKey = "gdelt_all";
    const cached = getCache(cacheKey);
    if (cached) return cached;

    // Fetch a global conflict query + per-zone queries in parallel
    const globalQuery = "conflict war crisis humanitarian casualties";
    const zoneIds = Object.keys(GDELT_QUERIES);

    const fetches = [
      fetchGDELTArticles(globalQuery, 20),
      ...zoneIds.map((id) => fetchGDELTArticles(GDELT_QUERIES[id], 8)),
    ];

    const results = await Promise.allSettled(fetches);

    const globalArticles = results[0].status === "fulfilled" ? results[0].value : [];

    // Map articles by conflict zone
    const byZone = {};
    zoneIds.forEach((id, idx) => {
      const zoneResult = results[idx + 1];
      byZone[id] = zoneResult.status === "fulfilled" ? zoneResult.value : [];
    });

    // Also assign global articles to zones by keyword matching
    for (const article of globalArticles) {
      const titleLower = (article.title || "").toLowerCase();
      for (const [id, keywords] of Object.entries(COUNTRY_KEYWORDS)) {
        if (keywords.some((kw) => titleLower.includes(kw))) {
          if (!byZone[id]) byZone[id] = [];
          // Avoid duplicates by URL
          if (!byZone[id].some((a) => a.url === article.url)) {
            byZone[id].push(article);
          }
        }
      }
    }

    const data = { globalArticles, byZone };
    setCache(cacheKey, data);
    return data;
  }

  /* ── Map GDELT articles into the report format app.js expects ──── */

  function mapArticlesToReports(gdeltData, conflicts) {
    const mapped = {};
    for (const conflict of conflicts) {
      const articles = gdeltData.byZone[conflict.id] || [];
      mapped[conflict.id] = articles.slice(0, 5).map((a, i) => ({
        id: `gdelt_${conflict.id}_${i}`,
        title: a.title,
        date: a.date,
        countries: [conflict.name],
        source: a.source,
        url: a.url,
      }));
    }
    return mapped;
  }

  function buildAllReportsList(gdeltData, conflicts) {
    // Combine global + zone articles, deduplicate, sort by date
    const seen = new Set();
    const all = [];

    const addArticle = (a, conflictId) => {
      if (seen.has(a.url)) return;
      seen.add(a.url);
      const conflict = conflicts.find((c) => c.id === conflictId);
      all.push({
        id: `gdelt_${all.length}`,
        title: a.title,
        date: a.date,
        countries: conflict ? [conflict.name] : [],
        source: a.source,
        url: a.url,
      });
    };

    // Zone articles first (more relevant)
    for (const conflict of conflicts) {
      for (const a of (gdeltData.byZone[conflict.id] || [])) {
        addArticle(a, conflict.id);
      }
    }
    // Then global
    for (const a of gdeltData.globalArticles || []) {
      addArticle(a, null);
    }

    return all.sort((a, b) => b.date.localeCompare(a.date));
  }

  /* ── Public API ──────────────────────────────────────────────────── */

  return {
    /**
     * Fetch all live data and return enrichment objects.
     * Returns { conflicts, reports, sources } — same shape as before.
     */
    async fetchAll(baseConflicts) {
      const sources = { gdelt: false, ucdp: false, reliefweb: false };
      let reports = {};
      let rwReports = [];

      try {
        const gdeltData = await fetchAllGDELT();
        reports = mapArticlesToReports(gdeltData, baseConflicts);
        rwReports = buildAllReportsList(gdeltData, baseConflicts);
        sources.gdelt = true;
      } catch (err) {
        console.warn("GDELT fetch failed:", err.message);
      }

      // Persist fetch timestamp
      try {
        localStorage.setItem(LAST_FETCH_KEY, String(Date.now()));
      } catch { /* ignore */ }

      return {
        conflicts: baseConflicts,
        reports,
        sources: { ...sources, rwReports },
      };
    },

    getLastFetchTime() {
      try {
        const ts = localStorage.getItem(LAST_FETCH_KEY);
        return ts ? Number(ts) : null;
      } catch {
        return null;
      }
    },

    scheduleAutoRefresh(callback, intervalMs = 12 * 60 * 60 * 1000) {
      const id = setInterval(callback, intervalMs);
      return () => clearInterval(id);
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
