/* ── Pulse Atlas – Live Data Service ─────────────────────────────────── */
/* Fetches live news via rss2json.com + Google News RSS feeds            */
/* Falls back to static data gracefully if service is unavailable       */

const DataService = (() => {
  const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
  const GNEWS_RSS = "https://news.google.com/rss/search?hl=en&gl=US&ceid=US:en&q=";

  const CACHE_KEY = "pulse_atlas_cache";
  const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours
  const LAST_FETCH_KEY = "pulse_atlas_last_fetch";

  /* ── Search queries per conflict zone ─────────────────────────────── */

  const NEWS_QUERIES = {
    ua:      "Ukraine+war+frontline",
    sahel:   "Sahel+Mali+Burkina+Faso+conflict",
    sudan:   "Sudan+war+RSF+Darfur",
    gaza:    "Gaza+war+Hamas",
    redsea:  "Houthi+Red+Sea+attack",
    lebanon: "Lebanon+Hezbollah+conflict",
    myanmar: "Myanmar+junta+civil+war",
    drc:     "Congo+DRC+M23+militia",
    andes:   "Colombia+FARC+ELN+conflict",
    haiti:   "Haiti+gang+crisis+violence",
    caucasus:"Armenia+Azerbaijan+conflict",
    ethiopia:"Ethiopia+Amhara+conflict",
    scs:     "South+China+Sea+military",
    taiwan:  "Taiwan+strait+China+military",
    pakafg:  "Pakistan+Afghanistan+TTP+war",
    iran:    "Iran+IRGC+Israel+strikes",
  };

  /* ── Country keywords for matching global articles to zones ────────── */

  const COUNTRY_KEYWORDS = {
    ua:      ["ukraine", "kyiv", "zelensky", "donbas", "crimea"],
    sahel:   ["sahel", "burkina faso", "mali", "niger"],
    sudan:   ["sudan", "khartoum", "darfur", "rsf"],
    gaza:    ["gaza", "hamas", "palestinian"],
    redsea:  ["houthi", "red sea"],
    lebanon: ["hezbollah", "lebanon"],
    myanmar: ["myanmar", "burma"],
    drc:     ["congo", "m23", "goma", "kivu"],
    andes:   ["colombia", "farc", "eln"],
    haiti:   ["haiti"],
    caucasus:["karabakh", "armenia azerbaijan"],
    ethiopia:["ethiopia", "amhara", "fano", "tigray"],
    scs:     ["south china sea", "spratly"],
    taiwan:  ["taiwan strait", "taiwan military"],
    pakafg:  ["pakistan afghanistan", "ttp", "waziristan", "is-k", "iskp"],
    iran:    ["irgc", "iran strike", "iran israel", "isfahan", "hormuz", "iran nuclear"],
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
    } catch { /* Storage full or unavailable */ }
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

  /* ── Fetch news for a single zone via rss2json + Google News ─────── */

  function stripHtml(str) {
    const el = document.createElement("div");
    el.innerHTML = str;
    return el.textContent || "";
  }

  function extractDomain(url) {
    try { return new URL(url).hostname.replace("www.", ""); }
    catch { return ""; }
  }

  async function fetchZoneNews(zoneId, query, maxItems = 8) {
    const rssUrl = GNEWS_RSS + query;
    const apiUrl = RSS2JSON + encodeURIComponent(rssUrl);
    const json = await fetchJSON(apiUrl, 12000);

    if (json.status !== "ok" || !json.items) return [];

    return json.items.slice(0, maxItems).map((item) => ({
      title: stripHtml(item.title || ""),
      url: item.link || "",
      source: item.author || extractDomain(item.link) || "",
      date: item.pubDate ? item.pubDate.split(" ")[0] : "",
      zoneId,
    }));
  }

  /* ── Fetch all zones ─────────────────────────────────────────────── */

  async function fetchAllNews() {
    const cacheKey = "news_all";
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const zoneIds = Object.keys(NEWS_QUERIES);
    const byZone = {};
    const allArticles = [];

    // Fetch in batches of 4 to respect rate limits
    for (let i = 0; i < zoneIds.length; i += 4) {
      const batch = zoneIds.slice(i, i + 4);
      const results = await Promise.allSettled(
        batch.map((id) => fetchZoneNews(id, NEWS_QUERIES[id]))
      );
      batch.forEach((id, idx) => {
        const articles = results[idx].status === "fulfilled" ? results[idx].value : [];
        byZone[id] = articles;
        allArticles.push(...articles);
      });
      // Small delay between batches to avoid throttling
      if (i + 4 < zoneIds.length) {
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    const data = { byZone, allArticles };
    setCache(cacheKey, data);
    return data;
  }

  /* ── Map articles into the report format app.js expects ──────────── */

  function mapArticlesToReports(newsData, conflicts) {
    const mapped = {};
    for (const conflict of conflicts) {
      const articles = newsData.byZone[conflict.id] || [];
      mapped[conflict.id] = articles.slice(0, 5).map((a, i) => ({
        id: `news_${conflict.id}_${i}`,
        title: a.title,
        date: a.date,
        countries: [conflict.name],
        source: a.source,
        url: a.url,
      }));
    }
    return mapped;
  }

  function buildAllReportsList(newsData, conflicts) {
    const seen = new Set();
    const all = [];

    for (const conflict of conflicts) {
      for (const a of (newsData.byZone[conflict.id] || [])) {
        if (seen.has(a.url)) continue;
        seen.add(a.url);
        all.push({
          id: `news_${all.length}`,
          title: a.title,
          date: a.date,
          countries: [conflict.name],
          source: a.source,
          url: a.url,
        });
      }
    }

    return all.sort((a, b) => b.date.localeCompare(a.date));
  }

  /* ── Public API ──────────────────────────────────────────────────── */

  return {
    async fetchAll(baseConflicts) {
      const sources = { live: false };
      let reports = {};
      let rwReports = [];

      try {
        const newsData = await fetchAllNews();
        reports = mapArticlesToReports(newsData, baseConflicts);
        rwReports = buildAllReportsList(newsData, baseConflicts);
        sources.live = true;
      } catch (err) {
        console.warn("News fetch failed:", err.message);
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
      } catch { return null; }
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
      } catch { /* ignore */ }
    },
  };
})();
