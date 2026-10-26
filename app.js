/* ==========================================================================
   ATMOSPHERE GLOBAL PRO — SMART NEARBY RIVER + AUTO LOCATION + SMOOTH FX
   Full replacement app.js
   ========================================================================== */

(() => {
  "use strict";

  if (window.__AtmosphereAppLoaded) return;
  window.__AtmosphereAppLoaded = true;

  /* -----------------------------
     Helpers
  ----------------------------- */
  const byId = (id) => document.getElementById(id);
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const num = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* -----------------------------
     Fallback profiles
  ----------------------------- */
  const DEFAULT_PROFILES = {
    LK: {
      name: "Sri Lanka",
      flag: "🇱",
      agency: "Irrigation Dept / RiverNet.lk / DMC Live Sensors",
      sunPriority: "conditional",
      primaryFocus: "Monsoon Flood & NBRO Landslide Watch",
      hotlines: [
        { num: "117", lbl: "DMC Emergency" },
        { num: "1990", lbl: "Suwa Seriya" },
        { num: "011-2686686", lbl: "Met Dept" }
      ],
      states: [
        { code: "SG", name: "Ratnapura (Kalu / We Ganga)", lat: 6.6828, lon: 80.3992 }
      ],
      basins: {},
      rivers: [
        {
          id: "ratnapura",
          apiMatch: ["ratnapura", "rathnapura"],
          name: "Kalu Ganga (Ratnapura) ⭐",
          station: "Ratnapura Main Gauge",
          basinGroup: "kalu",
          subTag: "Official Irrigation Dept & RiverNet.lk/ratnapura",
          rivernetUrl: "https://rivernet.lk/ratnapura",
          lat: 6.6828,
          lon: 80.3992,
          unit: "m",
          normalLvl: 1.95,
          alertLvl: 5.2,
          minorLvl: 7.5,
          majorLvl: 9.5,
          maxScale: 11.5,
          thresholdSource: "official",
          official: true
        }
      ]
    },
    GLOBAL: {
      name: "Worldwide",
      flag: "🌍",
      agency: "WMO / Copernicus GloFAS / Open-Meteo Global",
      sunPriority: "conditional",
      primaryFocus: "Global Multi-Hazard & Satellite Watershed Telemetry",
      hotlines: [
        { num: "112", lbl: "Intl Emergency" },
        { num: "911", lbl: "Global Rescue" }
      ],
      states: [
        { code: "DXB", name: "Dubai (UAE)", lat: 25.2048, lon: 55.2708 }
      ],
      basins: {},
      rivers: [
        {
          id: "gl1",
          name: "Primary Local Watershed",
          station: "Satellite GloFAS Cell #1",
          basinGroup: "all",
          subTag: "Copernicus Global Flood Awareness",
          rivernetUrl: "https://www.globalfloods.eu/",
          lat: 25.2048,
          lon: 55.2708,
          unit: "m",
          normalLvl: 1.8,
          alertLvl: 3.8,
          minorLvl: 4.8,
          majorLvl: 6.2,
          maxScale: 8,
          thresholdSource: "official",
          official: true
        }
      ]
    }
  };

  const DEFAULT_WMO = {
    0: { desc: "Clear Sky", iconDay: "☀️", iconNight: "🌙", anim: "clear" },
    1: { desc: "Mainly Clear", iconDay: "🌤️", iconNight: "🌙", anim: "clear" },
    2: { desc: "Partly Cloudy", iconDay: "⛅", iconNight: "☁️", anim: "clouds" },
    3: { desc: "Overcast Clouds", iconDay: "☁️", iconNight: "☁️", anim: "clouds" },
    45: { desc: "Dense Fog / Mist", iconDay: "🌫️", iconNight: "🌫️", anim: "clouds" },
    51: { desc: "Light Drizzle", iconDay: "🌦️", iconNight: "🌧️", anim: "rain" },
    61: { desc: "Slight Rain", iconDay: "🌦️", iconNight: "🌧️", anim: "rain" },
    63: { desc: "Moderate Monsoon Rain", iconDay: "🌧️", iconNight: "🌧️", anim: "rain" },
    65: { desc: "Heavy Downpour", iconDay: "🌧️", iconNight: "🌧️", anim: "rain" },
    80: { desc: "Rain Showers", iconDay: "🌦️", iconNight: "🌧️", anim: "rain" },
    82: { desc: "Torrential Showers", iconDay: "⛈️", iconNight: "⛈️", anim: "thunder" },
    95: { desc: "Thunderstorm", iconDay: "⛈️", iconNight: "⛈️", anim: "thunder" },
    99: { desc: "Severe Cyclonic Storm", iconDay: "🌩️", iconNight: "🌩️", anim: "thunder" }
  };

  const PROFILES =
    typeof COUNTRY_PROFILES !== "undefined" && COUNTRY_PROFILES
      ? COUNTRY_PROFILES
      : DEFAULT_PROFILES;

  const WMO_MAP =
    typeof WMO_CODES !== "undefined" && WMO_CODES ? WMO_CODES : DEFAULT_WMO;

  /* -----------------------------
     State
  ----------------------------- */
  const state = {
    activeTab: "overview",
    countryCode: "LK",
    stateCode: "SG",
    lat: 6.6828,
    lon: 80.3992,
    city: "Ratnapura (Kalu / We Ganga)",
    unit: "C",
    simMode: "live",
    alertLevel: "green",
    locationSource: "default",
    basinFilter: "all",
    riverStatusFilter: "all",
    riverSourceFilter: "all",
    rawWeather: null,
    rawAqi: null,
    rawMarine: null,
    rawQuakes: [],
    localDischarge: 65,
    liveSriLankaGauges: {},
    particleType: "clear-day",
    rainIntensity: 1,
    sunTimerTotalSec: 7200,
    sunTimerRemSec: 7200,
    sunTimerInterval: null,
    sunTimerRunning: false,
    leafletMap: null,
    radarLayer: null,
    markerGroup: null,
    riverMap: null,
    riverMarkerGroup: null,
    lastRiverStations: [],
    lastFetchTime: 0,
    fetchToken: 0
  };

  /* -----------------------------
     Loader / status
  ----------------------------- */
  function showLoader(visible) {
    const loader = byId("loader");
    if (!loader) return;

    if (visible) {
      loader.style.display = "flex";
      loader.style.opacity = "1";
      loader.style.pointerEvents = "all";
    } else {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(() => {
        loader.style.display = "none";
      }, 300);
    }
  }

  function updateStatusBadge(type, text) {
    const badge = byId("data-status-badge");
    if (!badge) return;
    badge.className = `status-pill ${type}`;
    badge.textContent = text;
  }

  /* -----------------------------
     Smooth FX engine
  ----------------------------- */
  const FX = {
    canvas: byId("weather-canvas"),
    ctx: null,
    running: false,
    raf: null,
    last: 0,
    time: 0,
    reduced:
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    state: {
      rain: 0,
      wind: 0,
      fog: 0,
      sun: 0,
      star: 0,
      lightning: 0,
      flash: 0,
      cooldown: 4
    },
    target: {
      rain: 0,
      wind: 0,
      fog: 0,
      sun: 0,
      star: 0,
      lightning: 0
    },
    pool: {
      rain: [],
      motes: [],
      fog: []
    },

    init() {
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext("2d", { alpha: true });
      this.resize();
      window.addEventListener("resize", () => this.resize());
      this.createPools();
    },

    resize() {
      if (!this.canvas) return;
      this.canvas.width = Math.max(320, window.innerWidth);
      this.canvas.height = Math.max(480, window.innerHeight);
    },

    createPools() {
      if (!this.canvas) return;
      const w = this.canvas.width;
      const h = this.canvas.height;

      const maxRain = this.reduced ? 35 : 190;
      const maxMotes = this.reduced ? 18 : 90;
      const maxFog = this.reduced ? 3 : 8;

      this.pool.rain = [];
      this.pool.motes = [];
      this.pool.fog = [];

      for (let i = 0; i < maxRain; i++) {
        this.pool.rain.push({
          x: Math.random() * w,
          y: Math.random() * h,
          len: 8 + Math.random() * 20,
          speed: 0.45 + Math.random() * 1.1,
          alpha: 0.25 + Math.random() * 0.75
        });
      }

      for (let i = 0; i < maxMotes; i++) {
        this.pool.motes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.7 + Math.random() * 2.2,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -0.04 - Math.random() * 0.16,
          phase: 0.8 + Math.random() * 2.4
        });
      }

      for (let i = 0; i < maxFog; i++) {
        this.pool.fog.push({
          x: Math.random() * w,
          y: h * (0.35 + Math.random() * 0.55),
          r: 160 + Math.random() * 260,
          vx: 0.08 + Math.random() * 0.18,
          alpha: 0.35 + Math.random() * 0.65
        });
      }
    },

    setScene(t) {
      const maxRain = this.reduced ? 0.28 : 1;
      const maxWind = this.reduced ? 0.45 : 1;
      const maxFog = this.reduced ? 0.45 : 1;
      const maxSun = this.reduced ? 0.35 : 1;
      const maxStar = this.reduced ? 0.25 : 1;
      const maxLightning = this.reduced ? 0 : 1;

      this.target.rain = clamp(num(t.rain) ?? 0, 0, maxRain);
      this.target.wind = clamp(num(t.wind) ?? 0, 0, maxWind);
      this.target.fog = clamp(num(t.fog) ?? 0, 0, maxFog);
      this.target.sun = clamp(num(t.sun) ?? 0, 0, maxSun);
      this.target.star = clamp(num(t.star) ?? 0, 0, maxStar);
      this.target.lightning = clamp(num(t.lightning) ?? 0, 0, maxLightning);
    },

    start() {
      if (!this.ctx || this.running) return;
      this.running = true;
      this.last = performance.now();

      const step = (ts) => {
        if (!this.running) return;
        this.frame(ts);
        this.raf = requestAnimationFrame(step);
      };

      this.raf = requestAnimationFrame(step);
    },

    stop() {
      this.running = false;
      if (this.raf) cancelAnimationFrame(this.raf);
      this.raf = null;
    },

    frame(ts) {
      const dt = Math.min((ts - this.last) / 1000, 0.05);
      this.last = ts;
      this.time += dt;
      this.update(dt);
      this.draw(dt);
    },

    update(dt) {
      const s = this.state;
      const t = this.target;
      const ease = this.reduced ? 0.06 : 0.14;

      s.rain = lerp(s.rain, t.rain, ease);
      s.wind = lerp(s.wind, t.wind, ease);
      s.fog = lerp(s.fog, t.fog, ease);
      s.sun = lerp(s.sun, t.sun, ease);
      s.star = lerp(s.star, t.star, ease);
      s.lightning = lerp(s.lightning, t.lightning, ease);

      s.cooldown -= dt;

      if (
        !this.reduced &&
        s.lightning > 0.05 &&
        s.cooldown <= 0 &&
        Math.random() < s.lightning * 0.018
      ) {
        s.flash = 0.28 + Math.random() * 0.38 * s.lightning;
        s.cooldown = 2.2 + Math.random() * 5.5;
      }

      s.flash = Math.max(0, s.flash - dt * 1.55);
    },

    draw(dt) {
      if (!this.ctx || !this.canvas) return;

      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;
      const frame = dt * 60;

      ctx.clearRect(0, 0, w, h);

      const fogCount = Math.round(this.pool.fog.length * this.state.fog);
      for (let i = 0; i < fogCount; i++) {
        const p = this.pool.fog[i];
        p.x += p.vx * frame * (0.5 + this.state.wind);
        if (p.x - p.r > w) p.x = -p.r;
        if (p.x + p.r < 0) p.x = w + p.r;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const a = 0.08 * this.state.fog * p.alpha;
        grad.addColorStop(0, `rgba(148, 163, 184, ${a})`);
        grad.addColorStop(1, "rgba(148, 163, 184, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }

      const rainCount = Math.round(this.pool.rain.length * this.state.rain);
      if (rainCount > 0) {
        const slant = 1.5 + this.state.wind * 14;
        ctx.lineWidth = 1 + this.state.rain * 1.1;
        ctx.strokeStyle = `rgba(186, 230, 253, ${0.14 + this.state.rain * 0.42})`;
        ctx.beginPath();

        for (let i = 0; i < rainCount; i++) {
          const p = this.pool.rain[i];
          p.y += (2.2 + p.speed * 4.2) * (0.45 + this.state.rain) * frame;
          p.x -= (0.35 + this.state.wind * 1.15) * frame;

          if (p.y > h + 24) {
            p.y = -24;
            p.x = Math.random() * w;
          }
          if (p.x < -30) p.x = w + 20;
          if (p.x > w + 30) p.x = -20;

          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - slant * 0.55, p.y + p.len * (0.75 + this.state.rain));
        }

        ctx.stroke();
      }

      const moteStrength = Math.max(this.state.sun, this.state.star);
      const moteCount = Math.round(this.pool.motes.length * moteStrength);
      for (let i = 0; i < moteCount; i++) {
        const p = this.pool.motes[i];
        p.x += p.vx * frame * (1 + this.state.wind * 0.8);
        p.y += p.vy * frame;

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const twinkle = 0.45 + 0.55 * Math.sin(this.time * p.phase + p.x * 0.01);
        const isStar = this.state.star >= this.state.sun;
        const alpha = isStar
          ? twinkle * 0.52 * this.state.star
          : (0.12 + twinkle * 0.22) * this.state.sun;

        ctx.fillStyle = isStar
          ? `rgba(226, 232, 240, ${alpha})`
          : `rgba(253, 224, 71, ${alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (isStar ? 0.85 : 1.1), 0, Math.PI * 2);
        ctx.fill();
      }

      if (this.state.flash > 0.01) {
        ctx.fillStyle = `rgba(224, 242, 254, ${Math.min(0.52, this.state.flash * 0.52)})`;
        ctx.fillRect(0, 0, w, h);
      }
    }
  };

  /* -----------------------------
     Sound engine
  ----------------------------- */
  const SoundEngine = {
    ctx: null,
    masterGain: null,
    rainGain: null,
    windGain: null,
    isPlaying: false,

    init() {
      if (this.ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.45;
      this.masterGain.connect(this.ctx.destination);

      const bufferSize = this.ctx.sampleRate * 3;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

      const rainSource = this.ctx.createBufferSource();
      rainSource.buffer = noiseBuffer;
      rainSource.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = "bandpass";
      rainFilter.frequency.value = 1150;

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.value = 0.0001;

      rainSource.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);
      rainSource.start();

      const windSource = this.ctx.createBufferSource();
      windSource.buffer = noiseBuffer;
      windSource.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = "lowpass";
      windFilter.frequency.value = 300;

      this.windGain = this.ctx.createGain();
      this.windGain.gain.value = 0.0001;

      windSource.connect(windFilter);
      windFilter.connect(this.windGain);
      this.windGain.connect(this.masterGain);
      windSource.start();
    },

    toggle() {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      this.isPlaying = !this.isPlaying;

      const btn = byId("audio-btn");
      const icon = byId("audio-icon");
      const label = byId("audio-label");

      if (this.isPlaying) {
        if (btn) btn.classList.add("audio-active");
        if (icon) icon.className = "ph-fill ph-speaker-high";
        if (label) label.textContent = "Audio: Live";
        this.updateMix();
      } else {
        if (btn) btn.classList.remove("audio-active");
        if (icon) icon.className = "ph-fill ph-speaker-slash";
        if (label) label.textContent = "Audio: Off";
        this.rainGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.3);
        this.windGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.3);
      }
    },

    updateMix() {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const type = state.particleType;

      const rainLevel =
        type === "thunder"
          ? 0.42
          : type === "rain"
            ? 0.08 + 0.34 * clamp(FX.target.rain, 0, 1)
            : 0.002;

      const windLevel = 0.035 + 0.26 * clamp(FX.target.wind, 0, 1);

      this.rainGain.gain.setTargetAtTime(rainLevel, now, 0.7);
      this.windGain.gain.setTargetAtTime(windLevel, now, 0.9);
    },

    playBeep(freq = 660) {
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === "suspended") this.ctx.resume();

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.frequency.setValueAtTime(freq, now);
        g.gain.setValueAtTime(0.14, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.4);
      } catch {}
    }
  };

  /* -----------------------------
     Network / geo helpers
  ----------------------------- */
  async function fetchWithTimeout(url, ms = 4500) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);

    try {
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      clearTimeout(timer);
      return null;
    }
  }

  function calcDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
  }

  function guessCountryFromCoords(lat, lon) {
    if (lat >= 5.8 && lat <= 10.0 && lon >= 79.5 && lon <= 82.0) return "LK";
    if (lat >= -45 && lat <= -10 && lon >= 110 && lon <= 155) return "AU";
    if (lat >= 24 && lat <= 50 && lon >= -125 && lon <= -66) return "US";
    if (lat >= 50 && lat <= 59 && lon >= -8 && lon <= 2) return "GB";
    if (lat >= 30 && lat <= 46 && lon >= 128 && lon <= 146) return "JP";
    return "GLOBAL";
  }

  function getProfileForCountry(code) {
    const upper = String(code || "").toUpperCase();
    return PROFILES[upper] || PROFILES[guessCountryFromCoords(state.lat, state.lon)] || PROFILES.GLOBAL;
  }

  function nearestGaugeForCoords(lat, lon, countryCode) {
    const profile = PROFILES[String(countryCode || "").toUpperCase()] || getProfileForCountry(countryCode);
    const rivers = profile.rivers || [];
    let best = null;

    rivers.forEach((r) => {
      if (!Number.isFinite(r.lat) || !Number.isFinite(r.lon)) return;
      const d = calcDistanceKm(lat, lon, r.lat, r.lon);
      if (!best || d < best.km) best = { id: r.id, name: r.name, km: d };
    });

    return best;
  }

  /* -----------------------------
     River registry expansion
  ----------------------------- */
  function ensureRiverRegistry() {
    const lk = PROFILES.LK;
    if (!lk) return;

    lk.basins = lk.basins || {
      kalu: "Kalu Ganga Basin",
      kelani: "Kelani Ganga Basin",
      mahaweli: "Mahaweli Ganga Basin",
      nilwala: "Nilwala Ganga Basin",
      gin: "Gin Ganga Basin",
      mahaoya: "Maha Oya Basin",
      attenagalu: "Attanagalu Oya Basin",
      deduru: "Deduru Oya Basin",
      kirindi: "Kirindi Oya Basin",
      walawe: "Walawe Ganga Basin",
      malwathu: "Malwathu Oya Basin",
      meeoya: "Mee Oya Basin",
      yanoya: "Yan Oya Basin",
      maoya: "Ma Oya Basin",
      maduru: "Maduru Oya Basin",
      menik: "Menik Ganga Basin",
      kumbukkan: "Kumbukkan Oya Basin",
      hedaoya: "Heda Oya Basin",
      kalaoya: "Kala Oya Basin",
      galoya: "Gal Oya Basin",
      mundeni: "Mundeni Aru Basin",
      andella: "Andella Oya Basin",
      magalawattuwan: "Magalawattuwan River Basin"
    };

    lk.rivers = lk.rivers || [];

    lk.rivers.forEach((r) => {
      if (!r.thresholdSource) r.thresholdSource = "official";
      if (r.official === undefined) r.official = true;
      if (!r.basinName) r.basinName = lk.basins[r.basinGroup] || r.basinGroup;
    });
  }

  /* -----------------------------
     Live gauge sync (Dual-Network: Irrigation Dept + RiverNet.lk 5-Min IoT)
  ----------------------------- */
  function slugToBasinKey(riverSlug) {
    const s = String(riverSlug || "").toLowerCase();
    const map = {
      "kalu-ganga": "kalu",
      "kalu ganga": "kalu",
      "kelani-ganga": "kelani",
      "kelani ganga": "kelani",
      "mahaweli-ganga": "mahaweli",
      "mahaweli ganga": "mahaweli",
      "nilwala-ganga": "nilwala",
      "nilwala ganga": "nilwala",
      "gin-ganga": "gin",
      "gin ganga": "gin",
      "maha-oya": "mahaoya",
      "maha oya": "mahaoya",
      "aththanagalu-oya": "attenagalu",
      "attanagalu oya": "attenagalu",
      "deduru-oya": "deduru",
      "deduru oya": "deduru",
      "kirindi-oya": "kirindi",
      "kirindi oya": "kirindi",
      "walawe-ganga": "walawe",
      "walawe ganga": "walawe",
      "malwathu-oya": "malwathu",
      "malwathu oya": "malwathu",
      "mee-oya": "meeoya",
      "mee oya": "meeoya",
      "yan-oya": "yanoya",
      "yan oya": "yanoya",
      "ma-oya": "maoya",
      "ma oya": "maoya",
      "maduru-oya": "maduru",
      "maduru oya": "maduru",
      "menik-ganga": "menik",
      "menik ganga": "menik",
      "kumbukkan-oya": "kumbukkan",
      "kumbukkan oya": "kumbukkan",
      "heda-oya": "hedaoya",
      "heda oya": "hedaoya",
      "kala-oya": "kalaoya",
      "kala oya": "kalaoya",
      "gal-oya": "galoya",
      "gal oya": "galoya",
      "mundeni aru": "mundeni",
      "mundeni-aru": "mundeni",
      "andella oya": "andella",
      "andella-oya": "andella",
      "magalawattuwan river": "magalawattuwan",
      "magalawattuwan-river": "magalawattuwan"
    };
    return map[s] || s.replace(/[^a-z0-9]+/g, "") || "all";
  }

  async function fetchAllRivernetDevices() {
    const baseUrl = "https://api.rivernet.lk/api/overview/latest-status-paginated?deviceType=river_level";
    const [p1, p2] = await Promise.all([
      fetchWithTimeout(`${baseUrl}&page=1`, 5500),
      fetchWithTimeout(`${baseUrl}&page=2`, 5500)
    ]);

    const items = [];
    if (p1 && p1.results && Array.isArray(p1.results.data)) {
      items.push(...p1.results.data);
    }
    if (p2 && p2.results && Array.isArray(p2.results.data)) {
      items.push(...p2.results.data);
    }

    const lastPage = p1 && p1.results && p1.results.pagination ? Number(p1.results.pagination.lastPage) : 2;
    if (Number.isFinite(lastPage) && lastPage > 2 && lastPage <= 6) {
      const extraPromises = [];
      for (let page = 3; page <= lastPage; page++) {
        extraPromises.push(fetchWithTimeout(`${baseUrl}&page=${page}`, 5000));
      }
      const extraPages = await Promise.all(extraPromises);
      extraPages.forEach((px) => {
        if (px && px.results && Array.isArray(px.results.data)) {
          items.push(...px.results.data);
        }
      });
    }

    return items;
  }

  async function syncRealSriLankaRiverGauges() {
    if (!PROFILES.LK) return;

    const [irrigationData, rivernetItems] = await Promise.all([
      fetchWithTimeout("https://sl-water-levels.vercel.app/api/levels", 5500),
      fetchAllRivernetDevices()
    ]);

    // 1. Sync Official Irrigation Department Gauges (42 stations)
    const records = irrigationData
      ? Array.isArray(irrigationData)
        ? irrigationData
        : irrigationData.stations || irrigationData.levels || irrigationData.data || []
      : [];

    if (Array.isArray(records) && records.length > 0) {
      const matchedApiIds = new Set();

      PROFILES.LK.rivers.forEach((river) => {
        if (!river.apiId) return;
        const found = records.find((rec) => {
          const recId = String(rec.id || "").toLowerCase();
          if (river.apiId && recId === String(river.apiId).toLowerCase()) return true;
          const stName = `${rec.id || ""} ${rec.station || ""} ${rec.river || ""} ${rec.name || ""}`.toLowerCase();
          return river.apiMatch && river.apiMatch.some((m) => stName.includes(String(m).toLowerCase()));
        });

        if (!found) return;
        if (found.id) matchedApiIds.add(found.id);

        applyApiRecordToRiver(river, found);
      });

      // Dynamically register any newly added official stations from the Irrigation API
      records.forEach((rec) => {
        if (!rec || !rec.id || matchedApiIds.has(rec.id)) return;
        const riverSlug = String(rec.id).split("/")[0];
        const basinGroup = slugToBasinKey(riverSlug);
        const pubUnit = rec.published && (rec.published.unit === "m" || rec.published.unit === "ft") ? rec.published.unit : "m";
        const newRiver = {
          id: String(rec.id).replace(/[^a-z0-9]+/gi, "-").toLowerCase(),
          apiId: rec.id,
          apiMatch: [rec.id, String(rec.station || "").toLowerCase()],
          name: `${rec.river || "River"} (${rec.station || "Gauge"})`,
          station: rec.station || "Official Gauge",
          basinGroup,
          basinName: (PROFILES.LK.basins && PROFILES.LK.basins[basinGroup]) || rec.river || basinGroup,
          subTag: "Official Irrigation Dept Live Gauge",
          rivernetUrl: rec.url || "https://sl-water-levels.vercel.app/",
          lat: Number(rec.latitude),
          lon: Number(rec.longitude),
          unit: pubUnit,
          normalLvl: null,
          alertLvl: null,
          minorLvl: null,
          majorLvl: null,
          maxScale: pubUnit === "ft" ? 20 : 10,
          thresholdSource: "official",
          official: true
        };
        PROFILES.LK.rivers.push(newRiver);
        applyApiRecordToRiver(newRiver, rec);
      });
    }

    // 2. Sync RiverNet.lk 5-Minute Automated Ultrasonic Sensors (39 stations incl. We Ganga, Kukule Ganga, Kuru Ganga, etc.)
    if (Array.isArray(rivernetItems) && rivernetItems.length > 0) {
      const matchedUnitIds = new Set();

      PROFILES.LK.rivers.forEach((river) => {
        const foundRn = rivernetItems.find((item) => {
          if (!item || !item.unitId) return false;
          if (river.rivernetUnitId && String(river.rivernetUnitId).toUpperCase() === String(item.unitId).toUpperCase()) {
            return true;
          }
          return false;
        });

        if (!foundRn) return;
        matchedUnitIds.add(String(foundRn.unitId).toUpperCase());
        applyRivernetRecordToRiver(river, foundRn);
      });

      // Dynamically register any newly deployed RiverNet.lk sensor not yet in data.js
      rivernetItems.forEach((item) => {
        if (!item || !item.unitId) return;
        const unitKey = String(item.unitId).toUpperCase();
        if (matchedUnitIds.has(unitKey)) return;

        const basinGroup = slugToBasinKey(item.riverBasin || "all");
        const coords = Array.isArray(item.coords) && item.coords.length >= 2 ? item.coords : [6.9, 80.5];
        const newRiver = {
          id: `rivernet-${String(item.unitId).toLowerCase()}`,
          rivernetUnitId: item.unitId,
          apiMatch: [String(item.unitId).toLowerCase(), String(item.location || "").toLowerCase()],
          name: `${item.location || item.name || "River Sensor"}`,
          station: `${item.location || item.unitId} (RiverNet ${item.unitId})`,
          basinGroup,
          basinName: (PROFILES.LK.basins && PROFILES.LK.basins[basinGroup]) || item.riverBasin || "Sri Lanka Basin",
          subTag: `${item.riverBasin || "River"} • 5-Min Live Sensor (${item.unitId})`,
          rivernetUrl: item.slug ? `https://rivernet.lk/${item.slug}` : "https://rivernet.lk/",
          lat: Number(coords[0]),
          lon: Number(coords[1]),
          unit: "m",
          normalLvl: 1.0,
          alertLvl: 3.5,
          minorLvl: 4.5,
          majorLvl: 6.0,
          maxScale: 7.5,
          thresholdSource: Array.isArray(item.alerts) && item.alerts.length > 0 ? "official" : "provisional",
          official: true
        };
        PROFILES.LK.rivers.push(newRiver);
        applyRivernetRecordToRiver(newRiver, item);
      });
    }

    state.lastRiverSyncTime = Date.now();
  }

  function applyApiRecordToRiver(river, found) {
    if (Number.isFinite(Number(found.latitude)) && Number.isFinite(Number(found.longitude))) {
      river.lat = Number(found.latitude);
      river.lon = Number(found.longitude);
    }
    if (found.url) {
      river.rivernetUrl = found.url;
    }

    const pub = found.published || {};
    if (pub.unit === "m" || pub.unit === "ft") {
      river.unit = pub.unit;
    }

    // Sync official flood marks (API marks are in ft) into the station's display unit
    const marks = found.marks || {};
    const ftToUnit = (valFt) => {
      if (valFt === null || valFt === undefined || !Number.isFinite(Number(valFt))) return null;
      const n = Number(valFt);
      return river.unit === "m" ? Math.round(n * 0.3048 * 100) / 100 : Math.round(n * 100) / 100;
    };

    const alertInUnit = ftToUnit(marks.alert);
    const minorInUnit = ftToUnit(marks.minor);
    const majorInUnit = ftToUnit(marks.major);

    if (alertInUnit !== null) river.alertLvl = alertInUnit;
    if (minorInUnit !== null) river.minorLvl = minorInUnit;
    if (majorInUnit !== null) {
      river.majorLvl = majorInUnit;
      river.maxScale = Math.round(majorInUnit * 1.22 * 10) / 10;
    }

    const apiStatus = String(found.status || "").toLowerCase();
    let valInCardUnit = null;

    if (apiStatus !== "stale" && apiStatus !== "none") {
      if (pub.level !== null && pub.level !== undefined && Number.isFinite(Number(pub.level)) && (pub.unit === "m" || pub.unit === "ft")) {
        const rawPub = Number(pub.level);
        if (pub.unit === river.unit) valInCardUnit = rawPub;
        else if (pub.unit === "ft" && river.unit === "m") valInCardUnit = rawPub * 0.3048;
        else if (pub.unit === "m" && river.unit === "ft") valInCardUnit = rawPub * 3.28084;
      } else if (found.level !== null && found.level !== undefined && Number.isFinite(Number(found.level))) {
        const rawVal = Number(found.level);
        const apiUnit = String(found.unit || "ft").toLowerCase();
        if (apiUnit === river.unit) valInCardUnit = rawVal;
        else if (apiUnit === "ft" && river.unit === "m") valInCardUnit = rawVal * 0.3048;
        else if (apiUnit === "m" && river.unit === "ft") valInCardUnit = rawVal * 3.28084;
      }
    }

    const rainObj = found.rain || {};
    const gaugeRain24h =
      rainObj.fallen_24h_mm != null
        ? Number(rainObj.fallen_24h_mm)
        : rainObj.satellite_24h_mm != null
          ? Number(rainObj.satellite_24h_mm)
          : null;

    state.liveSriLankaGauges[river.id] = {
      level: valInCardUnit,
      apiStatus: apiStatus || "normal",
      statusLabel: found.statusLabel || null,
      statusNote: found.statusNote || null,
      trend: found.trend || null,
      changePerHour3h: found.changePerHour3h != null ? Number(found.changePerHour3h) : null,
      observedAt: found.observedAt || "Live Sensor",
      ageMinutes: found.ageMinutes != null ? Number(found.ageMinutes) : null,
      rain24h: gaugeRain24h,
      nextHour: found.nextHour || null,
      telemetryNetwork: "irrigation"
    };
  }

  function applyRivernetRecordToRiver(river, item) {
    const addCoords = item.additional && item.additional.coordinates;
    if (addCoords && Number.isFinite(Number(addCoords.latitude)) && Number.isFinite(Number(addCoords.longitude))) {
      const lat = Number(addCoords.latitude);
      const lon = Number(addCoords.longitude);
      if (lat > 5.5 && lat < 10.2 && lon > 79.4 && lon < 82.2) {
        river.lat = lat;
        river.lon = lon;
      }
    } else if (Array.isArray(item.coords) && item.coords.length >= 2) {
      const lat = Number(item.coords[0]);
      const lon = Number(item.coords[1]);
      if (Number.isFinite(lat) && Number.isFinite(lon) && lat > 5.5 && lon > 79.4) {
        river.lat = lat;
        river.lon = lon;
      }
    }

    if (!river.apiId && item.slug) {
      river.rivernetUrl = `https://rivernet.lk/${item.slug}`;
    }

    // Sync published alert marks if present on RiverNet device (values are in meters)
    const hasPublishedAlerts = Array.isArray(item.alerts) && item.alerts.length > 0;
    if (hasPublishedAlerts) {
      const mToUnit = (valM) => {
        if (valM === null || valM === undefined || !Number.isFinite(Number(valM))) return null;
        const n = Number(valM);
        if (n <= 0) return null;
        return river.unit === "ft" ? Math.round(n * 3.28084 * 100) / 100 : Math.round(n * 100) / 100;
      };

      const findAlert = (lbl) => {
        const hit = item.alerts.find((a) => String(a.alertLabel || "").toLowerCase() === lbl);
        return hit ? mToUnit(hit.alertValue) : null;
      };

      const alertVal = findAlert("alert");
      const minorVal = findAlert("minor");
      const majorVal = findAlert("major") ?? findAlert("critical");

      if (alertVal !== null) river.alertLvl = alertVal;
      if (minorVal !== null) river.minorLvl = minorVal;
      if (majorVal !== null) {
        river.majorLvl = majorVal;
        river.maxScale = Math.round(majorVal * 1.22 * 10) / 10;
      }
    }

    const latest = item.latest || {};
    const existing = state.liveSriLankaGauges[river.id] || null;
    const rawLevel = latest.latestLevel;
    const hasValidLevel =
      rawLevel !== null &&
      rawLevel !== undefined &&
      rawLevel !== "" &&
      Number.isFinite(Number(rawLevel)) &&
      latest.communication !== false;

    if (!hasValidLevel) {
      // If dual-synced station already has a valid reading from Irrigation Dept, keep it
      if (existing && existing.level != null) return;
      state.liveSriLankaGauges[river.id] = {
        level: null,
        apiStatus: "stale",
        statusLabel: "Sensor Offline",
        statusNote: "Awaiting telemetry from RiverNet.lk automated gauge",
        trend: null,
        changePerHour3h: null,
        observedAt: latest.datetime || "Offline",
        ageMinutes: null,
        rain24h: existing ? existing.rain24h : null,
        nextHour: existing ? existing.nextHour : null,
        unitId: item.unitId,
        telemetryNetwork: "rivernet"
      };
      return;
    }

    const rawM = Number(rawLevel);
    const valInCardUnit = river.unit === "ft" ? rawM * 3.28084 : rawM;

    // Calculate 30-min delta and trend from before30mLevel
    let trend = existing ? existing.trend : "steady";
    let delta30m = null;
    let changePerHour = existing ? existing.changePerHour3h : null;

    if (
      latest.before30mLevel !== null &&
      latest.before30mLevel !== undefined &&
      latest.before30mLevel !== "" &&
      Number.isFinite(Number(latest.before30mLevel))
    ) {
      const prevM = Number(latest.before30mLevel);
      const diffM = rawM - prevM;
      delta30m = river.unit === "ft" ? diffM * 3.28084 : diffM;
      changePerHour = Math.round(delta30m * 2 * 100) / 100;
      if (diffM > 0.01) trend = "rising";
      else if (diffM < -0.01) trend = "falling";
      else trend = "steady";
    }

    // Parse reading age in minutes (Sri Lanka time UTC+05:30)
    const rawTs = (latest.actualLatestRecord && latest.actualLatestRecord.datetime) || latest.datetime || null;
    let ageMinutes = existing ? existing.ageMinutes : null;
    if (rawTs && typeof rawTs === "string") {
      const isoSriLanka = rawTs.includes("T") ? rawTs : `${rawTs.trim().replace(" ", "T")}+05:30`;
      const parsedMs = Date.parse(isoSriLanka);
      if (Number.isFinite(parsedMs)) {
        ageMinutes = Math.max(0, Math.round((Date.now() - parsedMs) / 60000));
      }
    }

    // Determine flood status from RiverNet alertType and calibrated/official thresholds
    const rnAlert = String(latest.alertType || "normal").toLowerCase();
    let computedStatus = "normal";

    if (rnAlert === "critical" || rnAlert === "major" || (Number.isFinite(river.majorLvl) && valInCardUnit >= river.majorLvl)) {
      computedStatus = "major";
    } else if (rnAlert === "minor" || (Number.isFinite(river.minorLvl) && valInCardUnit >= river.minorLvl)) {
      computedStatus = "minor";
    } else if (rnAlert === "alert" || (Number.isFinite(river.alertLvl) && valInCardUnit >= river.alertLvl)) {
      computedStatus = "alert";
    } else if (hasPublishedAlerts && Number.isFinite(river.alertLvl) && valInCardUnit >= river.alertLvl * 0.88) {
      computedStatus = "watch";
    }

    state.liveSriLankaGauges[river.id] = {
      level: valInCardUnit,
      apiStatus: computedStatus,
      statusLabel: computedStatus.toUpperCase(),
      statusNote: `RiverNet.lk 5-Min Automated Sensor (${item.unitId})`,
      trend,
      delta30m,
      changePerHour3h: changePerHour,
      observedAt: rawTs || "Live 5-Min Sensor",
      ageMinutes,
      rain24h: existing ? existing.rain24h : null,
      nextHour: existing ? existing.nextHour : null,
      unitId: item.unitId,
      levelUnitNote: latest.latestLevelUnit === "msl" ? "m MSL" : null,
      telemetryNetwork: existing ? "dual" : "rivernet"
    };
  }

  /* -----------------------------
     Fallback weather
  ----------------------------- */
  function buildFallbackWeather() {
    const now = new Date();
    const hTimes = [], hTemps = [], hPop = [], hCode = [], hVis = [], hUv = [], hCape = [], hLift = [], hSoil = [], hDay = [];

    for (let i = 0; i < 24; i++) {
      const d = new Date(now.getTime() + i * 3600000);
      hTimes.push(d.toISOString().slice(0, 13) + ":00");
      const hr = d.getHours();
      const isD = hr >= 6 && hr <= 18 ? 1 : 0;
      hDay.push(isD);
      hTemps.push(27 + Math.sin(i / 4) * 3);
      hPop.push(30);
      hCode.push(2);
      hVis.push(9500);
      hUv.push(isD ? 7.5 : 0);
      hCape.push(420);
      hLift.push(0.5);
      hSoil.push(0.32);
    }

    const dTimes = [], dMax = [], dMin = [], dUvMax = [], dSum = [], dPopMax = [], dCode = [], dRise = [], dSet = [];

    for (let j = 0; j < 7; j++) {
      const dd = new Date(now.getTime() + j * 86400000);
      const dayStr = dd.toISOString().slice(0, 10);
      dTimes.push(dayStr);
      dMax.push(31);
      dMin.push(24);
      dUvMax.push(8.5);
      dSum.push(6.5);
      dPopMax.push(40);
      dCode.push(2);
      dRise.push(`${dayStr}T06:05`);
      dSet.push(`${dayStr}T18:10`);
    }

    return {
      timezone: "Asia/Colombo",
      current: {
        time: hTimes[0],
        temperature_2m: 28.5,
        relative_humidity_2m: 76,
        apparent_temperature: 32.0,
        is_day: 1,
        precipitation: 0.4,
        weather_code: 2,
        surface_pressure: 1011,
        wind_speed_10m: 14,
        wind_gusts_10m: 24
      },
      hourly: {
        time: hTimes,
        temperature_2m: hTemps,
        precipitation_probability: hPop,
        weather_code: hCode,
        visibility: hVis,
        uv_index: hUv,
        cape: hCape,
        lifted_index: hLift,
        soil_moisture_0_to_7cm: hSoil,
        is_day: hDay
      },
      daily: {
        time: dTimes,
        weather_code: dCode,
        temperature_2m_max: dMax,
        temperature_2m_min: dMin,
        uv_index_max: dUvMax,
        precipitation_sum: dSum,
        precipitation_probability_max: dPopMax,
        sunrise: dRise,
        sunset: dSet
      }
    };
  }

  /* -----------------------------
     Render scheduler
  ----------------------------- */
  let renderScheduled = false;
  function scheduleRender() {
    if (renderScheduled) return;
    renderScheduled = true;
    requestAnimationFrame(() => {
      renderScheduled = false;
      renderEverything();
    });
  }

  /* -----------------------------
     Fetch master
  ----------------------------- */
  async function fetchAllData(lat, lon, cityName, forcedCountry = null) {
    const myToken = ++state.fetchToken;

    if (forcedCountry) {
      state.countryCode = PROFILES[forcedCountry] ? forcedCountry : "GLOBAL";
    }

    state.lat = lat;
    state.lon = lon;
    if (cityName) state.city = cityName;

    if (state.countryCode === "GLOBAL" && PROFILES.GLOBAL && PROFILES.GLOBAL.rivers && PROFILES.GLOBAL.rivers[0]) {
      const cleanCity = (cityName || "Local Area").split("(")[0].trim();
      PROFILES.GLOBAL.rivers[0].name = `${cleanCity} Main Watershed ⭐`;
      PROFILES.GLOBAL.rivers[0].station = `${cleanCity} Satellite Gauge #1`;
    }

    if (!state.rawWeather) state.rawWeather = buildFallbackWeather();

    renderRegionNavigation();
    renderEverything();
    showLoader(false);
    updateStatusBadge("live", "↻ SYNCING SATELLITE...");

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,precipitation_probability,weather_code,visibility,uv_index,cape,lifted_index,soil_moisture_0_to_7cm,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,precipitation_probability_max,sunrise,sunset&timezone=auto`;

    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5`;
    const floodUrl = `https://flood-api.open-meteo.com/v1/flood?latitude=${lat}&longitude=${lon}&daily=river_discharge&forecast_days=3`;
    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_period,swell_wave_height`;
    const usgsUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=4.0&limit=10&orderby=time`;

    try {
      const [wData, aData, fData, mData, qData] = await Promise.all([
        fetchWithTimeout(weatherUrl, 4500),
        fetchWithTimeout(aqiUrl, 3800),
        fetchWithTimeout(floodUrl, 3800),
        fetchWithTimeout(marineUrl, 3800),
        fetchWithTimeout(usgsUrl, 4200),
        state.countryCode === "LK" ? syncRealSriLankaRiverGauges() : Promise.resolve()
      ]);

      if (myToken !== state.fetchToken) return;

      if (wData && wData.current) {
        state.rawWeather = wData;
        const badgeText =
          state.locationSource === "gps"
            ? "● LIVE GPS TELEMETRY"
            : state.locationSource === "ip"
              ? "● LIVE LOCATION TELEMETRY"
              : "● LIVE TELEMETRY";
        updateStatusBadge("live", badgeText);
      } else {
        updateStatusBadge("offline", "⚠ OFFLINE / SIMULATED");
      }

      if (aData) state.rawAqi = aData;
      if (mData) state.rawMarine = mData;
      if (qData && qData.features) state.rawQuakes = qData.features;
      if (fData && fData.daily && fData.daily.river_discharge && fData.daily.river_discharge[0]) {
        state.localDischarge = fData.daily.river_discharge[0];
      }

      state.lastFetchTime = Date.now();
      renderEverything();

      if (state.activeTab === "radar") initOrUpdateRadarMap();
    } catch {
      if (myToken !== state.fetchToken) return;
      updateStatusBadge("offline", "⚠ OFFLINE / SIMULATED");
    }
  }

  /* -----------------------------
     WMO / temp / theme
  ----------------------------- */
  function getWMO(code, isDay = 1) {
    const item = WMO_MAP[code] || { desc: "Partly Cloudy", iconDay: "⛅", iconNight: "☁️", anim: "clouds" };
    return { desc: item.desc, icon: isDay ? item.iconDay : item.iconNight, anim: item.anim };
  }

  function formatTemp(c) {
    return state.unit === "F" ? Math.round((c * 9) / 5 + 32) + "°" : Math.round(c) + "°";
  }

  function applyVisualTheme(animType, isDay, alertLevel) {
    const b = document.body;
    [
      "theme-clear-day",
      "theme-clear-night",
      "theme-cloudy-day",
      "theme-rain",
      "theme-thunder"
    ].forEach((cls) => b.classList.remove(cls));

    if (alertLevel === "red" || animType === "thunder") {
      b.classList.add("theme-thunder");
      state.particleType = "thunder";
    } else if (animType === "rain") {
      b.classList.add("theme-rain");
      state.particleType = "rain";
    } else if (animType === "clouds") {
      b.classList.add("theme-cloudy-day");
      state.particleType = "clouds";
    } else {
      b.classList.add(isDay ? "theme-clear-day" : "theme-clear-night");
      state.particleType = isDay ? "sun-motes" : "stars";
    }
  }

  /* -----------------------------
     Smart context slot
  ----------------------------- */
  function renderSmartContextSlot(m, isDay, riverWorstLevel) {
    const slot = byId("smart-context-slot");
    if (!slot) return;

    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;

    const showSunscreen =
      (state.countryCode === "AU" && m.uvIndex >= 2.5) ||
      (isDay && m.uvIndex >= 4.0 && m.rain1h < 2.0 && profile.sunPriority !== "low");

    if (showSunscreen) {
      const effectiveUV = Math.max(m.uvIndex, 0.5);
      const burnMinutes = Math.max(Math.round(240 / effectiveUV), 10);

      let spfRec = "SPF 30+ Sunscreen";
      let reapplyMins = 120;

      if (m.uvIndex >= 11) {
        spfRec = "SPF 50+ PA++++ & Hat";
        reapplyMins = 60;
      } else if (m.uvIndex >= 8) {
        spfRec = "SPF 50+ Broad Spectrum";
        reapplyMins = 80;
      } else if (m.uvIndex >= 6) {
        spfRec = "SPF 50+ Recommended";
        reapplyMins = 90;
      }

      if (!state.sunTimerRunning) {
        state.sunTimerTotalSec = reapplyMins * 60;
        state.sunTimerRemSec = state.sunTimerTotalSec;
      }

      const hrs = Math.floor(state.sunTimerRemSec / 3600);
      const mins = Math.floor((state.sunTimerRemSec % 3600) / 60);
      const secs = state.sunTimerRemSec % 60;
      const timeStr = `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      const pct = state.sunTimerRemSec / Math.max(state.sunTimerTotalSec, 1);
      const offset = 138 - 138 * pct;

      slot.innerHTML = `
        <div class="sunscreen-widget">
          <div class="sun-ring-wrap">
            <svg class="sun-ring-svg" viewBox="0 0 50 50">
              <circle class="sun-ring-bg" cx="25" cy="25" r="22"></circle>
              <circle class="sun-ring-prog" id="sun-ring-prog" cx="25" cy="25" r="22" style="stroke-dashoffset:${offset};"></circle>
            </svg>
            <div class="sun-ring-icon"><i class="ph-fill ph-sun-dim"></i></div>
          </div>
          <div style="flex:1;">
            <div style="font-size:0.68rem; text-transform:uppercase; font-weight:800; color:#fde047;">
              Smart UV Protection (${state.countryCode === "AU" ? "ARPANSA Australia" : "High UV Active"})
            </div>
            <div style="font-size:0.9rem; font-weight:800; margin-top:2px;" class="mono" id="sun-timer-display">
              ${state.sunTimerRunning ? "RE-APPLY IN " + timeStr : "UV " + m.uvIndex.toFixed(1) + " • BURN ~" + burnMinutes + "m"}
            </div>
            <div style="font-size:0.7rem; color:var(--text-secondary);">Advice: <strong>${esc(spfRec)}</strong></div>
          </div>
          <button class="sun-timer-btn" id="sun-timer-btn">${state.sunTimerRunning ? "Reset" : "Start SPF Timer"}</button>
        </div>
      `;
    } else if (state.countryCode === "LK") {
      slot.innerHTML = `
        <div class="smart-advisory-card">
          <div style="display:flex; align-items:center; gap:12px;">
            <i class="ph-fill ph-waves" style="font-size:1.8rem; color:#38bdf8;"></i>
            <div>
              <div style="font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#7dd3fc;">
                Irrigation Dept / RiverNet.lk Live • ${esc(state.city.split("(")[0])}
              </div>
              <div style="font-size:0.86rem; font-weight:700; margin-top:2px;">
                Official Basin Status:
                <span style="color:${riverWorstLevel === "red" ? "#ef4444" : riverWorstLevel === "orange" ? "#f97316" : riverWorstLevel === "yellow" ? "#facc15" : "#10b981"}; text-transform:uppercase;">
                  ${esc(riverWorstLevel)}
                </span>
              </div>
              <div style="font-size:0.7rem; color:var(--text-secondary);">
                Discharge: ~${Math.round(state.localDischarge)} m³/s • Click to inspect gauges.
              </div>
            </div>
          </div>
          <button class="btn" data-action="open-rivers" style="white-space:nowrap;">Gauges</button>
        </div>
      `;
    } else {
      slot.innerHTML = `
        <div class="smart-advisory-card">
          <div style="display:flex; align-items:center; gap:12px;">
            <i class="ph-fill ph-shield-check" style="font-size:1.8rem; color:#34d399;"></i>
            <div>
              <div style="font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#7dd3fc;">
                ${esc(profile.name)} Smart Focus • ${esc(profile.primaryFocus)}
              </div>
              <div style="font-size:0.84rem; font-weight:700; margin-top:2px;">
                Visibility ${(m.visMeters / 1000).toFixed(1)} km • US AQI ${Math.round(m.usAqi)} • Gusts ${Math.round(m.windGusts)} km/h
              </div>
            </div>
          </div>
          <button class="btn" data-action="open-radar" style="white-space:nowrap;">Live Radar</button>
        </div>
      `;
    }
  }

  function toggleSunTimer() {
    if (state.sunTimerRunning) {
      clearInterval(state.sunTimerInterval);
      state.sunTimerRunning = false;
      scheduleRender();
    } else {
      state.sunTimerRunning = true;
      SoundEngine.playBeep(780);

      state.sunTimerInterval = setInterval(() => {
        if (state.sunTimerRemSec > 0) {
          state.sunTimerRemSec--;

          const disp = byId("sun-timer-display");
          const prog = byId("sun-ring-prog");

          if (disp && prog) {
            const hrs = Math.floor(state.sunTimerRemSec / 3600);
            const mins = Math.floor((state.sunTimerRemSec % 3600) / 60);
            const secs = state.sunTimerRemSec % 60;

            disp.textContent = `RE-APPLY IN ${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

            const pct = state.sunTimerRemSec / Math.max(state.sunTimerTotalSec, 1);
            prog.style.strokeDashoffset = 138 - 138 * pct;
          }
        } else {
          clearInterval(state.sunTimerInterval);
          state.sunTimerRunning = false;
          SoundEngine.playBeep(920);
          scheduleRender();
        }
      }, 1000);

      scheduleRender();
    }
  }

  /* -----------------------------
     River helpers
  ----------------------------- */
  function riverStatusColor(cls) {
    if (cls === "red") return "#ef4444";
    if (cls === "orange") return "#f97316";
    if (cls === "yellow") return "#facc15";
    if (cls === "gray") return "#64748b";
    return "#10b981";
  }

  function getBasinLabel(profile, key) {
    if (!key) return "Basin";
    if (profile && profile.basins && profile.basins[key]) return profile.basins[key];
    if (key === "all") return "All Basins";
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  function basinMatchesFilter(river, filter) {
    if (!filter || filter === "all") return true;
    return river.basinGroup === filter;
  }

  function matchesRiverStatusFilter(river, filter) {
    if (!filter || filter === "all") return true;
    if (filter === "attention") return river.status.rank >= 1;
    return river.status.key === filter;
  }

  function matchesRiverSourceFilter(river, filter) {
    if (!filter || filter === "all") return true;
    if (filter === "official") return river.thresholdSource !== "provisional";
    if (filter === "provisional") return river.thresholdSource === "provisional";
    return true;
  }

  function resolveRiverLevel(river, rain24h) {
    const live = state.liveSriLankaGauges && state.liveSriLankaGauges[river.id];
    let level = null;
    let source = "model";

    if (live) {
      if (live.apiStatus === "stale") {
        level = null;
        source = "stale";
      } else if (live.apiStatus === "none") {
        level = null;
        source = "no-marks";
      } else if (live.level !== null && live.level !== undefined && Number.isFinite(Number(live.level))) {
        level = Number(live.level);
        source = "live";
      }
    } else if (state.countryCode === "LK") {
      // Waiting for initial live Sri Lanka API sync
      level = null;
      source = "pending";
    } else if (Number.isFinite(river.normalLvl)) {
      const dischargeFactor = Math.max(0, (num(state.localDischarge) || 50) - 45) * 0.004;
      level = river.normalLvl + (num(rain24h) || 0) * 0.015 + dischargeFactor;
      source = river.thresholdSource === "provisional" ? "provisional-model" : "model";
    }

    if (state.simMode !== "live" && Number.isFinite(river.alertLvl)) {
      const baseLvl = level != null ? level : (river.normalLvl || river.alertLvl * 0.5);
      if (state.simMode === "yellow") level = Math.max(baseLvl, river.alertLvl + 0.15);
      else if (state.simMode === "orange" && Number.isFinite(river.minorLvl)) level = Math.max(baseLvl, river.minorLvl + 0.25);
      else if (state.simMode === "red" && Number.isFinite(river.majorLvl)) level = Math.max(baseLvl, river.majorLvl + 0.45);

      if (Number.isFinite(river.maxScale)) {
        level = clamp(level, 0.1, river.maxScale * 0.96);
      }
    }

    return {
      level,
      source,
      liveMeta: live || null
    };
  }

  function getRiverStatus(river, level, liveMeta = null) {
    if (state.simMode === "live" && liveMeta && liveMeta.apiStatus) {
      const st = liveMeta.apiStatus;
      if (st === "stale") {
        return { key: "pending", label: "⏳ SENSOR OFFLINE", cls: "gray", rank: -1 };
      }
      if (st === "none") {
        return { key: "pending", label: "ℹ NO FLOOD MARKS", cls: "gray", rank: -1 };
      }
      if (st === "major") {
        return { key: "major", label: "🔴 MAJOR FLOOD", cls: "red", rank: 3 };
      }
      if (st === "minor") {
        return { key: "minor", label: "🟠 MINOR FLOOD", cls: "orange", rank: 2 };
      }
      if (st === "alert") {
        return { key: "alert", label: "🟡 ALERT LEVEL", cls: "yellow", rank: 1 };
      }
      if (st === "watch") {
        return { key: "normal", label: "🟢 NEAR ALERT", cls: "green", rank: 0 };
      }
      if (st === "normal" && level != null) {
        return { key: "normal", label: "NORMAL", cls: "green", rank: 0 };
      }
    }

    if (level == null || !Number.isFinite(river.alertLvl)) {
      return { key: "pending", label: "PENDING SYNC", cls: "gray", rank: -1 };
    }

    if (Number.isFinite(river.majorLvl) && level >= river.majorLvl) {
      return { key: "major", label: "🔴 MAJOR FLOOD", cls: "red", rank: 3 };
    }
    if (Number.isFinite(river.minorLvl) && level >= river.minorLvl) {
      return { key: "minor", label: "🟠 MINOR FLOOD", cls: "orange", rank: 2 };
    }
    if (level >= river.alertLvl) {
      return { key: "alert", label: "🟡 ALERT LEVEL", cls: "yellow", rank: 1 };
    }
    return { key: "normal", label: "NORMAL", cls: "green", rank: 0 };
  }

  function riverTrendTag(liveMeta) {
    if (!liveMeta || !liveMeta.trend) return "";
    const t = String(liveMeta.trend).toLowerCase();
    const age = liveMeta.ageMinutes != null ? ` • ${liveMeta.ageMinutes}m ago` : "";
    const d30 =
      liveMeta.delta30m != null && Number.isFinite(liveMeta.delta30m) && Math.abs(liveMeta.delta30m) >= 0.01
        ? ` (${liveMeta.delta30m > 0 ? "+" : ""}${liveMeta.delta30m.toFixed(2)})`
        : "";
    if (t === "rising") return `<span style="color:#fb923c; font-weight:800;">↑ Rising${d30}${age}</span>`;
    if (t === "falling") return `<span style="color:#34d399; font-weight:800;">↓ Falling${d30}${age}</span>`;
    return `<span style="color:#94a3b8; font-weight:700;">→ Steady${age}</span>`;
  }

  function riverSourceTag(source, liveMeta = null) {
    const trendHtml = riverTrendTag(liveMeta);
    if (source === "live") {
      const net = liveMeta && liveMeta.telemetryNetwork;
      const netLabel =
        net === "dual"
          ? `● Dual-Sync (RiverNet 5m + Irrigation)`
          : net === "rivernet"
            ? `● RiverNet.lk 5-Min Sensor${liveMeta && liveMeta.unitId ? ` (${esc(liveMeta.unitId)})` : ""}`
            : `● Live Irrigation Gauge`;
      return `<span style="color:#34d399; font-weight:700;">${netLabel}</span>${trendHtml ? ` <span style="opacity:0.65;">|</span> ${trendHtml}` : ""}`;
    }
    if (source === "stale") return `<span style="color:#94a3b8; font-weight:700;">● Sensor Offline (Awaiting Telemetry)</span>`;
    if (source === "no-marks") return `<span style="color:#94a3b8; font-weight:700;">● No Flood Marks Published</span>`;
    if (source === "model") return `<span style="color:#38bdf8; font-weight:700;">● GloFAS / Rainfall Model</span>`;
    if (source === "provisional-model") return `<span style="color:#fbbf24; font-weight:700;">● Provisional Model Threshold</span>`;
    return `<span style="color:#94a3b8;">● Syncing official gauge…</span>`;
  }

  function distanceBadge(km) {
    if (km == null || !Number.isFinite(km)) return "";
    return `<span class="distance-badge"><i class="ph-fill ph-navigation-arrow"></i> ${km.toFixed(1)} km</span>`;
  }

  function ensureRiverSourceControl() {
    let sel = byId("river-source-filter");
    if (sel) return sel;

    const header = qs("#tab-rivers .rivernet-header-bar");
    if (!header) return null;

    sel = document.createElement("select");
    sel.id = "river-source-filter";
    sel.className = "sim-select source-select";
    sel.setAttribute("aria-label", "River data source filter");
    sel.innerHTML = `
      <option value="all">All Sources</option>
      <option value="official">Official Only</option>
      <option value="provisional">Provisional Only</option>
    `;

    header.appendChild(sel);
    return sel;
  }

  function renderRiverSummaryBar(counts) {
    const items = [
      { label: "All Stations", value: counts.all, cls: "blue" },
      { label: "Needs Attention", value: counts.attention, cls: counts.attention > 0 ? "orange" : "green" },
      { label: "Alert", value: counts.alert, cls: "yellow" },
      { label: "Minor Flood", value: counts.minor, cls: "orange" },
      { label: "Major Flood", value: counts.major, cls: "red" },
      { label: "Normal", value: counts.normal, cls: "green" },
      { label: "Offline / No Marks", value: counts.pending, cls: "gray" },
      { label: "Official Gauges", value: counts.official, cls: "blue" }
    ];

    return `
      <div class="river-summary-bar">
        ${items
          .map(
            (item) => `
              <div class="river-summary-item ${item.cls}">
                <div class="river-summary-value mono">${item.value}</div>
                <div class="river-summary-label">${esc(item.label)}</div>
              </div>
            `
          )
          .join("")}
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
      { key: "pending", label: "⏳ Offline / No Marks", count: counts.pending }
    ];

    return `
      <div class="filter-pills river-status-filters">
        ${filters
          .map(
            (f) => `
              <button class="river-status-btn ${state.riverStatusFilter === f.key ? "active" : ""}" data-status="${f.key}">
                ${esc(f.label)} <span class="river-filter-count">(${f.count})</span>
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderRiverBasinFilters(container, rivers, profile) {
    const keys = ["all", ...Array.from(new Set(rivers.map((r) => r.basinGroup).filter(Boolean)))];

    if (!keys.includes(state.basinFilter)) state.basinFilter = "all";

    container.innerHTML = keys
      .map((key) => {
        const label = key === "all" ? `All Stations (${rivers.length})` : getBasinLabel(profile, key);
        const active = state.basinFilter === key;
        return `<button class="filter-btn ${active ? "active" : ""}" data-filter="${esc(key)}">${esc(label)}</button>`;
      })
      .join("");
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
      ? clamp((Math.max(0, level) / r.maxScale) * 100, 14, 94)
      : 14;

    const waveColor =
      r.status.cls === "red"
        ? "rgba(239, 68, 68, 0.58)"
        : r.status.cls === "orange"
          ? "rgba(249, 115, 22, 0.52)"
          : r.status.cls === "yellow"
            ? "rgba(250, 204, 21, 0.48)"
            : r.status.cls === "gray"
              ? "rgba(100, 116, 139, 0.35)"
              : "rgba(16, 185, 129, 0.42)";

    const alertText = Number.isFinite(r.alertLvl) ? `${r.alertLvl.toFixed(2)}${unit}` : "--";
    const minorText = Number.isFinite(r.minorLvl) ? `${r.minorLvl.toFixed(2)}${unit}` : "--";
    const majorText = Number.isFinite(r.majorLvl) ? `${r.majorLvl.toFixed(2)}${unit}` : "--";

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
              <div class="river-name">${esc(r.name)} ${distanceBadge(r.distanceKm)}</div>
              <div class="river-station"><i class="ph-fill ph-map-pin"></i> ${esc(r.station)}</div>
            </div>
            <div class="sev-stack">
              <span class="sev-pill ${r.status.cls}">${esc(r.status.label)}</span>
              ${r.thresholdSource === "provisional" ? `<span class="prov-tag">PROVISIONAL</span>` : `<span class="prov-tag official">OFFICIAL</span>`}
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
              <div>${riverSourceTag(r.source, r.liveMeta)}</div>
              <div>Alert: <strong>${alertText}</strong> • Minor: <strong>${minorText}</strong></div>
              <div>Major Flood: <strong>${majorText}</strong>${r.liveMeta && r.liveMeta.rain24h != null ? ` • 24h Rain: <strong>${r.liveMeta.rain24h.toFixed(1)}mm</strong>` : ""}</div>
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

    const pct = level != null ? clamp((Math.max(0, level) / max) * 100, 2, 100) : 0;
    const alertPct = Number.isFinite(r.alertLvl) ? clamp((r.alertLvl / max) * 100, 0, 100) : null;
    const minorPct = Number.isFinite(r.minorLvl) ? clamp((r.minorLvl / max) * 100, 0, 100) : null;
    const majorPct = Number.isFinite(r.majorLvl) ? clamp((r.majorLvl / max) * 100, 0, 100) : null;
    const trendHtml = riverTrendTag(r.liveMeta);

    return `
      <div class="river-row status-${r.status.cls}">
        <div class="river-row-info">
          <div class="river-row-name">
            ${esc(r.name)}
            ${r.thresholdSource === "provisional" ? `<span class="prov-tag small">PROV</span>` : `<span class="prov-tag small official">OFFICIAL</span>`}
          </div>
          <div class="river-row-sub">
            ${esc(r.station)} • ${esc(r.basinName || r.basinGroup)} ${trendHtml ? `• ${trendHtml}` : ""}
          </div>
          ${r.distanceKm != null ? `<div class="river-row-distance"><i class="ph-fill ph-navigation-arrow"></i> ${r.distanceKm.toFixed(1)} km from ${esc(state.city.split("(")[0].trim())}</div>` : ""}
        </div>

        <div class="river-row-meter">
          <div class="river-threshold-track">
            <div class="river-threshold-fill" style="width:${pct}%; background:${riverStatusColor(r.status.cls)};"></div>
            ${alertPct != null ? `<span class="river-threshold-mark alert" style="left:${alertPct}%;" title="Alert: ${r.alertLvl}${unit}"></span>` : ""}
            ${minorPct != null ? `<span class="river-threshold-mark minor" style="left:${minorPct}%;" title="Minor Flood: ${r.minorLvl}${unit}"></span>` : ""}
            ${majorPct != null ? `<span class="river-threshold-mark major" style="left:${majorPct}%;" title="Major Flood: ${r.majorLvl}${unit}"></span>` : ""}
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
      try {
        state.riverMap.remove();
      } catch {}
      state.riverMap = null;
      state.riverMarkerGroup = null;
    }
  }

  function initOrUpdateRiverMap(stations) {
    const mapDiv = byId("river-map");
    if (!mapDiv) return;

    removeRiverMap();

    if (typeof L === "undefined") {
      mapDiv.innerHTML = `<div class="river-map-fallback">Leaflet map library is not loaded.</div>`;
      return;
    }

    const center = Number.isFinite(state.lat) && Number.isFinite(state.lon)
      ? [state.lat, state.lon]
      : [7.5, 80.4];

    state.riverMap = L.map(mapDiv, {
      zoomControl: true,
      attributionControl: false
    }).setView(center, 7);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18
    }).addTo(state.riverMap);

    state.riverMarkerGroup = L.layerGroup().addTo(state.riverMap);

    const bounds = [];

    (stations || []).forEach((r) => {
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
          Distance: <strong>${r.distanceKm == null ? "--" : r.distanceKm.toFixed(1)} km</strong><br>
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

    if (Number.isFinite(state.lat) && Number.isFinite(state.lon)) {
      L.circleMarker([state.lat, state.lon], {
        radius: 8,
        color: "#38bdf8",
        fillColor: "#38bdf8",
        fillOpacity: 0.95,
        weight: 2
      }).bindPopup(`<strong>${esc(state.city)}</strong><br>Selected / live location`).addTo(state.riverMarkerGroup);
      bounds.push([state.lat, state.lon]);
    }

    if (bounds.length > 1) {
      state.riverMap.fitBounds(bounds, { padding: [35, 35], maxZoom: 11 });
    } else if (bounds.length === 1) {
      state.riverMap.setView(bounds[0], 10);
    }
  }

  function renderRiverStations(rain24h) {
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;
    const container = byId("rivers-container");
    if (!container) return "green";

    removeRiverMap();
    container.innerHTML = "";

    ensureRiverSourceControl();

    const rivers = profile.rivers || [];

    const countBadge = byId("river-count-badge");
    if (countBadge) countBadge.textContent = rivers.length;

    const basinFiltersEl = byId("basin-filters");
    if (basinFiltersEl) {
      basinFiltersEl.style.display = state.countryCode === "LK" ? "flex" : "none";
      if (state.countryCode === "LK") renderRiverBasinFilters(basinFiltersEl, rivers, profile);
    }

    const sourceSel = byId("river-source-filter");
    if (sourceSel) {
      sourceSel.style.display = state.countryCode === "LK" ? "" : "none";
      sourceSel.value = state.riverSourceFilter;
    }

    const directBtn = byId("rivernet-direct-btn");
    if (directBtn) directBtn.style.display = state.countryCode === "LK" ? "inline-flex" : "none";

    const hubTitle = byId("river-hub-title");
    if (hubTitle) {
      hubTitle.textContent = state.countryCode === "LK"
        ? `Sri Lanka Irrigation Dept & RiverNet.lk Live Gauge Telemetry — ${rivers.length} Official Stations`
        : `${profile.name} (${profile.agency}) River & Watershed Telemetry`;
    }

    const enriched = rivers.map((river) => {
      const resolved = resolveRiverLevel(river, rain24h);
      const status = getRiverStatus(river, resolved.level, resolved.liveMeta);
      const distanceKm =
        Number.isFinite(state.lat) && Number.isFinite(state.lon) && Number.isFinite(river.lat) && Number.isFinite(river.lon)
          ? calcDistanceKm(state.lat, state.lon, river.lat, river.lon)
          : null;

      return {
        ...river,
        basinName: getBasinLabel(profile, river.basinGroup),
        level: resolved.level,
        source: resolved.source,
        liveMeta: resolved.liveMeta,
        status,
        distanceKm
      };
    });

    state.lastRiverStations = enriched;

    let worstAllRank = 0;
    let worstOfficialRank = 0;
    let hasOfficial = false;

    enriched.forEach((r) => {
      if (r.thresholdSource !== "provisional") {
        hasOfficial = true;
        if (r.status.rank > worstOfficialRank) worstOfficialRank = r.status.rank;
      }
      if (r.status.rank > worstAllRank) worstAllRank = r.status.rank;
    });

    const worstRank = hasOfficial ? worstOfficialRank : worstAllRank;
    const worst = ["green", "yellow", "orange", "red"][Math.max(0, worstRank)] || "green";

    const pool = enriched.filter(
      (r) => basinMatchesFilter(r, state.basinFilter) && matchesRiverSourceFilter(r, state.riverSourceFilter)
    );

    const nearby = [...pool]
      .sort((a, b) => (a.distanceKm ?? 99999) - (b.distanceKm ?? 99999))
      .slice(0, 6);

    const nearbyIds = new Set(nearby.map((r) => r.id));

    const counts = {
      all: pool.length,
      attention: pool.filter((r) => r.status.rank >= 1).length,
      alert: pool.filter((r) => r.status.key === "alert").length,
      minor: pool.filter((r) => r.status.key === "minor").length,
      major: pool.filter((r) => r.status.key === "major").length,
      normal: pool.filter((r) => r.status.key === "normal").length,
      pending: pool.filter((r) => r.status.key === "pending").length,
      official: pool.filter((r) => r.thresholdSource !== "provisional").length,
      provisional: pool.filter((r) => r.thresholdSource === "provisional").length
    };

    const filtered = pool.filter((r) => matchesRiverStatusFilter(r, state.riverStatusFilter));

    const attention = filtered
      .filter((r) => r.status.rank >= 1 && !nearbyIds.has(r.id))
      .sort((a, b) => {
        const rankDiff = b.status.rank - a.status.rank;
        if (rankDiff !== 0) return rankDiff;
        const aRatio = a.level != null && Number.isFinite(a.alertLvl) ? a.level / Math.max(a.alertLvl, 0.1) : 0;
        const bRatio = b.level != null && Number.isFinite(b.alertLvl) ? b.level / Math.max(b.alertLvl, 0.1) : 0;
        return bRatio - aRatio;
      });

    const normal = filtered
      .filter((r) => r.status.key === "normal" && !nearbyIds.has(r.id))
      .sort((a, b) => {
        const ad = a.distanceKm ?? 99999;
        const bd = b.distanceKm ?? 99999;
        if (ad !== bd) return ad - bd;
        return (b.level || 0) - (a.level || 0);
      });

    const pending = filtered
      .filter((r) => r.status.key === "pending" && !nearbyIds.has(r.id))
      .sort((a, b) => {
        const ad = a.distanceKm ?? 99999;
        const bd = b.distanceKm ?? 99999;
        if (ad !== bd) return ad - bd;
        return String(a.name || "").localeCompare(String(b.name || ""));
      });

    const nearbyHtml = nearby.length
      ? `
        <section class="river-section">
          <div class="section-header">
            <div class="section-title">📍 Near You / Nearest Gauges</div>
            <span class="region-focus-lbl">${esc(state.city)}</span>
          </div>
          <div class="nearby-note">Closest official gauges to your live or selected location.</div>
          <div class="rivers-grid" style="margin-top:10px;">
            ${nearby.map(riverCardHTML).join("")}
          </div>
        </section>
      `
      : "";

    container.innerHTML = `
      ${renderRiverSummaryBar(counts)}
      ${renderRiverStatusFilters(counts)}

      ${counts.provisional > 0 ? `
        <div class="river-disclaimer">
          Smart safety mode: official stations control the master emergency banner. Provisional stations are model-assisted and shown for early awareness only. Verify with Irrigation Department / RiverNet.lk before emergency action.
        </div>
      ` : ""}

      ${nearbyHtml}

      <section class="river-section">
        <div class="section-header">
          <div class="section-title">⚠ Needs Attention / Flood Status</div>
          <span class="region-focus-lbl">${attention.length} station(s)</span>
        </div>

        ${attention.length > 0
          ? `<div class="rivers-grid">${attention.map(riverCardHTML).join("")}</div>`
          : `<div class="river-empty glass">No additional station is currently above Alert level outside the nearby panel.</div>`
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
                <div class="section-title">⏳ Offline Sensors / Unmarked Gauges</div>
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
      setTimeout(() => initOrUpdateRiverMap( filtered.length ? filtered : enriched ), 80);
    }

    return worst;
  }

  /* -----------------------------
     Hazard matrix
  ----------------------------- */
  function renderHazardMatrix(m) {
    const grid = byId("hazard-grid");
    if (!grid) return "green";

    const rankOrder = { green: 0, yellow: 1, orange: 2, red: 3 };
    let highestRank = 0;
    const bumpRank = (lvl) => {
      if (rankOrder[lvl] > highestRank) highestRank = rankOrder[lvl];
    };

    const burnTimeMins = m.uvIndex >= 1 ? Math.max(Math.round(240 / m.uvIndex), 10) : 180;

    let uvLvl = "green", uvLabel = "LOW", spfRec = "SPF 15+ / None", uvColor = "#10b981";
    if (m.uvIndex >= 11) { uvLvl = "red"; uvLabel = "EXTREME"; spfRec = "SPF 50+ PA++++ & Hat"; uvColor = "#ef4444"; }
    else if (m.uvIndex >= 8) { uvLvl = "orange"; uvLabel = "VERY HIGH"; spfRec = "SPF 50+ Every 80m"; uvColor = "#f97316"; }
    else if (m.uvIndex >= 6) { uvLvl = "yellow"; uvLabel = "HIGH"; spfRec = "SPF 50+ Broad Spec"; uvColor = "#facc15"; }
    else if (m.uvIndex >= 3) { uvLvl = "yellow"; uvLabel = "MODERATE"; spfRec = "SPF 30+ Sunscreen"; uvColor = "#facc15"; }
    bumpRank(uvLvl);

    let heatLvl = "green", heatLabel = "COMFORTABLE", heatAction = "Normal hydration", heatColor = "#10b981";
    if (m.feelsC >= 41) { heatLvl = "red"; heatLabel = "EXTREME DANGER"; heatAction = "Heatstroke risk! Stay cooled"; heatColor = "#ef4444"; }
    else if (m.feelsC >= 36) { heatLvl = "orange"; heatLabel = "HIGH STRESS"; heatAction = "Limit outdoor exertion"; heatColor = "#f97316"; }
    else if (m.feelsC >= 32) { heatLvl = "yellow"; heatLabel = "CAUTION"; heatAction = "Drink water every 30m"; heatColor = "#facc15"; }
    bumpRank(heatLvl);

    let rainLvl = "green", rainLabel = "NORMAL", rainAction = "Below 50mm watch limit", rainColor = "#10b981";
    if (m.rain24h >= 100 || m.rain1h >= 40) { rainLvl = "red"; rainLabel = "EXTREME FLOOD/SLIDE"; rainAction = "Red Threshold (>100mm)"; rainColor = "#ef4444"; }
    else if (m.rain24h >= 65 || m.rain1h >= 20) { rainLvl = "orange"; rainLabel = "HEAVY DOWNPOUR"; rainAction = "Flash flood & slope warning"; rainColor = "#f97316"; }
    else if (m.rain24h >= 35) { rainLvl = "yellow"; rainLabel = "MODERATE WATCH"; rainAction = "Monitor low-lying roads"; rainColor = "#facc15"; }
    bumpRank(rainLvl);

    let windLvl = "green", windLabel = "CALM / BREEZE", windAction = "Safe coastal & road conditions", windColor = "#10b981";
    if (m.windGusts >= 75) { windLvl = "red"; windLabel = "CYCLONIC GALE"; windAction = "Tree/powerline hazard! Stay in"; windColor = "#ef4444"; }
    else if (m.windGusts >= 55) { windLvl = "orange"; windLabel = "STRONG SQUALLS"; windAction = "Rough seas & roof damage risk"; windColor = "#f97316"; }
    else if (m.windGusts >= 38) { windLvl = "yellow"; windLabel = "GUSTY WINDS"; windAction = "Caution for small craft/bikes"; windColor = "#facc15"; }
    bumpRank(windLvl);

    let aqiLvl = "green", aqiLabel = "GOOD AIR", aqiAction = "Clean breathable air", aqiColor = "#10b981";
    if (m.usAqi >= 151) { aqiLvl = "red"; aqiLabel = "UNHEALTHY"; aqiAction = "Wear N95 mask outdoors"; aqiColor = "#ef4444"; }
    else if (m.usAqi >= 101) { aqiLvl = "orange"; aqiLabel = "SENSITIVE RISK"; aqiAction = "Asthma/elderly limit exposure"; aqiColor = "#f97316"; }
    else if (m.usAqi >= 51) { aqiLvl = "yellow"; aqiLabel = "MODERATE"; aqiAction = "Acceptable air quality"; aqiColor = "#facc15"; }
    bumpRank(aqiLvl);

    const visKm = (m.visMeters / 1000).toFixed(1);
    let visLvl = "green", visLabel = "CLEAR VIEW", visAction = "Optimal driving visibility", visColor = "#10b981";
    if (m.visMeters < 1000) { visLvl = "red"; visLabel = "DENSE FOG / BLIND"; visAction = "Use hazard/fog lights (<1km)"; visColor = "#ef4444"; }
    else if (m.visMeters < 3000) { visLvl = "orange"; visLabel = "POOR VISIBILITY"; visAction = "Slow down on hill roads"; visColor = "#f97316"; }
    else if (m.visMeters < 6000) { visLvl = "yellow"; visLabel = "MODERATE HAZE"; visAction = "Light mist or rain spray"; visColor = "#facc15"; }
    bumpRank(visLvl);

    let thundLvl = "green", thundLabel = "STABLE AIR", thundAction = "Low convective lightning risk", thundColor = "#10b981";
    if (m.cape >= 2500 || m.liftedIdx <= -6) { thundLvl = "red"; thundLabel = "SEVERE LIGHTNING"; thundAction = "Extreme CAPE! Unplug & shelter"; thundColor = "#ef4444"; }
    else if (m.cape >= 1500 || m.liftedIdx <= -3) { thundLvl = "orange"; thundLabel = "HIGH CONVECTIVE"; thundAction = "Strong thunderclouds forming"; thundColor = "#f97316"; }
    else if (m.cape >= 800) { thundLvl = "yellow"; thundLabel = "STORM WATCH"; thundAction = "Afternoon rumbles possible"; thundColor = "#facc15"; }
    bumpRank(thundLvl);

    const soilPct = Math.min(Math.round((m.soilMoisture / 0.55) * 100), 100);
    let soilLvl = "green", soilLabel = "STABLE SOIL", soilAction = "Normal ground absorption", soilColor = "#10b981";
    if (soilPct >= 85 || m.rain24h >= 100) { soilLvl = "red"; soilLabel = "CRITICAL SATURATION"; soilAction = "High landslide & runoff risk"; soilColor = "#ef4444"; }
    else if (soilPct >= 70 || m.rain24h >= 65) { soilLvl = "orange"; soilLabel = "SATURATED SLOPES"; soilAction = "Watch cut slopes & walls"; soilColor = "#f97316"; }
    else if (soilPct >= 55) { soilLvl = "yellow"; soilLabel = "MOIST GROUND"; soilAction = "Moderate surface runoff"; soilColor = "#facc15"; }
    bumpRank(soilLvl);

    const cardsHTML = [
      { icon: "ph-sun", title: "UV Severity & SPF", lvl: uvLvl, label: uvLabel, color: uvColor, main: `UV ${m.uvIndex.toFixed(1)}`, pct: Math.min((m.uvIndex / 12) * 100, 100), r1: ["Burn Time:", `~${burnTimeMins} mins`], r2: ["SPF Advice:", spfRec] },
      { icon: "ph-thermometer-hot", title: "Heat Stress Index", lvl: heatLvl, label: heatLabel, color: heatColor, main: `Feels ${formatTemp(m.feelsC)}`, pct: Math.min(Math.max(((m.feelsC - 20) / 26) * 100, 10), 100), r1: ["Air Temp / RH:", `${formatTemp(m.tempC)} at ${m.humidity}%`], r2: ["Advice:", heatAction] },
      { icon: "ph-cloud-rain", title: "Rainfall Risk", lvl: rainLvl, label: rainLabel, color: rainColor, main: `${m.rain24h.toFixed(1)} mm`, pct: Math.min((m.rain24h / 150) * 100, 100), r1: ["1h Intensity:", `${m.rain1h.toFixed(1)} mm/hr`], r2: ["Status:", rainAction] },
      { icon: "ph-wind", title: "Wind & Squall Risk", lvl: windLvl, label: windLabel, color: windColor, main: `${Math.round(m.windGusts)} km/h`, pct: Math.min((m.windGusts / 95) * 100, 100), r1: ["Sustained Wind:", `${Math.round(m.windSpeed)} km/h`], r2: ["Advisory:", windAction] },
      { icon: "ph-leaf", title: "AQI & Particulate Risk", lvl: aqiLvl, label: aqiLabel, color: aqiColor, main: `US AQI ${Math.round(m.usAqi)}`, pct: Math.min((m.usAqi / 200) * 100, 100), r1: ["PM2.5 / PM10:", `${m.pm25.toFixed(1)} / ${m.pm10.toFixed(0)} µg/m³`], r2: ["Health:", aqiAction] },
      { icon: "ph-eye", title: "Visibility Risk", lvl: visLvl, label: visLabel, color: visColor, main: `${visKm} km`, pct: Math.max(100 - m.visMeters / 100, 12), r1: ["Meters Range:", `${Math.round(m.visMeters)} m`], r2: ["Road Safety:", visAction] },
      { icon: "ph-lightning", title: "Thunderstorm Risk", lvl: thundLvl, label: thundLabel, color: thundColor, main: `${Math.round(m.cape)} J/kg`, pct: Math.min((m.cape / 3200) * 100, 100), r1: ["Lifted Index:", `${m.liftedIdx.toFixed(1)}°C`], r2: ["Convection:", thundAction] },
      { icon: "ph-mountains", title: "Slope & Soil Moisture", lvl: soilLvl, label: soilLabel, color: soilColor, main: `${soilPct}% Sat`, pct: soilPct, r1: ["0-7cm Moisture:", `${m.soilMoisture.toFixed(2)} m³/m³`], r2: ["Slope Status:", soilAction] }
    ];

    grid.innerHTML = cardsHTML
      .map(
        (c) => `
          <div class="hazard-card sev-${c.lvl}">
            <div class="haz-top">
              <span class="haz-title"><i class="ph-fill ${c.icon}"></i> ${esc(c.title)}</span>
              <span class="sev-pill ${c.lvl}">${esc(c.label)}</span>
            </div>
            <div class="haz-main-val mono" style="color:${c.color};">${esc(c.main)}</div>
            <div class="haz-bar">
              <div class="haz-bar-fill" style="width:${Math.max(c.pct, 8)}%; background:${c.color};"></div>
            </div>
            <div class="haz-sub-rows">
              <div class="haz-row"><span>${esc(c.r1[0])}</span> <strong>${esc(c.r1[1])}</strong></div>
              <div class="haz-row"><span>${esc(c.r2[0])}</span> <strong>${esc(c.r2[1])}</strong></div>
            </div>
          </div>
        `
      )
      .join("");

    return ["green", "yellow", "orange", "red"][highestRank];
  }

  /* -----------------------------
     Marine & seismic
  ----------------------------- */
  function renderMarineAndSeismic() {
    const waveEl = byId("marine-wave");
    if (!waveEl) return;

    const mCurr = state.rawMarine && state.rawMarine.current;
    const waveH = mCurr && mCurr.wave_height != null ? mCurr.wave_height : 1.1;
    const swellH = mCurr && mCurr.swell_wave_height != null ? mCurr.swell_wave_height : 0.9;
    const waveP = mCurr && mCurr.wave_period != null ? mCurr.wave_period : 8.2;

    waveEl.textContent = `${waveH.toFixed(1)} m`;

    const swellEl = byId("marine-swell");
    const periodEl = byId("marine-period");
    if (swellEl) swellEl.textContent = `${swellH.toFixed(1)} m`;
    if (periodEl) periodEl.textContent = `${waveP.toFixed(1)} s`;

    const advEl = byId("marine-advisory");
    if (advEl) {
      if (waveH >= 3.0) {
        advEl.textContent = "🔴 High Coastal Swell Warning: Rough seas. Unsafe for small fishing/naval craft.";
        advEl.style.borderColor = "#ef4444";
      } else if (waveH >= 2.0) {
        advEl.textContent = "🟡 Moderate Coastal Swell: Exercise caution near coastal reefs and estuaries.";
        advEl.style.borderColor = "#facc15";
      } else {
        advEl.textContent = "🟢 Coastal Conditions Normal: Safe swell heights recorded along nearest marine grid.";
        advEl.style.borderColor = "rgba(56, 189, 248, 0.25)";
      }
    }

    const qContainer = byId("quake-container");
    if (!qContainer) return;

    qContainer.innerHTML = "";

    if (!state.rawQuakes.length) {
      qContainer.innerHTML = `<div style="font-size:0.78rem; color:var(--text-secondary);">Syncing global USGS M4.0+ seismic feed...</div>`;
      return;
    }

    const qFrag = document.createDocumentFragment();

    state.rawQuakes.slice(0, 7).forEach((q) => {
      const mag = q.properties && q.properties.mag != null ? q.properties.mag : 4.0;
      const place = (q.properties && q.properties.place) || "Oceanic Trench";
      const tsunami = q.properties && q.properties.tsunami === 1;
      const coords = (q.geometry && q.geometry.coordinates) || [0, 0, 10];
      const distKm = calcDistanceKm(state.lat, state.lon, coords[1], coords[0]);
      const timeAgoMins = Math.max(Math.round((Date.now() - ((q.properties && q.properties.time) || Date.now())) / 60000), 1);
      const timeLbl = timeAgoMins >= 60 ? `${Math.floor(timeAgoMins / 60)}h ago` : `${timeAgoMins}m ago`;
      const magClass = mag >= 6.0 ? "m-high" : mag >= 5.0 ? "m-mod" : "m-low";

      const item = document.createElement("div");
      item.className = "quake-item";
      item.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="quake-mag mono ${magClass}">M${mag.toFixed(1)}</div>
          <div>
            <div class="quake-place">${esc(place)}</div>
            <div class="quake-meta">Depth: ${Math.round(coords[2])}km • ${distKm.toLocaleString()} km away • ${timeLbl}</div>
          </div>
        </div>
        <span class="sev-pill ${tsunami ? "red" : "green"}">${tsunami ? "🌊 TSUNAMI WATCH" : "NO TSUNAMI"}</span>
      `;
      qFrag.appendChild(item);
    });

    qContainer.appendChild(qFrag);
  }

  /* -----------------------------
     Radar map
  ----------------------------- */
  async function initOrUpdateRadarMap() {
    const mapEl = byId("radar-map");
    if (!mapEl || typeof L === "undefined") return;

    if (!state.leafletMap) {
      state.leafletMap = L.map("radar-map", { zoomControl: true }).setView([state.lat, state.lon], 8);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap & CartoDB | RainViewer Radar",
        maxZoom: 18
      }).addTo(state.leafletMap);

      state.markerGroup = L.layerGroup().addTo(state.leafletMap);

      const rvData = await fetchWithTimeout("https://api.rainviewer.com/public/weather-maps.json", 3500);

      if (rvData && rvData.radar && rvData.radar.past && rvData.radar.past.length) {
        const latestRadar = rvData.radar.past[rvData.radar.past.length - 1];

        state.radarLayer = L.tileLayer(`https://tilecache.rainviewer.com${latestRadar.path}/256/{z}/{x}/{y}/2/1_1.png`, {
          opacity: 0.65,
          zIndex: 10
        }).addTo(state.leafletMap);

        const dt = new Date(latestRadar.time * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const stamp = byId("radar-timestamp");
        if (stamp) stamp.textContent = `Doppler Radar Sync: ${dt}`;
      }
    } else {
      state.leafletMap.invalidateSize();
      state.leafletMap.setView([state.lat, state.lon], 8);
    }

    state.markerGroup.clearLayers();

    L.circleMarker([state.lat, state.lon], {
      radius: 9,
      color: "#38bdf8",
      fillColor: "#38bdf8",
      fillOpacity: 0.85
    }).bindPopup(`<strong>${esc(state.city)}</strong><br>Selected Telemetry Center`).addTo(state.markerGroup);

    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;
    (profile.rivers || []).forEach((r) => {
      L.circleMarker([r.lat, r.lon], {
        radius: 6,
        color: "#10b981",
        fillColor: "#10b981",
        fillOpacity: 0.9
      }).bindPopup(`<strong>${esc(r.name)}</strong><br>Station: ${esc(r.station)}<br>Alert Lvl: ${r.alertLvl}${esc(r.unit)}`).addTo(state.markerGroup);
    });
  }

  /* -----------------------------
     Master alert banner
  ----------------------------- */
  function updateMasterAlertBanner(hazardLvl, riverLvl, rain24h, windGusts, uvIndex, animType, isDay) {
    const rank = { green: 0, yellow: 1, orange: 2, red: 3 };
    const finalRank = Math.max(rank[hazardLvl] || 0, rank[riverLvl] || 0);
    const level = ["green", "yellow", "orange", "red"][finalRank];

    state.alertLevel = level;

    const banner = byId("alert-banner");
    const pill = byId("alert-pill");
    const title = byId("alert-title");
    const desc = byId("alert-desc");
    const icon = byId("alert-icon");
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;

    if (banner) banner.className = `alert-banner glass level-${level}`;
    document.body.classList.toggle("red-alert-active", level === "red");

    if (level === "red") {
      if (pill) pill.textContent = "🔴 RED ALERT • EMERGENCY ACTION REQUIRED";
      if (title) {
        title.textContent = state.countryCode === "LK"
          ? "Major Flood & Landslide Emergency: Official Gauges Critical"
          : `Critical Multi-Hazard Emergency Warning in ${state.city}`;
      }
      if (desc) desc.textContent = `Extreme thresholds exceeded (24h Rain: ${rain24h.toFixed(1)}mm | Gusts: ${Math.round(windGusts)} km/h). Open the RiverNet tab for live station gauges.`;
      if (icon) icon.innerHTML = `<i class="ph-fill ph-warning-octagon"></i>`;
      state.rainIntensity = 3.0;
    } else if (level === "orange") {
      if (pill) pill.textContent = "🟠 ORANGE ALERT • BE PREPARED";
      if (title) {
        title.textContent = state.countryCode === "LK"
          ? "Amber Flood & Slope Warning: Official Basins Rising"
          : `Severe Weather & Hazard Warning Active in ${state.city}`;
      }
      if (desc) desc.textContent = `Heavy rainfall (${rain24h.toFixed(1)}mm) or Minor Flood river levels detected. Monitor RiverNet & 8-Hazard tabs closely.`;
      if (icon) icon.innerHTML = `<i class="ph-fill ph-warning"></i>`;
      state.rainIntensity = 2.0;
    } else if (level === "yellow") {
      if (pill) pill.textContent = "🟡 YELLOW ALERT • WEATHER & BASIN WATCH";
      if (title) title.textContent = `Advisory Watch Active Across ${state.city}`;
      if (desc) desc.textContent = `Elevated weather or tributary Alert levels detected. Check the RiverNet & 8-Hazard tabs for details.`;
      if (icon) icon.innerHTML = `<i class="ph-fill ph-bell-ringing"></i>`;
      state.rainIntensity = 1.25;
    } else {
      if (pill) pill.textContent = "🟢 GREEN • ALL CLEAR";
      if (title) title.textContent = `Conditions Normal Across ${state.city}`;
      if (desc) desc.textContent = `Live telemetry from ${profile.agency} confirms safe atmospheric and hydrological conditions.`;
      if (icon) icon.innerHTML = `<i class="ph-fill ph-shield-check"></i>`;
      state.rainIntensity = 1.0;
    }

    applyVisualTheme(animType, isDay, level);
    SoundEngine.updateMix();
  }

  /* -----------------------------
     Main render
  ----------------------------- */
  function renderEverything() {
    const data = state.rawWeather;
    if (!data || !data.current || !data.hourly || !data.daily) return;

    const current = data.current;
    const daily = data.daily;
    const hourly = data.hourly;
    const isDay = current.is_day;
    const nowISO = (current.time || "").slice(0, 13);

    let hIdx = hourly.time.findIndex((t) => t.startsWith(nowISO));
    if (hIdx === -1) hIdx = 0;

    let tempC = current.temperature_2m ?? 28;
    let feelsC = current.apparent_temperature ?? tempC;
    let humidity = current.relative_humidity_2m ?? 75;
    let pressure = current.surface_pressure ?? 1011;
    let rain1h = current.precipitation || 0;
    let rain24h = daily.precipitation_sum && daily.precipitation_sum[0] ? daily.precipitation_sum[0] : 0;
    let windSpeed = current.wind_speed_10m || 0;
    let windGusts = current.wind_gusts_10m || windSpeed;
    let weatherCode = current.weather_code ?? 2;
    let uvIndex = hourly.uv_index && hourly.uv_index[hIdx] != null
      ? hourly.uv_index[hIdx]
      : isDay
        ? daily.uv_index_max && daily.uv_index_max[0] != null ? daily.uv_index_max[0] : 6
        : 0.2;
    let visMeters = hourly.visibility && hourly.visibility[hIdx] != null ? hourly.visibility[hIdx] : 10000;
    let cape = hourly.cape && hourly.cape[hIdx] != null ? hourly.cape[hIdx] : 250;
    let liftedIdx = hourly.lifted_index && hourly.lifted_index[hIdx] != null ? hourly.lifted_index[hIdx] : 1.2;
    let soilMoisture = hourly.soil_moisture_0_to_7cm && hourly.soil_moisture_0_to_7cm[hIdx] != null ? hourly.soil_moisture_0_to_7cm[hIdx] : 0.32;
    let usAqi = state.rawAqi && state.rawAqi.current && state.rawAqi.current.us_aqi != null ? state.rawAqi.current.us_aqi : 32;
    let pm25 = state.rawAqi && state.rawAqi.current && state.rawAqi.current.pm2_5 != null ? state.rawAqi.current.pm2_5 : 9.4;
    let pm10 = state.rawAqi && state.rawAqi.current && state.rawAqi.current.pm10 != null ? state.rawAqi.current.pm10 : 18.0;

    if (state.simMode === "yellow") {
      uvIndex = Math.max(uvIndex, 6.8);
      feelsC = Math.max(feelsC, 34.5);
      rain24h = Math.max(rain24h, 46.0);
      windGusts = Math.max(windGusts, 46);
      usAqi = Math.max(usAqi, 78);
      visMeters = Math.min(visMeters, 4200);
      cape = Math.max(cape, 1150);
      weatherCode = 63;
    } else if (state.simMode === "orange") {
      uvIndex = Math.max(uvIndex, 9.5);
      feelsC = Math.max(feelsC, 39.5);
      rain1h = Math.max(rain1h, 24.0);
      rain24h = Math.max(rain24h, 92.0);
      windSpeed = Math.max(windSpeed, 42);
      windGusts = Math.max(windGusts, 68);
      usAqi = Math.max(usAqi, 138);
      pm25 = Math.max(pm25, 52.4);
      visMeters = Math.min(visMeters, 1800);
      cape = Math.max(cape, 2100);
      liftedIdx = -4.2;
      soilMoisture = 0.46;
      weatherCode = 65;
    } else if (state.simMode === "red") {
      uvIndex = 12.2;
      feelsC = 44.0;
      rain1h = 54.0;
      rain24h = 178.5;
      windSpeed = 64;
      windGusts = 96;
      usAqi = 188;
      pm25 = 112.0;
      visMeters = 650;
      cape = 3450;
      liftedIdx = -7.5;
      soilMoisture = 0.54;
      weatherCode = 99;
    }

    const wmo = getWMO(weatherCode, isDay);
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;

    const setText = (id, value) => {
      const el = byId(id);
      if (el) el.textContent = value;
    };

    const locNameEl = byId("loc-name");
    if (locNameEl) {
      if (state.locationSource === "gps" || state.locationSource === "ip") {
        const tag = state.locationSource === "gps" ? "LIVE GPS" : "LIVE AUTO";
        locNameEl.innerHTML = `${esc(state.city)} <span class="prov-tag official" style="margin-left:6px; vertical-align:middle;">● ${tag}</span>`;
      } else {
        locNameEl.textContent = state.city;
      }
    }

    const locBtn = byId("loc-btn");
    const locLbl = byId("loc-label");
    if (locBtn) {
      const isLiveLoc = state.locationSource === "gps" || state.locationSource === "ip";
      locBtn.classList.toggle("audio-active", isLiveLoc);
      if (locLbl) locLbl.textContent = state.locationSource === "gps" ? "GPS: Live" : isLiveLoc ? "Live: Auto" : "Live GPS";
    }

    setText("current-temp", formatTemp(tempC));
    setText("current-icon", wmo.icon);
    setText("current-desc", wmo.desc);
    setText("temp-max", formatTemp(daily.temperature_2m_max && daily.temperature_2m_max[0] != null ? daily.temperature_2m_max[0] : tempC + 2));
    setText("temp-min", formatTemp(daily.temperature_2m_min && daily.temperature_2m_min[0] != null ? daily.temperature_2m_min[0] : tempC - 3));
    setText("feels-like", formatTemp(feelsC));
    setText("surface-pressure", `${Math.round(pressure)} hPa`);

    const riseEl = byId("sunrise-time");
    const setEl = byId("sunset-time");
    if (riseEl && setEl && daily.sunrise && daily.sunset && daily.sunrise[0] && daily.sunset[0]) {
      riseEl.textContent = daily.sunrise[0].slice(11, 16);
      setEl.textContent = daily.sunset[0].slice(11, 16);
    }

    try {
      setText("current-date", new Date().toLocaleString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: data.timezone || "UTC"
      }));
    } catch {
      setText("current-date", new Date().toLocaleString());
    }

    setText("qm-rain", `${rain24h.toFixed(1)} mm`);
    setText("qm-rain-sub", rain24h >= 50 ? "Heavy rain watch" : "Normal range");
    setText("qm-wind", `${Math.round(windGusts)} km/h`);
    setText("qm-wind-sub", `Sustained ${Math.round(windSpeed)} km/h`);
    setText("qm-uv", uvIndex.toFixed(1));
    setText("qm-uv-sub", uvIndex >= 6 ? "Protection needed" : "Low burn risk");
    setText("qm-aqi", `AQI ${Math.round(usAqi)}`);
    setText("qm-aqi-sub", `PM2.5: ${pm25.toFixed(1)} µg/m³`);
    setText("smart-region-tag", `Focus: ${profile.primaryFocus}`);

    const hourlyEl = byId("hourly-container");
    if (hourlyEl) {
      hourlyEl.innerHTML = "";
      const hrFrag = document.createDocumentFragment();

      for (let i = hIdx; i < hIdx + 24 && i < hourly.time.length; i++) {
        const dObj = new Date(hourly.time[i]);
        const hLabel = i === hIdx ? "Now" : dObj.toLocaleTimeString([], { hour: "numeric", hour12: true });
        const hWmo = getWMO(hourly.weather_code[i], hourly.is_day && hourly.is_day[i] != null ? hourly.is_day[i] : 1);
        const pop = hourly.precipitation_probability && hourly.precipitation_probability[i] != null ? hourly.precipitation_probability[i] : 0;

        const div = document.createElement("div");
        div.className = `hour-item ${i === hIdx ? "now" : ""}`;
        div.innerHTML = `
          <span class="hour-time">${esc(hLabel)}</span>
          <span class="hour-icon">${hWmo.icon}</span>
          <span class="hour-pop">${pop > 10 ? `<i class="ph-fill ph-drop"></i>${pop}%` : ""}</span>
          <span class="hour-temp">${formatTemp(hourly.temperature_2m[i])}</span>
        `;
        hrFrag.appendChild(div);
      }

      hourlyEl.appendChild(hrFrag);
    }

    const riverWorstLevel = renderRiverStations(rain24h);

    const hazardWorstLevel = renderHazardMatrix({
      uvIndex,
      feelsC,
      tempC,
      humidity,
      rain1h,
      rain24h,
      windSpeed,
      windGusts,
      usAqi,
      pm25,
      pm10,
      visMeters,
      cape,
      liftedIdx,
      soilMoisture
    });

    renderMarineAndSeismic();
    renderSmartContextSlot({ uvIndex, rain1h, visMeters, usAqi, windGusts }, isDay, riverWorstLevel);
    updateMasterAlertBanner(hazardWorstLevel, riverWorstLevel, rain24h, windGusts, uvIndex, wmo.anim, isDay);

    const dailyEl = byId("daily-container");
    if (dailyEl && daily.time && daily.temperature_2m_min && daily.temperature_2m_max) {
      dailyEl.innerHTML = "";
      const dayFrag = document.createDocumentFragment();

      const weekMin = Math.min(...daily.temperature_2m_min);
      const weekMax = Math.max(...daily.temperature_2m_max);
      const range = Math.max(weekMax - weekMin, 1);

      for (let i = 0; i < daily.time.length; i++) {
        const dDate = new Date(daily.time[i] + "T00:00:00");
        const dayName = i === 0 ? "Today" : dDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        const dWmo = getWMO(daily.weather_code[i], 1);
        const pop = daily.precipitation_probability_max && daily.precipitation_probability_max[i] != null ? daily.precipitation_probability_max[i] : 20;
        const dRain = daily.precipitation_sum && daily.precipitation_sum[i] != null ? daily.precipitation_sum[i] : 0;
        const dUv = daily.uv_index_max && daily.uv_index_max[i] != null ? daily.uv_index_max[i] : 7;
        const tMin = daily.temperature_2m_min[i];
        const tMax = daily.temperature_2m_max[i];
        const leftPct = ((tMin - weekMin) / range) * 100;
        const widthPct = ((tMax - tMin) / range) * 100;

        const row = document.createElement("div");
        row.className = "day-row";
        row.innerHTML = `
          <div class="day-name">${esc(dayName)}</div>
          <div class="day-condition">
            <span>${dWmo.icon}</span>
            <span class="day-pop">${pop}% (${dRain}mm)</span>
          </div>
          <div class="day-uv-pill"><i class="ph-fill ph-sun"></i> Max UV ${dUv.toFixed(1)}</div>
          <div class="day-temps">
            <span class="t-min">${formatTemp(tMin)}</span>
            <div class="temp-bar-wrapper">
              <div class="temp-bar-fill" style="left: ${leftPct}%; width: ${Math.max(widthPct, 8)}%;"></div>
            </div>
            <span class="t-max">${formatTemp(tMax)}</span>
          </div>
        `;
        dayFrag.appendChild(row);
      }

      dailyEl.appendChild(dayFrag);
    }

    const alertBoost =
      state.alertLevel === "red" ? 1.35 :
      state.alertLevel === "orange" ? 1.18 :
      state.alertLevel === "yellow" ? 1.06 : 1;

    FX.setScene({
      rain: clamp((rain1h / 7 + rain24h / 110 + (wmo.anim === "rain" || wmo.anim === "thunder" ? 0.18 : 0)) * alertBoost, 0, 1),
      wind: clamp((windGusts / 85) * (state.alertLevel === "red" ? 1.15 : 1), 0, 1),
      fog: visMeters < 1000 ? 0.92 : visMeters < 3000 ? 0.58 : visMeters < 6000 ? 0.25 : 0,
      sun: isDay && uvIndex >= 3 && rain1h < 0.5 ? clamp(uvIndex / 10, 0, 1) : 0,
      star: !isDay && rain1h < 0.2 && visMeters > 5000 ? 0.82 : 0,
      lightning: [95, 96, 99].includes(weatherCode) || state.simMode === "red"
        ? 1
        : cape >= 1800 || liftedIdx <= -4
          ? 0.42
          : 0
    });
  }

  /* -----------------------------
     Region navigation
  ----------------------------- */
  function renderRegionNavigation() {
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;

    const badge = byId("active-country-badge");
    if (badge) badge.textContent = `${profile.flag} ${profile.name}`;

    const hotlines = byId("hotlines-container");
    if (hotlines) {
      hotlines.innerHTML = (profile.hotlines || [])
        .map(
          (h) => `
            <a href="tel:${esc(h.num.replace(/\s+/g, ""))}" class="hotline-chip">
              <span class="hotline-num">${esc(h.num)}</span>
              <span class="hotline-lbl">${esc(h.lbl)}</span>
            </a>
          `
        )
        .join("");
    }

    const pillsEl = byId("state-pills");
    if (!pillsEl) return;

    pillsEl.innerHTML = "";

    (profile.states || []).forEach((st) => {
      const btn = document.createElement("button");
      btn.className = `state-pill ${st.code === state.stateCode ? "active" : ""}`;
      btn.textContent = st.name;
      btn.dataset.stateCode = st.code;
      btn.dataset.lat = st.lat;
      btn.dataset.lon = st.lon;
      btn.dataset.name = st.name;
      pillsEl.appendChild(btn);
    });
  }

  /* -----------------------------
     Tab switching
  ----------------------------- */
  function switchViewTab(tabId) {
    state.activeTab = tabId;

    qsa(".tab-view").forEach((v) => v.classList.remove("active"));
    const target = byId(`tab-${tabId}`);
    if (target) target.classList.add("active");

    qsa(".view-tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tabId));
    qsa(".mob-nav-item").forEach((b) => b.classList.toggle("active", b.dataset.mobTab === tabId));

    if (tabId === "radar") {
      setTimeout(() => initOrUpdateRadarMap(), 150);
    }

    if (tabId === "rivers") {
      setTimeout(() => {
        if (state.riverMap) state.riverMap.invalidateSize();
        initOrUpdateRiverMap(state.lastRiverStations || []);
      }, 150);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* -----------------------------
     Geo cache + auto location
  ----------------------------- */
  const GEO_CACHE_KEY = "atmosphere.liveGeoCache.v5";
  const GEO_CACHE_MAX_MS = 20 * 60 * 1000;

  function loadGeoCache() {
    try {
      const raw = localStorage.getItem(GEO_CACHE_KEY);
      if (!raw) return null;

      const obj = JSON.parse(raw);

      if (
        !obj ||
        !Number.isFinite(obj.lat) ||
        !Number.isFinite(obj.lon) ||
        !obj.city ||
        !obj.countryCode ||
        !Number.isFinite(obj.ts) ||
        Date.now() - obj.ts > GEO_CACHE_MAX_MS ||
        (obj.source !== "gps" && obj.source !== "ip")
      ) {
        return null;
      }

      if (!PROFILES[obj.countryCode]) obj.countryCode = "GLOBAL";
      return obj;
    } catch {
      return null;
    }
  }

  function saveGeoCache(data) {
    try {
      if (
        !data ||
        !Number.isFinite(data.lat) ||
        !Number.isFinite(data.lon) ||
        !data.city ||
        !data.countryCode ||
        (data.source !== "gps" && data.source !== "ip")
      ) {
        return;
      }

      localStorage.setItem(
        GEO_CACHE_KEY,
        JSON.stringify({
          lat: data.lat,
          lon: data.lon,
          city: data.city,
          countryCode: data.countryCode,
          stateCode: data.stateCode || "GPS",
          source: data.source,
          ts: Date.now()
        })
      );
    } catch {}
  }

  function findNearestState(profile, lat, lon) {
    if (!profile || !Array.isArray(profile.states) || profile.states.length === 0) return null;

    let best = null;
    let bestDist = Infinity;

    profile.states.forEach((st) => {
      const d = calcDistanceKm(lat, lon, st.lat, st.lon);
      if (d < bestDist) {
        bestDist = d;
        best = st;
      }
    });

    return bestDist <= 150 ? best : null;
  }

  async function resolveLocationName(lat, lon) {
    const guessedCountry = guessCountryFromCoords(lat, lon);

    const geo = await fetchWithTimeout(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      3800
    );

    if (!geo) {
      return {
        city: "My Live Location",
        countryCode: guessedCountry
      };
    }

    const city = geo.locality || geo.city || geo.principalSubdivision || "My Live Location";
    const sub = geo.city && geo.locality && geo.city !== geo.locality
      ? `${geo.city}, ${geo.principalSubdivision || ""}`.replace(/,\s*$/, "")
      : geo.principalSubdivision || geo.countryName || "";
    const countryCode = geo.countryCode || guessedCountry;

    const displayName = sub && sub !== city ? `${city} (${sub})` : `${city} (${geo.countryName || countryCode})`;

    return {
      city: displayName,
      countryCode
    };
  }

  async function fetchIpLiveLocation() {
    // 1. Primary IP + Locality Geolocation via BigDataCloud (client IP mode when no lat/lon passed)
    const bdc = await fetchWithTimeout(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en",
      3800
    );
    if (bdc && Number.isFinite(Number(bdc.latitude)) && Number.isFinite(Number(bdc.longitude))) {
      const lat = Number(bdc.latitude);
      const lon = Number(bdc.longitude);
      const city = bdc.city || bdc.locality || bdc.principalSubdivision || "My Live Location";
      const sub = bdc.locality && bdc.city && bdc.locality !== bdc.city
        ? `${bdc.locality}, ${bdc.principalSubdivision || ""}`.replace(/,\s*$/, "")
        : bdc.principalSubdivision || bdc.countryName || "";
      const countryCode = bdc.countryCode || guessCountryFromCoords(lat, lon);
      return {
        lat,
        lon,
        city: sub && sub !== city ? `${city} (${sub})` : city,
        countryCode
      };
    }

    // 2. Secondary IP fallback via ipwho.is
    const ipw = await fetchWithTimeout("https://ipwho.is/", 3500);
    if (ipw && ipw.success !== false && Number.isFinite(Number(ipw.latitude)) && Number.isFinite(Number(ipw.longitude))) {
      const lat = Number(ipw.latitude);
      const lon = Number(ipw.longitude);
      const city = ipw.city || ipw.region || "My Live Location";
      const region = ipw.region || ipw.country || "";
      return {
        lat,
        lon,
        city: region && region !== city ? `${city} (${region})` : city,
        countryCode: ipw.country_code || guessCountryFromCoords(lat, lon)
      };
    }

    // 3. Tertiary IP fallback via GeoJS
    const gjs = await fetchWithTimeout("https://get.geojs.io/v1/ip/geo.json", 3500);
    if (gjs && Number.isFinite(Number(gjs.latitude)) && Number.isFinite(Number(gjs.longitude))) {
      const lat = Number(gjs.latitude);
      const lon = Number(gjs.longitude);
      const city = gjs.city || gjs.region || "My Live Location";
      const region = gjs.region || gjs.country || "";
      return {
        lat,
        lon,
        city: region && region !== city ? `${city} (${region})` : city,
        countryCode: gjs.country_code || guessCountryFromCoords(lat, lon)
      };
    }

    return null;
  }

  function setActiveCountryChip(countryCode) {
    qsa(".country-chip").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.country === countryCode);
    });
  }

  async function applyLiveLocationResult(lat, lon, city, rawCountryCode, sourceType) {
    const countryCode = PROFILES[rawCountryCode] ? rawCountryCode : guessCountryFromCoords(lat, lon);
    const validCountry = PROFILES[countryCode] ? countryCode : "GLOBAL";
    const profile = PROFILES[validCountry] || PROFILES.GLOBAL;
    const nearest = findNearestState(profile, lat, lon);
    const stateCode = nearest && calcDistanceKm(lat, lon, nearest.lat, nearest.lon) <= 25 ? nearest.code : "GPS";
    const finalCity = city || (nearest ? nearest.name : "My Live Location");

    saveGeoCache({
      lat,
      lon,
      city: finalCity,
      countryCode: validCountry,
      stateCode,
      source: sourceType
    });

    state.locationSource = sourceType;
    setActiveCountryChip(validCountry);
    state.stateCode = stateCode;

    await fetchAllData(lat, lon, finalCity, validCountry);
  }

  function requestBrowserGpsPosition(highAccuracy = true, timeoutMs = 6000) {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation unsupported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: highAccuracy,
        timeout: timeoutMs,
        maximumAge: 60000
      });
    });
  }

  async function autoDetectLocation(force = false) {
    updateStatusBadge("live", "↻ DETECTING LIVE LOCATION...");

    let gpsResolved = false;

    // Start fast IP-based live location in parallel so the user immediately sees their real area on site login
    const ipPromise = fetchIpLiveLocation().then(async (ipLoc) => {
      if (!ipLoc || gpsResolved) return false;
      // Only apply IP location if user hasn't manually clicked another place in the meantime
      if (state.locationSource === "gps") return true;
      await applyLiveLocationResult(ipLoc.lat, ipLoc.lon, ipLoc.city, ipLoc.countryCode, "ip");
      return true;
    }).catch(() => false);

    // Try precise browser GPS (high accuracy first, then low accuracy fallback)
    if ("geolocation" in navigator) {
      try {
        let pos;
        try {
          pos = await requestBrowserGpsPosition(true, 6000);
        } catch (err) {
          // If permission was explicitly denied (code 1), don't re-prompt; otherwise retry with low accuracy
          if (err && err.code === 1) throw err;
          pos = await requestBrowserGpsPosition(false, 7000);
        }

        if (pos && pos.coords) {
          gpsResolved = true;
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          updateStatusBadge("live", "↻ RESOLVING GPS LOCATION...");
          const resolved = await resolveLocationName(lat, lon);
          await applyLiveLocationResult(lat, lon, resolved.city, resolved.countryCode, "gps");
          return;
        }
      } catch (err) {
        // Browser GPS failed or denied — ensure IP live location finishes
        const ipApplied = await ipPromise;
        if (ipApplied) return;

        const cached = loadGeoCache();
        if (cached) {
          await applyLiveLocationResult(cached.lat, cached.lon, cached.city, cached.countryCode, cached.source || "ip");
          return;
        }

        updateStatusBadge("offline", "⚠ Live location unavailable — showing regional default");
        if (!state.lastFetchTime) {
          await fetchAllData(state.lat, state.lon, state.city, state.countryCode);
        }
        return;
      }
    }

    const ipApplied = await ipPromise;
    if (!ipApplied && !state.lastFetchTime) {
      await fetchAllData(state.lat, state.lon, state.city, state.countryCode);
    }
  }

  /* -----------------------------
     Multi-provider geocoding
  ----------------------------- */
  async function geocodeOpenMeteo(q) {
    const data = await fetchWithTimeout(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=10&language=en&format=json`,
      3500
    );

    return ((data && data.results) || []).map((r) => ({
      source: "open-meteo",
      name: r.name || "Place",
      subtitle: [r.admin1, r.country].filter(Boolean).join(", "),
      lat: r.latitude,
      lon: r.longitude,
      countryCode: r.country_code || "",
      type: "place"
    }));
  }

  async function geocodePhoton(q) {
    const biasLat = Number.isFinite(state.lat) ? state.lat : 6.6828;
    const biasLon = Number.isFinite(state.lon) ? state.lon : 80.3992;

    const data = await fetchWithTimeout(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=10&lang=en&lat=${biasLat}&lon=${biasLon}`,
      4000
    );

    return ((data && data.features) || []).map((f) => {
      const coords = f.geometry && f.geometry.coordinates ? f.geometry.coordinates : [0, 0];
      const p = f.properties || {};
      return {
        source: "photon",
        name: p.name || p.street || p.district || "Place",
        subtitle: [p.district, p.state, p.country].filter(Boolean).join(", "),
        lat: coords[1],
        lon: coords[0],
        countryCode: p.country_code || "",
        type: p.type || "osm"
      };
    });
  }

  async function geocodeNominatim(q) {
    const data = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=10&addressdetails=1&accept-language=en&q=${encodeURIComponent(q)}`,
      4200
    );

    return (data || []).map((r) => {
      const parts = String(r.display_name || "").split(",").map((s) => s.trim());
      return {
        source: "osm",
        name: r.name || parts[0] || "Place",
        subtitle: parts.slice(0, 3).join(", "),
        lat: Number(r.lat),
        lon: Number(r.lon),
        countryCode: r.country_code || "",
        type: r.addresstype || r.type || "place"
      };
    });
  }

  function addUniqueResult(map, r) {
    if (!r || !Number.isFinite(r.lat) || !Number.isFinite(r.lon)) return;
    const key = `${r.lat.toFixed(3)},${r.lon.toFixed(3)}`;
    if (!map.has(key)) map.set(key, r);
  }

  async function searchPlaces(q) {
    const query = String(q || "").trim();
    if (query.length < 2) return [];

    const first = await Promise.allSettled([geocodeOpenMeteo(query), geocodePhoton(query)]);
    const map = new Map();

    first.forEach((res) => {
      if (res.status === "fulfilled" && Array.isArray(res.value)) {
        res.value.forEach((r) => addUniqueResult(map, r));
      }
    });

    if (map.size < 3) {
      const enhanced = /,|sri\s*lanka|srilanka|ලංකාව/i.test(query) ? query : `${query}, Sri Lanka`;
      const second = await Promise.allSettled([geocodePhoton(enhanced), geocodeNominatim(enhanced)]);

      second.forEach((res) => {
        if (res.status === "fulfilled" && Array.isArray(res.value)) {
          res.value.forEach((r) => addUniqueResult(map, r));
        }
      });
    }

    const results = Array.from(map.values());

    results.forEach((r) => {
      r.distFromCurrent =
        Number.isFinite(state.lat) && Number.isFinite(state.lon)
          ? calcDistanceKm(state.lat, state.lon, r.lat, r.lon)
          : null;

      r.nearestGauge = nearestGaugeForCoords(r.lat, r.lon, r.countryCode);
    });

    results.sort((a, b) => (a.distFromCurrent ?? 99999) - (b.distFromCurrent ?? 99999));

    return results.slice(0, 10);
  }

  function renderSearchResults(results, loading = false) {
    const searchResults = byId("search-results");
    if (!searchResults) return;

    if (loading) {
      searchResults.innerHTML = `<div class="search-empty">Searching villages, towns, districts…</div>`;
      searchResults.classList.add("active");
      return;
    }

    if (!results.length) {
      searchResults.innerHTML = `<div class="search-empty">No exact match. Try: <strong>Delwala, Ratnapura</strong> or <strong>Kahawatta, Pelmadulla</strong>.</div>`;
      searchResults.classList.add("active");
      return;
    }

    searchResults.innerHTML = results
      .map((r) => {
        const gauge = r.nearestGauge
          ? `Nearest gauge: ${esc(r.nearestGauge.name)} • ${r.nearestGauge.km.toFixed(1)} km`
          : "No registered gauge nearby";

        const dist = r.distFromCurrent != null ? `${r.distFromCurrent.toFixed(0)} km` : "";

        return `
          <div
            class="search-item"
            data-lat="${r.lat}"
            data-lon="${r.lon}"
            data-name="${esc(r.name)}"
            data-subtitle="${esc(r.subtitle)}"
            data-country="${esc(String(r.countryCode || "").toUpperCase())}"
          >
            <div>
              <strong>${esc(r.name)}</strong>
              <div class="search-sub">${esc(r.subtitle || "Location")}</div>
              <div class="search-meta">
                <span class="place-type">${esc(r.type || r.source)}</span>
                <span>${gauge}</span>
              </div>
            </div>
            <span class="result-dist">${esc(dist)}</span>
          </div>
        `;
      })
      .join("");

    searchResults.classList.add("active");
  }

  function applySearchedPlace(lat, lon, name, subtitle, countryCode) {
    const cCode = PROFILES[String(countryCode || "").toUpperCase()] ? String(countryCode).toUpperCase() : guessCountryFromCoords(lat, lon);
    const profile = PROFILES[cCode] || PROFILES.GLOBAL;
    const nearest = findNearestState(profile, lat, lon);
    const stateCode = nearest ? nearest.code : "SEARCH";
    const displayName = subtitle && subtitle !== name ? `${name} (${subtitle})` : name;

    state.locationSource = "search";
    setActiveCountryChip(cCode);
    state.stateCode = stateCode;

    const searchResults = byId("search-results");
    const cityInput = byId("city-input");
    if (searchResults) searchResults.classList.remove("active");
    if (cityInput) cityInput.value = "";

    fetchAllData(lat, lon, displayName, cCode);
  }

  /* -----------------------------
     Event delegation
  ----------------------------- */
  document.addEventListener("click", (e) => {
    const searchItem = e.target.closest(".search-item");
    if (searchItem) {
      applySearchedPlace(
        Number(searchItem.dataset.lat),
        Number(searchItem.dataset.lon),
        searchItem.dataset.name || "Selected Location",
        searchItem.dataset.subtitle || "",
        searchItem.dataset.country || ""
      );
      return;
    }

    const tabBtn = e.target.closest(".view-tab-btn, .mob-nav-item");
    if (tabBtn) {
      const tabId = tabBtn.dataset.tab || tabBtn.dataset.mobTab;
      if (tabId) switchViewTab(tabId);
      return;
    }

    const countryBtn = e.target.closest(".country-chip");
    if (countryBtn) {
      qsa(".country-chip").forEach((t) => t.classList.remove("active"));
      countryBtn.classList.add("active");

      const cCode = countryBtn.dataset.country;
      state.countryCode = PROFILES[cCode] ? cCode : "GLOBAL";

      const firstState = PROFILES[state.countryCode] && PROFILES[state.countryCode].states
        ? PROFILES[state.countryCode].states[0]
        : null;

      if (firstState) {
        state.stateCode = firstState.code;
        state.locationSource = "manual";
        fetchAllData(firstState.lat, firstState.lon, firstState.name, state.countryCode);
      }
      return;
    }

    const stateBtn = e.target.closest(".state-pill");
    if (stateBtn) {
      qsa(".state-pill").forEach((p) => p.classList.remove("active"));
      stateBtn.classList.add("active");

      state.stateCode = stateBtn.dataset.stateCode;
      state.locationSource = "manual";
      fetchAllData(
        Number(stateBtn.dataset.lat),
        Number(stateBtn.dataset.lon),
        stateBtn.dataset.name,
        state.countryCode
      );
      return;
    }

    const basinBtn = e.target.closest("#basin-filters .filter-btn");
    if (basinBtn) {
      qsa("#basin-filters .filter-btn").forEach((b) => b.classList.remove("active"));
      basinBtn.classList.add("active");
      state.basinFilter = basinBtn.dataset.filter;
      scheduleRender();
      return;
    }

    const statusBtn = e.target.closest(".river-status-btn");
    if (statusBtn) {
      qsa(".river-status-btn").forEach((b) => b.classList.remove("active"));
      statusBtn.classList.add("active");
      state.riverStatusFilter = statusBtn.dataset.status;
      scheduleRender();
      return;
    }

    if (e.target.closest("#sun-timer-btn")) {
      toggleSunTimer();
      return;
    }

    if (e.target.closest('[data-action="open-rivers"]')) {
      switchViewTab("rivers");
      return;
    }

    if (e.target.closest('[data-action="open-radar"]')) {
      switchViewTab("radar");
      return;
    }

    if (e.target.closest("#audio-btn")) {
      SoundEngine.toggle();
      return;
    }

    if (e.target.closest("#refresh-btn")) {
      fetchAllData(state.lat, state.lon, state.city, state.countryCode);
      return;
    }

    if (e.target.closest("#unit-btn")) {
      state.unit = state.unit === "C" ? "F" : "C";
      const label = byId("unit-label");
      if (label) label.textContent = `°${state.unit}`;
      scheduleRender();
      return;
    }

    if (e.target.closest("#loc-btn")) {
      autoDetectLocation(true);
      return;
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target && e.target.id === "river-source-filter") {
      state.riverSourceFilter = e.target.value;
      scheduleRender();
      return;
    }

    if (e.target && e.target.id === "sim-mode") {
      state.simMode = e.target.value;
      scheduleRender();
    }
  });

  /* -----------------------------
     Search input
  ----------------------------- */
  const cityInput = byId("city-input");
  const searchResults = byId("search-results");
  let searchTimeout = null;

  if (cityInput && searchResults) {
    cityInput.addEventListener("input", (e) => {
      const q = e.target.value.trim();
      clearTimeout(searchTimeout);

      if (q.length < 2) {
        searchResults.classList.remove("active");
        return;
      }

      renderSearchResults([], true);

      searchTimeout = setTimeout(async () => {
        const results = await searchPlaces(q);
        renderSearchResults(results, false);
      }, 240);
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper") && searchResults) {
      searchResults.classList.remove("active");
    }
  });

  /* -----------------------------
     Visibility / battery optimization
  ----------------------------- */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      FX.stop();
      if (SoundEngine.isPlaying && SoundEngine.ctx) SoundEngine.ctx.suspend();
    } else {
      FX.start();
      if (SoundEngine.isPlaying && SoundEngine.ctx) SoundEngine.ctx.resume();

      if (Date.now() - state.lastFetchTime > 5 * 60 * 1000) {
        fetchAllData(state.lat, state.lon, state.city, state.countryCode);
      }
    }
  });

  /* -----------------------------
     Boot
  ----------------------------- */
  function startupTelemetry() {
    ensureRiverRegistry();
    FX.init();
    FX.start();

    const cached = loadGeoCache();

    if (cached) {
      setActiveCountryChip(cached.countryCode);
      state.stateCode = cached.stateCode || "GPS";
      state.locationSource = cached.source || "gps";
      fetchAllData(cached.lat, cached.lon, cached.city, cached.countryCode);
    } else {
      state.city = "Detecting Live Location…";
      state.stateCode = "GPS";
      state.locationSource = "ip";
      renderRegionNavigation();
      showLoader(false);
    }

    // Always auto-detect live location (GPS + instant IP fallback) when logging into the site
    autoDetectLocation(true);

    // Real-time 60-second background river water level & flood status sync
    setInterval(async () => {
      if (!document.hidden && state.countryCode === "LK") {
        await syncRealSriLankaRiverGauges();
        scheduleRender();
      }
    }, 60 * 1000);

    setInterval(() => {
      if (!document.hidden) {
        fetchAllData(state.lat, state.lon, state.city, state.countryCode);
      }
    }, 10 * 60 * 1000);
  }

  window.AtmosphereApp = {
    state,
    FX,
    SoundEngine,
    switchViewTab,
    fetchAllData,
    syncRealSriLankaRiverGauges,
    renderEverything,
    autoDetectLocation,
    searchPlaces
  };

  startupTelemetry();
})();
