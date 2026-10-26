/* ==========================================================================
RIVERNET 39-STATION SMART UPGRADE MODULE
Drop-in upgrade for Rivers tab.
Keeps existing UI/UX language:
- animated wave cards for dangerous stations
- compact FloodSupport-style rows for normal stations
- interactive gauge map
- status summary + one-tap filters
========================================================================== */

(function () {
  if (typeof state === "undefined" || typeof PROFILES === "undefined") return;

  state.riverStatusFilter = state.riverStatusFilter || "all";
  state.lastRiverStations = state.lastRiverStations || [];
  state.riverMap = state.riverMap || null;
  state.riverMarkerGroup = state.riverMarkerGroup || null;

  const BASIN_ALIASES = {
    south: ["nilwala", "gin"],
    dry: ["mahaweli"]
  };

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function num(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function riverStatusColor(cls) {
    if (cls === "red") return "#ef4444";
    if (cls === "orange") return "#f97316";
    if (cls === "yellow") return "#facc15";
    if (cls === "gray") return "#64748b";
    return "#10b981";
  }

  function getBasinLabel(profile, key) {
    if (!key) return "Basin";
    if (profile?.basins?.[key]) return profile.basins[key];
    if (key === "all") return "All Basins";
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  function basinMatchesFilter(river, filter) {
    if (!filter || filter === "all") return true;
    if (BASIN_ALIASES[filter]) return BASIN_ALIASES[filter].includes(river.basinGroup);
    return river.basinGroup === filter;
  }

  function matchesRiverStatusFilter(river, filter) {
    if (!filter || filter === "all") return true;
    if (filter === "attention") return river.status.rank >= 1;
    if (filter === "official") return river.thresholdSource !== "provisional";
    if (filter === "provisional") return river.thresholdSource === "provisional";
    return river.status.key === filter;
  }

  function resolveRiverLevel(river, rain24h) {
    const live = state.liveSriLankaGauges?.[river.id];
    let level = null;
    let source = "model";

    if (live && Number.isFinite(parseFloat(live.level))) {
      level = parseFloat(live.level);
      source = "live";
    } else if (Number.isFinite(river.normalLvl)) {
      level = river.normalLvl + (num(rain24h) || 0) * 0.015;
      source = river.thresholdSource === "provisional" ? "provisional-model" : "model";
    }

    if (level != null && Number.isFinite(river.alertLvl)) {
      if (state.simMode === "yellow") level = Math.max(level, river.alertLvl + 0.15);
      else if (state.simMode === "orange") level = Math.max(level, river.minorLvl + 0.25);
      else if (state.simMode === "red") level = Math.max(level, river.majorLvl + 0.45);

      if (Number.isFinite(river.maxScale)) {
        level = clamp(level, 0.1, river.maxScale * 0.96);
      }
    }

    return { level, source };
  }

  function getRiverStatus(river, level) {
    if (level == null || !Number.isFinite(river.alertLvl)) {
      return { key: "pending", label: "PENDING SYNC", cls: "gray", rank: -1 };
    }

    if (level >= river.majorLvl) return { key: "major", label: "🔴 MAJOR FLOOD", cls: "red", rank: 3 };
    if (level >= river.minorLvl) return { key: "minor", label: "🟠 MINOR FLOOD", cls: "orange", rank: 2 };
    if (level >= river.alertLvl) return { key: "alert", label: "🟡 ALERT LEVEL", cls: "yellow", rank: 1 };
    return { key: "normal", label: "NORMAL", cls: "green", rank: 0 };
  }

  function riverSourceTag(source) {
    if (source === "live") return `<span style="color:#34d399; font-weight:700;">● Live Irrigation Gauge</span>`;
    if (source === "model") return `<span style="color:#38bdf8; font-weight:700;">● GloFAS / Rainfall Model</span>`;
    if (source === "provisional-model") return `<span style="color:#fbbf24; font-weight:700;">● Provisional Model Threshold</span>`;
    return `<span style="color:#94a3b8;">● Pending official gauge sync</span>`;
  }

  function renderRiverSummaryBar(counts) {
    const items = [
      { label: "All Stations", value: counts.all, cls: "blue" },
      { label: "Needs Attention", value: counts.attention, cls: counts.attention > 0 ? "orange" : "green" },
      { label: "Alert", value: counts.alert, cls: "yellow" },
      { label: "Minor Flood", value: counts.minor, cls: "orange" },
      { label: "Major Flood", value: counts.major, cls: "red" },
      { label: "Normal", value: counts.normal, cls: "green" },
      { label: "Pending", value: counts.pending, cls: "gray" },
      { label: "Official", value: counts.official, cls: "blue" },
      { label: "Provisional", value: counts.provisional, cls: "gray" }
    ];

    return `
      <div class="river-summary-bar">
        ${items.map(item => `
          <div class="river-summary-item ${item.cls}">
            <div class="river-summary-value mono">${item.value}</div>
            <div class="river-summary-label">${esc(item.label)}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderRiverStatusFilters(counts) {
    const filters = [
      { key: "all", label: "All", count: counts.all },
      { key: "attention", label: "⚠ Needs Attention", count: counts.attention },
      { key: "alert", label: "🟡 Alert", count: counts.alert },
      { key: "minor", label: "🟠 Minor Flood", count: counts.minor },
      { key: "major", label: "🔴 Major Flood", count: counts.major },
      { key: "normal", label: "✅ Normal", count: counts.normal },
      { key: "pending", label: "⏳ Pending", count: counts.pending },
      { key: "official", label: "🏛 Official", count: counts.official },
      { key: "provisional", label: "🧪 Provisional", count: counts.provisional }
    ];

    return `
      <div class="filter-pills river-status-filters">
        ${filters.map(f => `
          <button class="river-status-btn ${state.riverStatusFilter === f.key ? "active" : ""}" data-status="${f.key}">
            ${esc(f.label)} <span class="river-filter-count">(${f.count})</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderRiverBasinFilters(container, rivers, profile) {
    const keys = ["all", ...Array.from(new Set(rivers.map(r => r.basinGroup).filter(Boolean)))];

    if (!keys.includes(state.basinFilter) && !BASIN_ALIASES[state.basinFilter]) {
      state.basinFilter = "all";
    }

    container.innerHTML = keys.map(key => {
      const label = key === "all" ? `All Stations (${rivers.length})` : getBasinLabel(profile, key);
      const active = state.basinFilter === key;
      return `<button class="filter-btn ${active ? "active" : ""}" data-filter="${esc(key)}">${esc(label)}</button>`;
    }).join("");
  }

  function riverCardHTML(r) {
    const level = r.level;
    const levelText = level == null ? "--" : level.toFixed(2);
    const unit = r.unit || "m";

    let dualUnitStr = "--";
    if (level != null) {
      if (unit === "m") dualUnitStr = `${(level * 3.28084).toFixed(1)} ft`;
      else if (unit === "ft") dualUnitStr = `${(level * 0.3048).toFixed(2)} m`;
    }

    const fillPct = level != null && Number.isFinite(r.maxScale)
      ? clamp((level / r.maxScale) * 100, 18, 94)
      : 18;

    const waveColor = r.status.cls === "red"
      ? "rgba(239, 68, 68, 0.58)"
      : r.status.cls === "orange"
        ? "rgba(249, 115, 22, 0.52)"
        : r.status.cls === "yellow"
          ? "rgba(250, 204, 21, 0.48)"
          : r.status.cls === "gray"
            ? "rgba(100, 116, 139, 0.35)"
            : "rgba(16, 185, 129, 0.42)";

    const alertText = Number.isFinite(r.alertLvl) ? `${r.alertLvl}${unit}` : "--";
    const minorText = Number.isFinite(r.minorLvl) ? `${r.minorLvl}${unit}` : "--";
    const majorText = Number.isFinite(r.majorLvl) ? `${r.majorLvl}${unit}` : "--";

    return `
      <div class="river-card status-${r.status.cls}">
        <div class="water-tank" style="height: ${fillPct}%;">
          <svg class="water-wave-svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,0 300,120 600,60 C900,0 900,120 1200,60 L1200,120 L0,120 Z" fill="${waveColor}"></path>
          </svg>
          <div class="water-body" style="background: ${waveColor};"></div>
        </div>

        <div class="river-content-top">
          <div class="river-header">
            <div>
              <div class="river-name">${esc(r.name)}</div>
              <div class="river-station"><i class="ph-fill ph-map-pin"></i> ${esc(r.station)}</div>
            </div>
            <div class="sev-stack">
              <span class="sev-pill ${r.status.cls}">${esc(r.status.label)}</span>
              ${r.thresholdSource === "provisional" ? `<span class="prov-tag">PROVISIONAL</span>` : ""}
            </div>
          </div>

          <span class="sub-basin-tag">${esc(r.basinName || r.basinGroup)}</span>

          <div>
            <a href="${esc(r.rivernetUrl || "https://rivernet.lk")}" target="_blank" rel="noopener" class="rivernet-ext-link">
              <i class="ph-bold ph-arrow-square-out"></i> Verify on Official Portal
            </a>
          </div>
        </div>

        <div class="river-content-bottom">
          <div class="river-readings">
            <div>
              <span class="water-level-val mono">${levelText}</span>
              <span class="water-level-unit">${esc(unit)} <span style="opacity:0.75;">(${dualUnitStr})</span></span>
            </div>
            <div class="discharge-info">
              <div>${riverSourceTag(r.source)}</div>
              <div>Alert: <strong>${alertText}</strong> • Minor: <strong>${minorText}</strong></div>
              <div>Major Flood: <strong>${majorText}</strong></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function riverRowHTML(r) {
    const level = r.level;
    const levelText = level == null ? "--" : level.toFixed(2);
    const unit = r.unit || "m";
    const max = Number.isFinite(r.maxScale) ? r.maxScale : 1;

    const pct = level != null ? clamp((level / max) * 100, 2, 100) : 0;
    const alertPct = Number.isFinite(r.alertLvl) ? clamp((r.alertLvl / max) * 100, 0, 100) : null;
    const minorPct = Number.isFinite(r.minorLvl) ? clamp((r.minorLvl / max) * 100, 0, 100) : null;
    const majorPct = Number.isFinite(r.majorLvl) ? clamp((r.majorLvl / max) * 100, 0, 100) : null;

    return `
      <div class="river-row status-${r.status.cls}">
        <div class="river-row-info">
          <div class="river-row-name">
            ${esc(r.name)}
            ${r.thresholdSource === "provisional" ? `<span class="prov-tag small">PROV</span>` : ""}
          </div>
          <div class="river-row-sub">
            ${esc(r.station)} • ${esc(r.basinName || r.basinGroup)}
          </div>
        </div>

        <div class="river-row-meter">
          <div class="river-threshold-track">
            <div class="river-threshold-fill" style="width:${pct}%; background:${riverStatusColor(r.status.cls)};"></div>
            ${alertPct != null ? `<span class="river-threshold-mark alert" style="left:${alertPct}%;" title="Alert Level"></span>` : ""}
            ${minorPct != null ? `<span class="river-threshold-mark minor" style="left:${minorPct}%;" title="Minor Flood"></span>` : ""}
            ${majorPct != null ? `<span class="river-threshold-mark major" style="left:${majorPct}%;" title="Major Flood"></span>` : ""}
          </div>

          <div class="river-row-readout">
            <span class="mono river-row-level">${levelText} ${esc(unit)}</span>
            <span class="sev-pill ${r.status.cls}">${esc(r.status.label)}</span>
          </div>
        </div>
      </div>
    `;
  }

  function removeRiverMap() {
    if (state.riverMap) {
      try { state.riverMap.remove(); } catch (e) {}
      state.riverMap = null;
      state.riverMarkerGroup = null;
    }
  }

  function initOrUpdateRiverMap(stations) {
    const mapDiv = document.getElementById("river-map");
    if (!mapDiv) return;

    removeRiverMap();

    if (typeof L === "undefined") {
      mapDiv.innerHTML = `<div class="river-map-fallback">Leaflet map library is not loaded. Radar tab may also be affected.</div>`;
      return;
    }

    state.riverMap = L.map(mapDiv, {
      zoomControl: true,
      attributionControl: false
    }).setView([7.5, 80.4], 7);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18
    }).addTo(state.riverMap);

    state.riverMarkerGroup = L.layerGroup().addTo(state.riverMap);

    const bounds = [];

    (stations || []).forEach(r => {
      if (!Number.isFinite(r.lat) || !Number.isFinite(r.lon)) return;

      const color = riverStatusColor(r.status.cls);
      const radius = r.status.rank >= 1 ? 9 : 6;

      const popup = `
        <div style="min-width:190px;">
          <strong>${esc(r.name)}</strong><br>
          <span style="opacity:0.8;">${esc(r.station)}</span><br><br>
          Level: <strong>${r.level == null ? "--" : r.level.toFixed(2)} ${esc(r.unit || "m")}</strong><br>
          Status: <strong>${esc(r.status.label)}</strong><br>
          Source: <strong>${esc(r.source)}</strong><br>
          Threshold: <strong>${r.thresholdSource === "provisional" ? "Provisional" : "Official"}</strong>
        </div>
      `;

      L.circleMarker([r.lat, r.lon], {
        radius,
        color,
        fillColor: color,
        fillOpacity: 0.85,
        weight: 2
      }).bindPopup(popup).addTo(state.riverMarkerGroup);

      bounds.push([r.lat, r.lon]);
    });

    if (bounds.length > 1) {
      state.riverMap.fitBounds(bounds, { padding: [35, 35], maxZoom: 10 });
    } else if (bounds.length === 1) {
      state.riverMap.setView(bounds[0], 9);
    }
  }

  function renderRiverStationsUpgraded(rain24h) {
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;
    const container = document.getElementById("rivers-container");
    if (!container) return "green";

    removeRiverMap();
    container.innerHTML = "";

    const rivers = profile.rivers || [];

    const countBadge = document.getElementById("river-count-badge");
    if (countBadge) countBadge.textContent = rivers.length;

    const basinFiltersEl = document.getElementById("basin-filters");
    if (basinFiltersEl) {
      basinFiltersEl.style.display = state.countryCode === "LK" ? "flex" : "none";
      if (state.countryCode === "LK") renderRiverBasinFilters(basinFiltersEl, rivers, profile);
    }

    const directBtn = document.getElementById("rivernet-direct-btn");
    if (directBtn) directBtn.style.display = state.countryCode === "LK" ? "inline-flex" : "none";

    const hubTitle = document.getElementById("river-hub-title");
    if (hubTitle) {
      hubTitle.textContent = state.countryCode === "LK"
        ? "Sri Lanka Irrigation Dept & RiverNet.lk Live Gauge Telemetry — 39 Station Registry"
        : `${profile.name} (${profile.agency}) River & Watershed Telemetry`;
    }

    const enriched = rivers.map(river => {
      const resolved = resolveRiverLevel(river, rain24h);
      const status = getRiverStatus(river, resolved.level);
      return {
        ...river,
        basinName: getBasinLabel(profile, river.basinGroup),
        level: resolved.level,
        source: resolved.source,
        status
      };
    });

    state.lastRiverStations = enriched;

    const basinFiltered = enriched.filter(r => basinMatchesFilter(r, state.basinFilter));

    const counts = {
      all: basinFiltered.length,
      attention: basinFiltered.filter(r => r.status.rank >= 1).length,
      alert: basinFiltered.filter(r => r.status.key === "alert").length,
      minor: basinFiltered.filter(r => r.status.key === "minor").length,
      major: basinFiltered.filter(r => r.status.key === "major").length,
      normal: basinFiltered.filter(r => r.status.key === "normal").length,
      pending: basinFiltered.filter(r => r.status.key === "pending").length,
      official: basinFiltered.filter(r => r.thresholdSource !== "provisional").length,
      provisional: basinFiltered.filter(r => r.thresholdSource === "provisional").length
    };

    const filtered = basinFiltered.filter(r => matchesRiverStatusFilter(r, state.riverStatusFilter));

    const attention = filtered
      .filter(r => r.status.rank >= 1)
      .sort((a, b) => {
        const rankDiff = b.status.rank - a.status.rank;
        if (rankDiff !== 0) return rankDiff;
        const aRatio = a.level != null && Number.isFinite(a.alertLvl) ? a.level / Math.max(a.alertLvl, 0.1) : 0;
        const bRatio = b.level != null && Number.isFinite(b.alertLvl) ? b.level / Math.max(b.alertLvl, 0.1) : 0;
        return bRatio - aRatio;
      });

    const normal = filtered
      .filter(r => r.status.key === "normal")
      .sort((a, b) => (b.level || 0) - (a.level || 0));

    const pending = filtered
      .filter(r => r.status.key === "pending")
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));

    const rankToLevel = { 1: "yellow", 2: "orange", 3: "red" };
    let worstAllRank = 0;
    let worstOfficialRank = 0;

    enriched.forEach(r => {
      if (r.status.rank > worstAllRank) worstAllRank = r.status.rank;
      if (r.thresholdSource !== "provisional" && r.status.rank > worstOfficialRank) worstOfficialRank = r.status.rank;
    });

    const hasOfficial = enriched.some(r => r.thresholdSource !== "provisional");
    const worstRank = hasOfficial ? worstOfficialRank : worstAllRank;
    const worst = ["green", "yellow", "orange", "red"][worstRank] || "green";

    container.innerHTML = `
      ${renderRiverSummaryBar(counts)}
      ${renderRiverStatusFilters(counts)}

      ${counts.provisional > 0 ? `
        <div class="river-disclaimer">
          Smart safety mode: official stations control the master emergency banner. Provisional stations are model-assisted and shown for early awareness only. Verify with Irrigation Department / RiverNet.lk before emergency action.
        </div>
      ` : ""}

      <section class="river-section">
        <div class="section-header">
          <div class="section-title">⚠ Needs Attention / Flood Status</div>
          <span class="region-focus-lbl">${attention.length} station(s)</span>
        </div>

        ${attention.length > 0
          ? `<div class="rivers-grid">${attention.map(riverCardHTML).join("")}</div>`
          : `<div class="river-empty glass">No station is currently above Alert level in this filter.</div>`
        }
      </section>

      <div class="river-split">
        <div class="river-list-col">
          <section class="river-section">
            <div class="section-header">
              <div class="section-title">✅ Normal Levels</div>
              <span class="region-focus-lbl">${normal.length} station(s)</span>
            </div>

            ${normal.length > 0
              ? `<div class="river-list">${normal.map(riverRowHTML).join("")}</div>`
              : `<div class="river-empty glass">No normal-level stations in this filter.</div>`
            }
          </section>

          ${pending.length > 0 ? `
            <section class="river-section" style="margin-top:14px;">
              <div class="section-header">
                <div class="section-title">⏳ Pending Official Threshold Sync</div>
                <span class="region-focus-lbl">${pending.length} station(s)</span>
              </div>
              <div class="river-list">${pending.map(riverRowHTML).join("")}</div>
            </section>
          ` : ""}
        </div>

        <div class="river-map-col">
          <div class="section-header">
            <div class="section-title">🗺 Interactive Gauge Map</div>
            <span class="region-focus-lbl">Live station positions</span>
          </div>
          <div class="river-map-box">
            <div id="river-map"></div>
          </div>
        </div>
      </div>
    `;

    if (state.activeTab === "rivers") {
      setTimeout(() => initOrUpdateRiverMap(filtered), 80);
    }

    return worst;
  }

  window.renderRiverStations = renderRiverStationsUpgraded;

  const originalSwitchViewTab = window.switchViewTab;
  window.switchViewTab = function (tabId) {
    if (typeof originalSwitchViewTab === "function") originalSwitchViewTab(tabId);

    if (tabId === "rivers") {
      setTimeout(() => {
        if (state.riverMap) {
          state.riverMap.invalidateSize();
        } else {
          initOrUpdateRiverMap(state.lastRiverStations || []);
        }
      }, 160);
    }
  };

  document.addEventListener("click", (e) => {
    const basinBtn = e.target.closest("#basin-filters .filter-btn");
    if (basinBtn) {
      document.querySelectorAll("#basin-filters .filter-btn").forEach(b => b.classList.remove("active"));
      basinBtn.classList.add("active");
      state.basinFilter = basinBtn.dataset.filter;
      if (typeof renderEverything === "function") renderEverything();
      return;
    }

    const statusBtn = e.target.closest(".river-status-btn");
    if (statusBtn) {
      document.querySelectorAll(".river-status-btn").forEach(b => b.classList.remove("active"));
      statusBtn.classList.add("active");
      state.riverStatusFilter = statusBtn.dataset.status;
      if (typeof renderEverything === "function") renderEverything();
    }
  });

  setTimeout(() => {
    if (typeof renderEverything === "function") renderEverything();
  }, 0);
})();
