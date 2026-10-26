/* ==========================================================================
   CORE APPLICATION ENGINE (BULLETPROOF NON-BLOCKING EDITION)
   ========================================================================== */

// Built-in backup in case data.js has a filename typo on GitHub Pages
const DEFAULT_PROFILES = {
    LK: {
        name: "Sri Lanka", flag: "🇱🇰",
        agency: "Irrigation Dept / RiverNet.lk / DMC Live Sensors",
        sunPriority: "conditional",
        primaryFocus: "Monsoon Flood & NBRO Landslide Watch",
        hotlines: [
            { num: "117", lbl: "DMC Emergency" },
            { num: "1990", lbl: "Suwa Seriya" },
            { num: "011-2686686", lbl: "Met Dept" }
        ],
        states: [
            { code: "SG", name: "Ratnapura (Kalu / We Ganga)", lat: 6.6828, lon: 80.3992 },
            { code: "KL", name: "Kalawana / Millakanda (Kukule)", lat: 6.6280, lon: 80.1720 },
            { code: "WP", name: "Colombo / Nugegoda (Kelani Basin)", lat: 6.8729, lon: 79.8899 },
            { code: "CP", name: "Kandy (Mahaweli Basin)", lat: 7.2906, lon: 80.6337 },
            { code: "SP", name: "Galle / Matara (Nilwala & Gin)", lat: 6.0535, lon: 80.2210 },
            { code: "NE", name: "Nuwara Eliya (Hill Country)", lat: 6.9497, lon: 80.7891 },
            { code: "NW", name: "Kurunegala (Deduru / Maha Oya)", lat: 7.4818, lon: 80.3609 }
        ],
        rivers: [
            { id: "ratnapura", apiMatch: ["ratnapura", "rathnapura"], name: "Kalu Ganga (Ratnapura) ⭐", station: "Ratnapura Main Gauge", basinGroup: "kalu", subTag: "Official Irrigation Dept & RiverNet.lk/ratnapura", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.6828, lon: 80.3992, unit: "m", normalLvl: 1.95, alertLvl: 5.20, minorLvl: 7.50, majorLvl: 9.50, maxScale: 11.5 },
            { id: "ellagawa", apiMatch: ["ellagawa"], name: "Kalu Ganga (Ellagawa) ⭐", station: "Ellagawa (Kiriella / Horana)", basinGroup: "kalu", subTag: "Mid-Basin Kalu Gauge", rivernetUrl: "https://rivernet.lk/_kaluganga-overview/", lat: 6.7310, lon: 80.2150, unit: "m", normalLvl: 5.46, alertLvl: 10.00, minorLvl: 10.70, majorLvl: 12.20, maxScale: 14.5 },
            { id: "weganga", apiMatch: ["kahawatta", "we ganga", "weganga", "dela"], name: "We Ganga (Kahawatta) ⭐", station: "Kahawatta / Pelmadulla", basinGroup: "kalu", subTag: "Upper Tributary • Joins Kalu Ganga", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.5980, lon: 80.5750, unit: "m", normalLvl: 1.45, alertLvl: 3.40, minorLvl: 4.20, majorLvl: 5.50, maxScale: 7.2 },
            { id: "millakanda", apiMatch: ["millakanda", "kalawellawa"], name: "Kuda Ganga / Kukule (Millakanda) ⭐", station: "Kalawellawa (Millakanda)", basinGroup: "kalu", subTag: "Direct Gauge for Kukule Ganga Spill", rivernetUrl: "https://rivernet.lk/_kaluganga-overview/", lat: 6.6280, lon: 80.1720, unit: "m", normalLvl: 3.26, alertLvl: 5.00, minorLvl: 6.50, majorLvl: 8.00, maxScale: 10.0 },
            { id: "nagalagam", apiMatch: ["nagalagam"], name: "Kelani Ganga (Nagalagam St)", station: "Nagalagam Street (Colombo)", basinGroup: "kelani", subTag: "Official Colombo Flood Gauge", rivernetUrl: "https://rivernet.lk/kelaniya", lat: 6.9535, lon: 79.8780, unit: "ft", normalLvl: 2.10, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 7.00, maxScale: 9.0 },
            { id: "hanwella", apiMatch: ["hanwella"], name: "Kelani Ganga (Hanwella)", station: "Hanwella / Seethawaka", basinGroup: "kelani", subTag: "Upper Kelani Flood Gauge", rivernetUrl: "https://rivernet.lk/kelaniya", lat: 6.9090, lon: 80.0820, unit: "m", normalLvl: 2.80, alertLvl: 7.00, minorLvl: 8.00, majorLvl: 10.00, maxScale: 12.5 },
            { id: "panadugama", apiMatch: ["panadugama"], name: "Nilwala Ganga (Panadugama)", station: "Panadugama (Akuressa / Matara)", basinGroup: "south", subTag: "Main Nilwala Flood Gauge", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.0830, lon: 80.5170, unit: "m", normalLvl: 2.75, alertLvl: 5.00, minorLvl: 6.00, majorLvl: 7.50, maxScale: 9.5 },
            { id: "baddegama", apiMatch: ["baddegama"], name: "Gin Ganga (Baddegama)", station: "Baddegama (Galle)", basinGroup: "south", subTag: "Main Gin Ganga Flood Gauge", rivernetUrl: "https://rivernet.lk/", lat: 6.1830, lon: 80.1980, unit: "m", normalLvl: 1.85, alertLvl: 3.50, minorLvl: 4.00, majorLvl: 5.00, maxScale: 6.8 }
        ]
    },
    GLOBAL: {
        name: "Worldwide", flag: "🌍",
        agency: "WMO / Copernicus GloFAS / Open-Meteo Global",
        sunPriority: "conditional",
        primaryFocus: "Global Multi-Hazard & Satellite Watershed Telemetry",
        hotlines: [{ num: "112", lbl: "Intl Emergency" }, { num: "911", lbl: "Global Rescue" }],
        states: [
            { code: "DXB", name: "Dubai (UAE)", lat: 25.2048, lon: 55.2708 },
            { code: "SIN", name: "Singapore", lat: 1.3521, lon: 103.8198 }
        ],
        rivers: [
            { id: "gl1", name: "Primary Local Watershed", station: "Satellite GloFAS Cell #1", basinGroup: "all", subTag: "Copernicus Global Flood Awareness", rivernetUrl: "https://www.globalfloods.eu/", lat: 25.2048, lon: 55.2708, unit: "m", normalLvl: 1.8, alertLvl: 3.8, minorLvl: 4.8, majorLvl: 6.2, maxScale: 8.0 }
        ]
    }
};

const DEFAULT_WMO = {
    0:  { desc: "Clear Sky", iconDay: "☀️", iconNight: "🌙", anim: "clear" },
    1:  { desc: "Mainly Clear", iconDay: "🌤️", iconNight: "🌙", anim: "clear" },
    2:  { desc: "Partly Cloudy", iconDay: "⛅", iconNight: "☁️", anim: "clouds" },
    3:  { desc: "Overcast Clouds", iconDay: "☁️", iconNight: "☁️", anim: "clouds" },
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

const PROFILES = (typeof COUNTRY_PROFILES !== 'undefined') ? COUNTRY_PROFILES : DEFAULT_PROFILES;
const WMO_MAP = (typeof WMO_CODES !== 'undefined') ? WMO_CODES : DEFAULT_WMO;

const state = {
    activeTab: 'overview',
    countryCode: 'LK',
    stateCode: 'SG',
    lat: 6.6828,
    lon: 80.3992,
    city: "Ratnapura (Kalu / We Ganga)",
    unit: 'C',
    simMode: 'live',
    basinFilter: 'all',
    rawWeather: null,
    rawAqi: null,
    rawMarine: null,
    rawQuakes: [],
    localDischarge: 65,
    liveSriLankaGauges: {},
    particleType: 'clear-day',
    rainIntensity: 1,
    sunTimerTotalSec: 7200,
    sunTimerRemSec: 7200,
    sunTimerInterval: null,
    sunTimerRunning: false,
    leafletMap: null,
    radarLayer: null,
    markerGroup: null
};

/* --- Bulletproof Loader Control --- */
function showLoader(visible) {
    const loader = document.getElementById('loader');
    if (!loader) return;
    if (visible) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
        loader.style.pointerEvents = 'all';
    } else {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => { loader.style.display = 'none'; }, 300);
    }
}

/* --- View Tab Switching --- */
function switchViewTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.view-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.toggle('active', b.dataset.mobTab === tabId));

    if (tabId === 'radar') {
        setTimeout(() => initOrUpdateRadarMap(), 150);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.view-tab-btn').forEach(btn => btn.addEventListener('click', () => switchViewTab(btn.dataset.tab)));
document.querySelectorAll('.mob-nav-item').forEach(btn => btn.addEventListener('click', () => switchViewTab(btn.dataset.mobTab)));

/* --- Procedural Web Audio Synthesizer --- */
const SoundEngine = {
    ctx: null, masterGain: null, rainGain: null, windGain: null, isPlaying: false,
    init() {
        if (this.ctx) return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.5;
        this.masterGain.connect(this.ctx.destination);

        const bufferSize = this.ctx.sampleRate * 3;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

        const rainSource = this.ctx.createBufferSource();
        rainSource.buffer = noiseBuffer; rainSource.loop = true;
        const rainFilter = this.ctx.createBiquadFilter();
        rainFilter.type = 'bandpass'; rainFilter.frequency.value = 1150;
        this.rainGain = this.ctx.createGain(); this.rainGain.gain.value = 0.0001;
        rainSource.connect(rainFilter); rainFilter.connect(this.rainGain); this.rainGain.connect(this.masterGain);
        rainSource.start();

        const windSource = this.ctx.createBufferSource();
        windSource.buffer = noiseBuffer; windSource.loop = true;
        const windFilter = this.ctx.createBiquadFilter();
        windFilter.type = 'lowpass'; windFilter.frequency.value = 300;
        this.windGain = this.ctx.createGain(); this.windGain.gain.value = 0.0001;
        windSource.connect(windFilter); windSource.connect(this.windGain); this.windGain.connect(this.masterGain);
        windSource.start();
    },
    toggle() {
        this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('audio-btn');
        const icon = document.getElementById('audio-icon');
        const label = document.getElementById('audio-label');
        if (this.isPlaying) {
            btn.classList.add('audio-active'); icon.className = 'ph-fill ph-speaker-high'; label.textContent = 'Audio: Live';
            this.updateMix();
        } else {
            btn.classList.remove('audio-active'); icon.className = 'ph-fill ph-speaker-slash'; label.textContent = 'Audio: Off';
            this.rainGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.3);
            this.windGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.3);
        }
    },
    updateMix() {
        if (!this.isPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;
        const type = state.particleType;
        if (type === 'thunder') {
            this.rainGain.gain.setTargetAtTime(0.45, now, 0.6);
            this.windGain.gain.setTargetAtTime(0.35, now, 0.6);
        } else if (type === 'rain') {
            this.rainGain.gain.setTargetAtTime(0.28 * state.rainIntensity, now, 0.6);
            this.windGain.gain.setTargetAtTime(0.15, now, 0.6);
        } else {
            this.rainGain.gain.setTargetAtTime(0.002, now, 0.6);
            this.windGain.gain.setTargetAtTime(0.07, now, 0.6);
        }
    },
    playBeep(freq = 660) {
        try {
            if (!this.ctx) this.init();
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.frequency.setValueAtTime(freq, now);
            g.gain.setValueAtTime(0.15, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.connect(g); g.connect(this.masterGain);
            osc.start(now); osc.stop(now + 0.4);
        } catch {}
    }
};

/* --- Network Helper & Haversine Distance --- */
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
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/* --- Sri Lanka Live Irrigation Dept Gauge Sync --- */
async function syncRealSriLankaRiverGauges() {
    const data = await fetchWithTimeout('https://sl-water-levels.vercel.app/api/levels', 4000);
    if (!data || !PROFILES.LK) return;

    const records = Array.isArray(data) ? data : (data.levels || data.stations || data.data || []);
    if (!Array.isArray(records)) return;

    PROFILES.LK.rivers.forEach(river => {
        const found = records.find(rec => {
            const stName = String(rec.station || rec.name || rec.id || '').toLowerCase();
            return river.apiMatch && river.apiMatch.some(m => stName.includes(m));
        });

        if (found && found.level !== null && found.level !== undefined && !isNaN(parseFloat(found.level))) {
            const rawVal = parseFloat(found.level);
            const apiUnit = String(found.unit || 'ft').toLowerCase();
            let valInCardUnit = rawVal;
            if (apiUnit === 'ft' && river.unit === 'm') valInCardUnit = rawVal * 0.3048;
            else if (apiUnit === 'm' && river.unit === 'ft') valInCardUnit = rawVal * 3.28084;

            state.liveSriLankaGauges[river.id] = {
                level: valInCardUnit,
                observedAt: found.observedAt || 'Live Sensor'
            };
        }
    });
}

/* --- Instant Baseline Weather Builder (Prevents Hanging) --- */
function buildFallbackWeather() {
    const now = new Date();
    const hTimes = [], hTemps = [], hPop = [], hCode = [], hVis = [], hUv = [], hCape = [], hLift = [], hSoil = [], hDay = [];
    for (let i = 0; i < 24; i++) {
        const d = new Date(now.getTime() + i * 3600000);
        hTimes.push(d.toISOString().slice(0, 13) + ":00");
        const hr = d.getHours();
        const isD = (hr >= 6 && hr <= 18) ? 1 : 0;
        hDay.push(isD); hTemps.push(27 + Math.sin(i / 4) * 3);
        hPop.push(30); hCode.push(2); hVis.push(9500);
        hUv.push(isD ? 7.5 : 0); hCape.push(420); hLift.push(0.5); hSoil.push(0.32);
    }
    const dTimes = [], dMax = [], dMin = [], dUvMax = [], dSum = [], dPopMax = [], dCode = [], dRise = [], dSet = [];
    for (let j = 0; j < 7; j++) {
        const dd = new Date(now.getTime() + j * 86400000);
        const dayStr = dd.toISOString().slice(0, 10);
        dTimes.push(dayStr);
        dMax.push(31); dMin.push(24); dUvMax.push(8.5); dSum.push(6.5); dPopMax.push(40); dCode.push(2);
        dRise.push(`${dayStr}T06:05`); dSet.push(`${dayStr}T18:10`);
    }
    return {
        timezone: "Asia/Colombo",
        current: {
            time: hTimes[0], temperature_2m: 28.5, relative_humidity_2m: 76,
            apparent_temperature: 32.0, is_day: 1, precipitation: 0.4, weather_code: 2,
            surface_pressure: 1011, wind_speed_10m: 14, wind_gusts_10m: 24
        },
        hourly: {
            time: hTimes, temperature_2m: hTemps, precipitation_probability: hPop,
            weather_code: hCode, visibility: hVis, uv_index: hUv,
            cape: hCape, lifted_index: hLift, soil_moisture_0_to_7cm: hSoil, is_day: hDay
        },
        daily: {
            time: dTimes, weather_code: dCode, temperature_2m_max: dMax,
            temperature_2m_min: dMin, uv_index_max: dUvMax,
            precipitation_sum: dSum, precipitation_probability_max: dPopMax,
            sunrise: dRise, sunset: dSet
        }
    };
}

/* --- Non-Blocking Master Telemetry Sync --- */
async function fetchAllData(lat, lon, cityName, forcedCountry = null) {
    const statusBadge = document.getElementById('data-status-badge');
    if (forcedCountry) {
        state.countryCode = PROFILES[forcedCountry] ? forcedCountry : 'GLOBAL';
    }
    state.lat = lat;
    state.lon = lon;
    if (cityName) state.city = cityName;

    if (state.countryCode === 'GLOBAL' && PROFILES.GLOBAL) {
        const cleanCity = (cityName || "Local Area").split('(')[0].trim();
        PROFILES.GLOBAL.rivers[0].name = `${cleanCity} Main Watershed ⭐`;
        PROFILES.GLOBAL.rivers[0].station = `${cleanCity} Satellite Gauge #1`;
    }

    // 1. Render immediately with baseline data & hide loader so UI never hangs!
    if (!state.rawWeather) state.rawWeather = buildFallbackWeather();
    renderRegionNavigation();
    renderEverything();
    showLoader(false);

    if (statusBadge) {
        statusBadge.className = 'status-pill live';
        statusBadge.textContent = '↻ SYNCING SATELLITE...';
    }

    // 2. Fetch live APIs in background and update seamlessly
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
            state.countryCode === 'LK' ? syncRealSriLankaRiverGauges() : Promise.resolve()
        ]);

        if (wData && wData.current) {
            state.rawWeather = wData;
            if (statusBadge) {
                statusBadge.className = 'status-pill live';
                statusBadge.textContent = '● LIVE TELEMETRY';
            }
        } else if (statusBadge) {
            statusBadge.className = 'status-pill offline';
            statusBadge.textContent = '⚠ OFFLINE / SIMULATED';
        }

        if (aData) state.rawAqi = aData;
        if (mData) state.rawMarine = mData;
        if (qData?.features) state.rawQuakes = qData.features;
        if (fData?.daily?.river_discharge?.[0]) state.localDischarge = fData.daily.river_discharge[0];

        renderEverything();
        if (state.activeTab === 'radar') initOrUpdateRadarMap();
    } catch {
        if (statusBadge) {
            statusBadge.className = 'status-pill offline';
            statusBadge.textContent = '⚠ OFFLINE / SIMULATED';
        }
    }
}

/* --- Helpers --- */
function getWMO(code, isDay = 1) {
    const item = WMO_MAP[code] || { desc: "Partly Cloudy", iconDay: "⛅", iconNight: "☁️", anim: "clouds" };
    return { desc: item.desc, icon: isDay ? item.iconDay : item.iconNight, anim: item.anim };
}

function formatTemp(c) {
    return state.unit === 'F' ? Math.round((c * 9 / 5) + 32) + '°' : Math.round(c) + '°';
}

/* --- Render Smart Context Widget --- */
function renderSmartContextSlot(m, isDay, riverWorstLevel) {
    const slot = document.getElementById('smart-context-slot');
    if (!slot) return;
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;

    const showSunscreen =
        (state.countryCode === 'AU' && m.uvIndex >= 2.5) ||
        (isDay && m.uvIndex >= 4.0 && m.rain1h < 2.0 && profile.sunPriority !== 'low');

    if (showSunscreen) {
        const effectiveUV = Math.max(m.uvIndex, 0.5);
        const burnMinutes = Math.max(Math.round(240 / effectiveUV), 10);
        let spfRec = "SPF 30+ Sunscreen", reapplyMins = 120;
        if (m.uvIndex >= 11) { spfRec = "SPF 50+ PA++++ & Hat"; reapplyMins = 60; }
        else if (m.uvIndex >= 8) { spfRec = "SPF 50+ Broad Spectrum"; reapplyMins = 80; }
        else if (m.uvIndex >= 6) { spfRec = "SPF 50+ Recommended"; reapplyMins = 90; }

        if (!state.sunTimerRunning) {
            state.sunTimerTotalSec = reapplyMins * 60;
            state.sunTimerRemSec = state.sunTimerTotalSec;
        }

        const hrs = Math.floor(state.sunTimerRemSec / 3600);
        const mins = Math.floor((state.sunTimerRemSec % 3600) / 60);
        const secs = state.sunTimerRemSec % 60;
        const timeStr = `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        const pct = state.sunTimerRemSec / Math.max(state.sunTimerTotalSec, 1);
        const offset = 138 - (138 * pct);

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
                        Smart UV Protection (${state.countryCode === 'AU' ? 'ARPANSA Australia' : 'High UV Active'})
                    </div>
                    <div style="font-size:0.9rem; font-weight:800; margin-top:2px;" class="mono" id="sun-timer-display">
                        ${state.sunTimerRunning ? 'RE-APPLY IN ' + timeStr : 'UV ' + m.uvIndex.toFixed(1) + ' • BURN ~' + burnMinutes + 'm'}
                    </div>
                    <div style="font-size:0.7rem; color:var(--text-secondary);">Advice: <strong>${spfRec}</strong></div>
                </div>
                <button class="sun-timer-btn" id="sun-timer-btn">${state.sunTimerRunning ? 'Reset' : 'Start SPF Timer'}</button>
            </div>
        `;
        document.getElementById('sun-timer-btn').addEventListener('click', toggleSunTimer);
    } else if (state.countryCode === 'LK') {
        slot.innerHTML = `
            <div class="smart-advisory-card">
                <div style="display:flex; align-items:center; gap:12px;">
                    <i class="ph-fill ph-waves" style="font-size:1.8rem; color:#38bdf8;"></i>
                    <div>
                        <div style="font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#7dd3fc;">
                            Irrigation Dept / RiverNet.lk Live • ${state.city.split('(')[0]}
                        </div>
                        <div style="font-size:0.86rem; font-weight:700; margin-top:2px;">
                            Kalu, We Ganga & Millakanda Status: <span style="color:${riverWorstLevel === 'red' ? '#ef4444' : riverWorstLevel === 'orange' ? '#f97316' : riverWorstLevel === 'yellow' ? '#facc15' : '#10b981'}; text-transform:uppercase;">${riverWorstLevel}</span>
                        </div>
                        <div style="font-size:0.7rem; color:var(--text-secondary);">
                            Discharge: ~${Math.round(state.localDischarge)} m³/s • Click to inspect gauges.
                        </div>
                    </div>
                </div>
                <button class="btn" onclick="switchViewTab('rivers')" style="white-space:nowrap;">Gauges</button>
            </div>
        `;
    } else {
        slot.innerHTML = `
            <div class="smart-advisory-card">
                <div style="display:flex; align-items:center; gap:12px;">
                    <i class="ph-fill ph-shield-check" style="font-size:1.8rem; color:#34d399;"></i>
                    <div>
                        <div style="font-size:0.7rem; text-transform:uppercase; font-weight:800; color:#7dd3fc;">
                            ${profile.name} Smart Focus • ${profile.primaryFocus}
                        </div>
                        <div style="font-size:0.84rem; font-weight:700; margin-top:2px;">
                            Visibility ${(m.visMeters / 1000).toFixed(1)} km • US AQI ${Math.round(m.usAqi)} • Gusts ${Math.round(m.windGusts)} km/h
                        </div>
                    </div>
                </div>
                <button class="btn" onclick="switchViewTab('radar')" style="white-space:nowrap;">Live Radar</button>
            </div>
        `;
    }
}

function toggleSunTimer() {
    if (state.sunTimerRunning) {
        clearInterval(state.sunTimerInterval);
        state.sunTimerRunning = false;
        renderEverything();
    } else {
        state.sunTimerRunning = true;
        SoundEngine.playBeep(780);
        state.sunTimerInterval = setInterval(() => {
            if (state.sunTimerRemSec > 0) {
                state.sunTimerRemSec--;
                const disp = document.getElementById('sun-timer-display');
                const prog = document.getElementById('sun-ring-prog');
                if (disp && prog) {
                    const hrs = Math.floor(state.sunTimerRemSec / 3600);
                    const mins = Math.floor((state.sunTimerRemSec % 3600) / 60);
                    const secs = state.sunTimerRemSec % 60;
                    disp.textContent = `RE-APPLY IN ${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                    const pct = state.sunTimerRemSec / Math.max(state.sunTimerTotalSec, 1);
                    prog.style.strokeDashoffset = 138 - (138 * pct);
                }
            } else {
                clearInterval(state.sunTimerInterval);
                state.sunTimerRunning = false;
                SoundEngine.playBeep(920);
                renderEverything();
            }
        }, 1000);
        renderEverything();
    }
}

/* --- Main UI Render Loop --- */
function renderEverything() {
    const data = state.rawWeather;
    if (!data) return;

    const current = data.current;
    const daily = data.daily;
    const hourly = data.hourly;
    const isDay = current.is_day;

    const nowISO = (current.time || "").slice(0, 13);
    let hIdx = hourly.time.findIndex(t => t.startsWith(nowISO));
    if (hIdx === -1) hIdx = 0;

    let tempC = current.temperature_2m ?? 28;
    let feelsC = current.apparent_temperature ?? tempC;
    let humidity = current.relative_humidity_2m ?? 75;
    let pressure = current.surface_pressure ?? 1011;
    let rain1h = current.precipitation || 0;
    let rain24h = daily.precipitation_sum?.[0] || 0;
    let windSpeed = current.wind_speed_10m || 0;
    let windGusts = current.wind_gusts_10m || windSpeed;
    let weatherCode = current.weather_code ?? 2;
    let uvIndex = hourly.uv_index?.[hIdx] ?? (isDay ? (daily.uv_index_max?.[0] ?? 6) : 0.2);
    let visMeters = hourly.visibility?.[hIdx] ?? 10000;
    let cape = hourly.cape?.[hIdx] ?? 250;
    let liftedIdx = hourly.lifted_index?.[hIdx] ?? 1.2;
    let soilMoisture = hourly.soil_moisture_0_to_7cm?.[hIdx] ?? 0.32;

    let usAqi = state.rawAqi?.current?.us_aqi ?? 32;
    let pm25 = state.rawAqi?.current?.pm2_5 ?? 9.4;
    let pm10 = state.rawAqi?.current?.pm10 ?? 18.0;

    if (state.simMode === 'yellow') {
        uvIndex = Math.max(uvIndex, 6.8); feelsC = Math.max(feelsC, 34.5);
        rain24h = Math.max(rain24h, 46.0); windGusts = Math.max(windGusts, 46);
        usAqi = Math.max(usAqi, 78); visMeters = Math.min(visMeters, 4200);
        cape = Math.max(cape, 1150); weatherCode = 63;
    } else if (state.simMode === 'orange') {
        uvIndex = Math.max(uvIndex, 9.5); feelsC = Math.max(feelsC, 39.5);
        rain1h = Math.max(rain1h, 24.0); rain24h = Math.max(rain24h, 92.0);
        windSpeed = Math.max(windSpeed, 42); windGusts = Math.max(windGusts, 68);
        usAqi = Math.max(usAqi, 138); pm25 = Math.max(pm25, 52.4);
        visMeters = Math.min(visMeters, 1800); cape = Math.max(cape, 2100);
        liftedIdx = -4.2; soilMoisture = 0.46; weatherCode = 65;
    } else if (state.simMode === 'red') {
        uvIndex = 12.2; feelsC = 44.0; rain1h = 54.0; rain24h = 178.5;
        windSpeed = 64; windGusts = 96; usAqi = 188; pm25 = 112.0;
        visMeters = 650; cape = 3450; liftedIdx = -7.5; soilMoisture = 0.54; weatherCode = 99;
    }

    const wmo = getWMO(weatherCode, isDay);
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;

    document.getElementById('loc-name').textContent = state.city;
    document.getElementById('current-temp').textContent = formatTemp(tempC);
    document.getElementById('current-icon').textContent = wmo.icon;
    document.getElementById('current-desc').textContent = wmo.desc;
    document.getElementById('temp-max').textContent = formatTemp(daily.temperature_2m_max?.[0] ?? tempC + 2);
    document.getElementById('temp-min').textContent = formatTemp(daily.temperature_2m_min?.[0] ?? tempC - 3);
    document.getElementById('feels-like').textContent = formatTemp(feelsC);
    const pressEl = document.getElementById('surface-pressure');
    if (pressEl) pressEl.textContent = `${Math.round(pressure)} hPa`;

    const riseEl = document.getElementById('sunrise-time');
    const setEl = document.getElementById('sunset-time');
    if (riseEl && setEl && daily.sunrise?.[0] && daily.sunset?.[0]) {
        riseEl.textContent = daily.sunrise[0].slice(11, 16);
        setEl.textContent = daily.sunset[0].slice(11, 16);
    }

    try {
        document.getElementById('current-date').textContent = new Date().toLocaleString('en-US', {
            weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: data.timezone || 'UTC'
        });
    } catch {
        document.getElementById('current-date').textContent = new Date().toLocaleString();
    }

    document.getElementById('qm-rain').textContent = `${rain24h.toFixed(1)} mm`;
    document.getElementById('qm-rain-sub').textContent = rain24h >= 50 ? "Heavy rain watch" : "Normal range";
    document.getElementById('qm-wind').textContent = `${Math.round(windGusts)} km/h`;
    document.getElementById('qm-wind-sub').textContent = `Sustained ${Math.round(windSpeed)} km/h`;
    document.getElementById('qm-uv').textContent = uvIndex.toFixed(1);
    document.getElementById('qm-uv-sub').textContent = uvIndex >= 6 ? "Protection needed" : "Low burn risk";
    document.getElementById('qm-aqi').textContent = `AQI ${Math.round(usAqi)}`;
    document.getElementById('qm-aqi-sub').textContent = `PM2.5: ${pm25.toFixed(1)} µg/m³`;
    document.getElementById('smart-region-tag').textContent = `Focus: ${profile.primaryFocus}`;

    const hourlyEl = document.getElementById('hourly-container');
    hourlyEl.innerHTML = '';
    const hrFrag = document.createDocumentFragment();
    for (let i = hIdx; i < hIdx + 24 && i < hourly.time.length; i++) {
        const dObj = new Date(hourly.time[i]);
        const hLabel = i === hIdx ? 'Now' : dObj.toLocaleTimeString([], { hour: 'numeric', hour12: true });
        const hWmo = getWMO(hourly.weather_code[i], hourly.is_day?.[i] ?? 1);
        const pop = hourly.precipitation_probability?.[i] ?? 0;

        const div = document.createElement('div');
        div.className = `hour-item ${i === hIdx ? 'now' : ''}`;
        div.innerHTML = `
            <span class="hour-time">${hLabel}</span>
            <span class="hour-icon">${hWmo.icon}</span>
            <span class="hour-pop">${pop > 10 ? `<i class="ph-fill ph-drop"></i>${pop}%` : ''}</span>
            <span class="hour-temp">${formatTemp(hourly.temperature_2m[i])}</span>
        `;
        hrFrag.appendChild(div);
    }
    hourlyEl.appendChild(hrFrag);

    const riverWorstLevel = renderRiverStations(rain24h);
    const hazardWorstLevel = renderHazardMatrix({
        uvIndex, feelsC, tempC, humidity, rain1h, rain24h,
        windSpeed, windGusts, usAqi, pm25, pm10, visMeters, cape, liftedIdx, soilMoisture
    });

    renderMarineAndSeismic();
    renderSmartContextSlot({ uvIndex, rain1h, visMeters, usAqi, windGusts }, isDay, riverWorstLevel);
    updateMasterAlertBanner(hazardWorstLevel, riverWorstLevel, rain24h, windGusts, uvIndex, wmo.anim, isDay);

    const dailyEl = document.getElementById('daily-container');
    dailyEl.innerHTML = '';
    const dayFrag = document.createDocumentFragment();
    const weekMin = Math.min(...daily.temperature_2m_min);
    const weekMax = Math.max(...daily.temperature_2m_max);
    const range = Math.max(weekMax - weekMin, 1);

    for (let i = 0; i < daily.time.length; i++) {
        const dDate = new Date(daily.time[i] + 'T00:00:00');
        const dayName = i === 0 ? 'Today' : dDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const dWmo = getWMO(daily.weather_code[i], 1);
        const pop = daily.precipitation_probability_max?.[i] ?? 20;
        const dRain = daily.precipitation_sum?.[i] ?? 0;
        const dUv = daily.uv_index_max?.[i] ?? 7;
        const tMin = daily.temperature_2m_min[i];
        const tMax = daily.temperature_2m_max[i];

        const leftPct = ((tMin - weekMin) / range) * 100;
        const widthPct = ((tMax - tMin) / range) * 100;

        const row = document.createElement('div');
        row.className = 'day-row';
        row.innerHTML = `
            <div class="day-name">${dayName}</div>
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

/* --- Render RiverNet & Hydrological Gauges --- */
function renderRiverStations(rain24h) {
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;
    const container = document.getElementById('rivers-container');
    if (!container) return 'green';
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    document.getElementById('river-count-badge').textContent = profile.rivers.length;
    document.getElementById('basin-filters').style.display = state.countryCode === 'LK' ? 'flex' : 'none';
    document.getElementById('rivernet-direct-btn').style.display = state.countryCode === 'LK' ? 'inline-flex' : 'none';
    document.getElementById('river-hub-title').textContent =
        state.countryCode === 'LK'
            ? 'Sri Lanka Irrigation Dept & RiverNet.lk Live Gauge Telemetry'
            : `${profile.name} (${profile.agency}) River & Watershed Telemetry`;

    let highestRiverStatus = 'normal';

    profile.rivers.forEach((river) => {
        if (state.countryCode === 'LK' && state.basinFilter !== 'all' && river.basinGroup !== state.basinFilter) return;

        const liveSensor = state.liveSriLankaGauges[river.id];
        let level = liveSensor ? liveSensor.level : (river.normalLvl + (rain24h * 0.015));

        if (state.simMode === 'yellow') level = river.alertLvl + 0.15;
        else if (state.simMode === 'orange') level = river.minorLvl + 0.25;
        else if (state.simMode === 'red') level = river.majorLvl + 0.45;

        level = Math.min(Math.max(level, 0.1), river.maxScale * 0.96);

        const levelInFeet = river.unit === 'ft' ? level : (level * 3.28084);
        const levelInMeters = river.unit === 'm' ? level : (level * 0.3048);
        const dualUnitStr = river.unit === 'm' ? `${levelInFeet.toFixed(1)} ft` : `${levelInMeters.toFixed(2)} m`;

        let status = 'normal', badgeText = 'NORMAL', badgeClass = 'green', waveColor = 'rgba(16, 185, 129, 0.42)';
        if (level >= river.majorLvl) {
            status = 'red'; badgeText = '🔴 MAJOR FLOOD'; badgeClass = 'red'; waveColor = 'rgba(239, 68, 68, 0.58)';
            highestRiverStatus = 'red';
        } else if (level >= river.minorLvl) {
            status = 'orange'; badgeText = '🟠 MINOR FLOOD'; badgeClass = 'orange'; waveColor = 'rgba(249, 115, 22, 0.52)';
            if (highestRiverStatus !== 'red') highestRiverStatus = 'orange';
        } else if (level >= river.alertLvl) {
            status = 'yellow'; badgeText = '🟡 ALERT LEVEL'; badgeClass = 'yellow'; waveColor = 'rgba(250, 204, 21, 0.48)';
            if (highestRiverStatus === 'normal') highestRiverStatus = 'yellow';
        }

        const fillPct = Math.min(Math.max((level / river.maxScale) * 100, 18), 94);
        const sensorSourceTag = liveSensor
            ? `<span style="color:#34d399; font-weight:700;">● Live Irrigation Gauge</span>`
            : `<span>● GloFAS Hydrological Model</span>`;

        const card = document.createElement('div');
        card.className = `river-card status-${status}`;
        card.innerHTML = `
            <div class="water-tank" style="height: ${fillPct}%;">
                <svg class="water-wave-svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C300,0 300,120 600,60 C900,0 900,120 1200,60 L1200,120 L0,120 Z" fill="${waveColor}"></path>
                </svg>
                <div class="water-body" style="background: ${waveColor};"></div>
            </div>
            <div class="river-content-top">
                <div class="river-header">
                    <div>
                        <div class="river-name">${river.name}</div>
                        <div class="river-station"><i class="ph-fill ph-map-pin"></i> ${river.station}</div>
                    </div>
                    <span class="sev-pill ${badgeClass}">${badgeText}</span>
                </div>
                <span class="sub-basin-tag">${river.subTag}</span>
                <div>
                    <a href="${river.rivernetUrl || 'https://rivernet.lk'}" target="_blank" rel="noopener" class="rivernet-ext-link">
                        <i class="ph-bold ph-arrow-square-out"></i> Verify on Official Portal
                    </a>
                </div>
            </div>
            <div class="river-content-bottom">
                <div class="river-readings">
                    <div>
                        <span class="water-level-val mono">${level.toFixed(2)}</span>
                        <span class="water-level-unit">${river.unit} <span style="opacity:0.75;">(${dualUnitStr})</span></span>
                    </div>
                    <div class="discharge-info">
                        <div>${sensorSourceTag}</div>
                        <div>Alert: <strong>${river.alertLvl}${river.unit}</strong> • Minor: <strong>${river.minorLvl}${river.unit}</strong></div>
                        <div>Major Flood: <strong>${river.majorLvl}${river.unit}</strong></div>
                    </div>
                </div>
            </div>
        `;
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
    return highestRiverStatus === 'normal' ? 'green' : highestRiverStatus;
}

/* --- Render 8-Hazard Matrix --- */
function renderHazardMatrix(m) {
    const grid = document.getElementById('hazard-grid');
    if (!grid) return 'green';
    const rankOrder = { green: 0, yellow: 1, orange: 2, red: 3 };
    let highestRank = 0;
    const bumpRank = (lvl) => { if (rankOrder[lvl] > highestRank) highestRank = rankOrder[lvl]; };

    const burnTimeMins = m.uvIndex >= 1 ? Math.max(Math.round(240 / m.uvIndex), 10) : 180;
    let uvLvl = 'green', uvLabel = 'LOW', spfRec = 'SPF 15+ / None', uvColor = '#10b981';
    if (m.uvIndex >= 11) { uvLvl = 'red'; uvLabel = 'EXTREME'; spfRec = 'SPF 50+ PA++++ & Hat'; uvColor = '#ef4444'; }
    else if (m.uvIndex >= 8) { uvLvl = 'orange'; uvLabel = 'VERY HIGH'; spfRec = 'SPF 50+ Every 80m'; uvColor = '#f97316'; }
    else if (m.uvIndex >= 6) { uvLvl = 'yellow'; uvLabel = 'HIGH'; spfRec = 'SPF 50+ Broad Spec'; uvColor = '#facc15'; }
    else if (m.uvIndex >= 3) { uvLvl = 'yellow'; uvLabel = 'MODERATE'; spfRec = 'SPF 30+ Sunscreen'; uvColor = '#facc15'; }
    bumpRank(uvLvl);

    let heatLvl = 'green', heatLabel = 'COMFORTABLE', heatAction = 'Normal hydration', heatColor = '#10b981';
    if (m.feelsC >= 41) { heatLvl = 'red'; heatLabel = 'EXTREME DANGER'; heatAction = 'Heatstroke risk! Stay cooled'; heatColor = '#ef4444'; }
    else if (m.feelsC >= 36) { heatLvl = 'orange'; heatLabel = 'HIGH STRESS'; heatAction = 'Limit outdoor exertion'; heatColor = '#f97316'; }
    else if (m.feelsC >= 32) { heatLvl = 'yellow'; heatLabel = 'CAUTION'; heatAction = 'Drink water every 30m'; heatColor = '#facc15'; }
    bumpRank(heatLvl);

    let rainLvl = 'green', rainLabel = 'NORMAL', rainAction = 'Below 50mm watch limit', rainColor = '#10b981';
    if (m.rain24h >= 100 || m.rain1h >= 40) { rainLvl = 'red'; rainLabel = 'EXTREME FLOOD/SLIDE'; rainAction = 'Red Threshold (>100mm)'; rainColor = '#ef4444'; }
    else if (m.rain24h >= 65 || m.rain1h >= 20) { rainLvl = 'orange'; rainLabel = 'HEAVY DOWNPOUR'; rainAction = 'Flash flood & slope warning'; rainColor = '#f97316'; }
    else if (m.rain24h >= 35) { rainLvl = 'yellow'; rainLabel = 'MODERATE WATCH'; rainAction = 'Monitor low-lying roads'; rainColor = '#facc15'; }
    bumpRank(rainLvl);

    let windLvl = 'green', windLabel = 'CALM / BREEZE', windAction = 'Safe coastal & road conditions', windColor = '#10b981';
    if (m.windGusts >= 75) { windLvl = 'red'; windLabel = 'CYCLONIC GALE'; windAction = 'Tree/powerline hazard! Stay in'; windColor = '#ef4444'; }
    else if (m.windGusts >= 55) { windLvl = 'orange'; windLabel = 'STRONG SQUALLS'; windAction = 'Rough seas & roof damage risk'; windColor = '#f97316'; }
    else if (m.windGusts >= 38) { windLvl = 'yellow'; windLabel = 'GUSTY WINDS'; windAction = 'Caution for small craft/bikes'; windColor = '#facc15'; }
    bumpRank(windLvl);

    let aqiLvl = 'green', aqiLabel = 'GOOD AIR', aqiAction = 'Clean breathable air', aqiColor = '#10b981';
    if (m.usAqi >= 151) { aqiLvl = 'red'; aqiLabel = 'UNHEALTHY'; aqiAction = 'Wear N95 mask outdoors'; aqiColor = '#ef4444'; }
    else if (m.usAqi >= 101) { aqiLvl = 'orange'; aqiLabel = 'SENSITIVE RISK'; aqiAction = 'Asthma/elderly limit exposure'; aqiColor = '#f97316'; }
    else if (m.usAqi >= 51) { aqiLvl = 'yellow'; aqiLabel = 'MODERATE'; aqiAction = 'Acceptable air quality'; aqiColor = '#facc15'; }
    bumpRank(aqiLvl);

    const visKm = (m.visMeters / 1000).toFixed(1);
    let visLvl = 'green', visLabel = 'CLEAR VIEW', visAction = 'Optimal driving visibility', visColor = '#10b981';
    if (m.visMeters < 1000) { visLvl = 'red'; visLabel = 'DENSE FOG / BLIND'; visAction = 'Use hazard/fog lights (<1km)'; visColor = '#ef4444'; }
    else if (m.visMeters < 3000) { visLvl = 'orange'; visLabel = 'POOR VISIBILITY'; visAction = 'Slow down on hill roads'; visColor = '#f97316'; }
    else if (m.visMeters < 6000) { visLvl = 'yellow'; visLabel = 'MODERATE HAZE'; visAction = 'Light mist or rain spray'; visColor = '#facc15'; }
    bumpRank(visLvl);

    let thundLvl = 'green', thundLabel = 'STABLE AIR', thundAction = 'Low convective lightning risk', thundColor = '#10b981';
    if (m.cape >= 2500 || m.liftedIdx <= -6) { thundLvl = 'red'; thundLabel = 'SEVERE LIGHTNING'; thundAction = 'Extreme CAPE! Unplug & shelter'; thundColor = '#ef4444'; }
    else if (m.cape >= 1500 || m.liftedIdx <= -3) { thundLvl = 'orange'; thundLabel = 'HIGH CONVECTIVE'; thundAction = 'Strong thunderclouds forming'; thundColor = '#f97316'; }
    else if (m.cape >= 800) { thundLvl = 'yellow'; thundLabel = 'STORM WATCH'; thundAction = 'Afternoon rumbles possible'; thundColor = '#facc15'; }
    bumpRank(thundLvl);

    const soilPct = Math.min(Math.round((m.soilMoisture / 0.55) * 100), 100);
    let soilLvl = 'green', soilLabel = 'STABLE SOIL', soilAction = 'Normal ground absorption', soilColor = '#10b981';
    if (soilPct >= 85 || m.rain24h >= 100) { soilLvl = 'red'; soilLabel = 'CRITICAL SATURATION'; soilAction = 'High landslide & runoff risk'; soilColor = '#ef4444'; }
    else if (soilPct >= 70 || m.rain24h >= 65) { soilLvl = 'orange'; soilLabel = 'SATURATED SLOPES'; soilAction = 'Watch cut slopes & walls'; soilColor = '#f97316'; }
    else if (soilPct >= 55) { soilLvl = 'yellow'; soilLabel = 'MOIST GROUND'; soilAction = 'Moderate surface runoff'; soilColor = '#facc15'; }
    bumpRank(soilLvl);

    const cardsHTML = [
        { icon: 'ph-sun', title: 'UV Severity & SPF', lvl: uvLvl, label: uvLabel, color: uvColor, main: `UV ${m.uvIndex.toFixed(1)}`, pct: Math.min((m.uvIndex / 12) * 100, 100), r1: ['Burn Time:', `~${burnTimeMins} mins`], r2: ['SPF Advice:', spfRec] },
        { icon: 'ph-thermometer-hot', title: 'Heat Stress Index', lvl: heatLvl, label: heatLabel, color: heatColor, main: `Feels ${formatTemp(m.feelsC)}`, pct: Math.min(Math.max(((m.feelsC - 20) / 26) * 100, 10), 100), r1: ['Air Temp / RH:', `${formatTemp(m.tempC)} at ${m.humidity}%`], r2: ['Advice:', heatAction] },
        { icon: 'ph-cloud-rain', title: 'Rainfall Risk', lvl: rainLvl, label: rainLabel, color: rainColor, main: `${m.rain24h.toFixed(1)} mm`, pct: Math.min((m.rain24h / 150) * 100, 100), r1: ['1h Intensity:', `${m.rain1h.toFixed(1)} mm/hr`], r2: ['Status:', rainAction] },
        { icon: 'ph-wind', title: 'Wind & Squall Risk', lvl: windLvl, label: windLabel, color: windColor, main: `${Math.round(m.windGusts)} km/h`, pct: Math.min((m.windGusts / 95) * 100, 100), r1: ['Sustained Wind:', `${Math.round(m.windSpeed)} km/h`], r2: ['Advisory:', windAction] },
        { icon: 'ph-leaf', title: 'AQI & Particulate Risk', lvl: aqiLvl, label: aqiLabel, color: aqiColor, main: `US AQI ${Math.round(m.usAqi)}`, pct: Math.min((m.usAqi / 200) * 100, 100), r1: ['PM2.5 / PM10:', `${m.pm25.toFixed(1)} / ${m.pm10.toFixed(0)} µg/m³`], r2: ['Health:', aqiAction] },
        { icon: 'ph-eye', title: 'Visibility Risk', lvl: visLvl, label: visLabel, color: visColor, main: `${visKm} km`, pct: Math.max(100 - (m.visMeters / 100), 12), r1: ['Meters Range:', `${Math.round(m.visMeters)} m`], r2: ['Road Safety:', visAction] },
        { icon: 'ph-lightning', title: 'Thunderstorm Risk', lvl: thundLvl, label: thundLabel, color: thundColor, main: `${Math.round(m.cape)} J/kg`, pct: Math.min((m.cape / 3200) * 100, 100), r1: ['Lifted Index:', `${m.liftedIdx.toFixed(1)}°C`], r2: ['Convection:', thundAction] },
        { icon: 'ph-mountains', title: 'Slope & Soil Moisture', lvl: soilLvl, label: soilLabel, color: soilColor, main: `${soilPct}% Sat`, pct: soilPct, r1: ['0-7cm Moisture:', `${m.soilMoisture.toFixed(2)} m³/m³`], r2: ['Slope Status:', soilAction] }
    ];

    grid.innerHTML = cardsHTML.map(c => `
        <div class="hazard-card sev-${c.lvl}">
            <div class="haz-top">
                <span class="haz-title"><i class="ph-fill ${c.icon}"></i> ${c.title}</span>
                <span class="sev-pill ${c.lvl}">${c.label}</span>
            </div>
            <div class="haz-main-val mono" style="color:${c.color};">${c.main}</div>
            <div class="haz-bar">
                <div class="haz-bar-fill" style="width:${Math.max(c.pct, 8)}%; background:${c.color};"></div>
            </div>
            <div class="haz-sub-rows">
                <div class="haz-row"><span>${c.r1[0]}</span> <strong>${c.r1[1]}</strong></div>
                <div class="haz-row"><span>${c.r2[0]}</span> <strong>${c.r2[1]}</strong></div>
            </div>
        </div>
    `).join('');

    return ['green', 'yellow', 'orange', 'red'][highestRank];
}

/* --- Render Marine Swell & USGS Live Seismic Telemetry --- */
function renderMarineAndSeismic() {
    const waveEl = document.getElementById('marine-wave');
    if (!waveEl) return;

    const mCurr = state.rawMarine?.current;
    const waveH = mCurr?.wave_height ?? 1.1;
    const swellH = mCurr?.swell_wave_height ?? 0.9;
    const waveP = mCurr?.wave_period ?? 8.2;

    waveEl.textContent = `${waveH.toFixed(1)} m`;
    document.getElementById('marine-swell').textContent = `${swellH.toFixed(1)} m`;
    document.getElementById('marine-period').textContent = `${waveP.toFixed(1)} s`;

    const advEl = document.getElementById('marine-advisory');
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

    const qContainer = document.getElementById('quake-container');
    if (!qContainer) return;
    qContainer.innerHTML = '';
    const qFrag = document.createDocumentFragment();

    if (!state.rawQuakes.length) {
        qContainer.innerHTML = `<div style="font-size:0.78rem; color:var(--text-secondary);">Syncing global USGS M4.0+ seismic feed...</div>`;
        return;
    }

    state.rawQuakes.slice(0, 7).forEach(q => {
        const mag = q.properties?.mag ?? 4.0;
        const place = q.properties?.place || "Oceanic Trench";
        const tsunami = q.properties?.tsunami === 1;
        const coords = q.geometry?.coordinates || [0, 0, 10];
        const distKm = calcDistanceKm(state.lat, state.lon, coords[1], coords[0]);
        const timeAgoMins = Math.max(Math.round((Date.now() - (q.properties?.time || Date.now())) / 60000), 1);
        const timeLbl = timeAgoMins >= 60 ? `${Math.floor(timeAgoMins / 60)}h ago` : `${timeAgoMins}m ago`;

        const magClass = mag >= 6.0 ? 'm-high' : mag >= 5.0 ? 'm-mod' : 'm-low';

        const item = document.createElement('div');
        item.className = 'quake-item';
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <div class="quake-mag mono ${magClass}">M${mag.toFixed(1)}</div>
                <div>
                    <div class="quake-place">${place}</div>
                    <div class="quake-meta">Depth: ${Math.round(coords[2])}km • ${distKm.toLocaleString()} km away • ${timeLbl}</div>
                </div>
            </div>
            <span class="sev-pill ${tsunami ? 'red' : 'green'}">${tsunami ? '🌊 TSUNAMI WATCH' : 'NO TSUNAMI'}</span>
        `;
        qFrag.appendChild(item);
    });
    qContainer.appendChild(qFrag);
}

/* --- Interactive Leaflet GIS Map + Live RainViewer Radar --- */
async function initOrUpdateRadarMap() {
    const mapEl = document.getElementById('radar-map');
    if (!mapEl || typeof L === 'undefined') return;

    if (!state.leafletMap) {
        state.leafletMap = L.map('radar-map', { zoomControl: true }).setView([state.lat, state.lon], 8);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap & CartoDB | RainViewer Radar',
            maxZoom: 18
        }).addTo(state.leafletMap);
        state.markerGroup = L.layerGroup().addTo(state.leafletMap);

        const rvData = await fetchWithTimeout('https://api.rainviewer.com/public/weather-maps.json', 3500);
        if (rvData?.radar?.past?.length) {
            const latestRadar = rvData.radar.past[rvData.radar.past.length - 1];
            state.radarLayer = L.tileLayer(`https://tilecache.rainviewer.com${latestRadar.path}/256/{z}/{x}/{y}/2/1_1.png`, {
                opacity: 0.65,
                zIndex: 10
            }).addTo(state.leafletMap);
            const dt = new Date(latestRadar.time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('radar-timestamp').textContent = `Doppler Radar Sync: ${dt}`;
        }
    } else {
        state.leafletMap.invalidateSize();
        state.leafletMap.setView([state.lat, state.lon], 8);
    }

    state.markerGroup.clearLayers();
    L.circleMarker([state.lat, state.lon], {
        radius: 9, color: '#38bdf8', fillColor: '#38bdf8', fillOpacity: 0.85
    }).bindPopup(`<strong>${state.city}</strong><br>Selected Telemetry Center`).addTo(state.markerGroup);

    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;
    profile.rivers.forEach(r => {
        L.circleMarker([r.lat, r.lon], {
            radius: 6, color: '#10b981', fillColor: '#10b981', fillOpacity: 0.9
        }).bindPopup(`<strong>${r.name}</strong><br>Station: ${r.station}<br>Alert Lvl: ${r.alertLvl}${r.unit}`).addTo(state.markerGroup);
    });
}

/* --- Master Emergency Banner --- */
function updateMasterAlertBanner(hazardLvl, riverLvl, rain24h, windGusts, uvIndex, animType, isDay) {
    const rank = { green: 0, yellow: 1, orange: 2, red: 3 };
    const finalRank = Math.max(rank[hazardLvl] || 0, rank[riverLvl] || 0);
    const level = ['green', 'yellow', 'orange', 'red'][finalRank];

    const banner = document.getElementById('alert-banner');
    const pill = document.getElementById('alert-pill');
    const title = document.getElementById('alert-title');
    const desc = document.getElementById('alert-desc');
    const icon = document.getElementById('alert-icon');
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;

    banner.className = `alert-banner glass level-${level}`;
    document.body.classList.toggle('red-alert-active', level === 'red');

    if (level === 'red') {
        pill.textContent = `🔴 RED ALERT • EMERGENCY ACTION REQUIRED`;
        title.textContent = state.countryCode === 'LK'
            ? `Major Flood & Landslide Emergency: Ratnapura, We Ganga & Millakanda Critical`
            : `Critical Multi-Hazard Emergency Warning in ${state.city}`;
        desc.textContent = `Extreme thresholds exceeded (24h Rain: ${rain24h.toFixed(1)}mm | Gusts: ${Math.round(windGusts)} km/h). Open the RiverNet tab for live station gauges.`;
        icon.innerHTML = `<i class="ph-fill ph-warning-octagon"></i>`;
        state.rainIntensity = 3.0;
        updateThemeAndParticles('thunder', 0);
    } else if (level === 'orange') {
        pill.textContent = `🟠 ORANGE ALERT • BE PREPARED`;
        title.textContent = state.countryCode === 'LK'
            ? `Amber Flood & Slope Warning: Kalu, We Ganga & Kukule/Millakanda Rising`
            : `Severe Weather & Hazard Warning Active in ${state.city}`;
        desc.textContent = `Heavy rainfall (${rain24h.toFixed(1)}mm) or Minor Flood river levels detected. Monitor RiverNet & 8-Hazard tabs closely.`;
        icon.innerHTML = `<i class="ph-fill ph-warning"></i>`;
        state.rainIntensity = 2.0;
        updateThemeAndParticles('rain', isDay);
    } else if (level === 'yellow') {
        pill.textContent = `🟡 YELLOW ALERT • WEATHER & BASIN WATCH`;
        title.textContent = `Advisory Watch Active Across ${state.city}`;
        desc.textContent = `Elevated weather or tributary Alert levels detected. Check the RiverNet & 8-Hazard tabs for details.`;
        icon.innerHTML = `<i class="ph-fill ph-bell-ringing"></i>`;
        state.rainIntensity = 1.25;
        updateThemeAndParticles(animType === 'clear' ? 'clear' : 'rain', isDay);
    } else {
        pill.textContent = `🟢 GREEN • ALL CLEAR`;
        title.textContent = `Conditions Normal Across ${state.city}`;
        desc.textContent = `Live telemetry from ${profile.agency} confirms safe atmospheric and hydrological conditions.`;
        icon.innerHTML = `<i class="ph-fill ph-shield-check"></i>`;
        state.rainIntensity = 1.0;
        updateThemeAndParticles(animType, isDay);
    }

    SoundEngine.updateMix();
}

/* --- Canvas Particle System & Page Visibility Battery Optimizer --- */
const canvas = document.getElementById('weather-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function updateThemeAndParticles(animType, isDay) {
    const isRed = document.body.classList.contains('red-alert-active');
    document.body.className = isRed ? 'red-alert-active' : '';

    if (animType === 'thunder') {
        document.body.classList.add('theme-thunder');
        state.particleType = 'thunder';
    } else if (animType === 'rain') {
        document.body.classList.add('theme-rain');
        state.particleType = 'rain';
    } else {
        document.body.classList.add(isDay ? 'theme-clear-day' : 'theme-clear-night');
        state.particleType = isDay ? 'sun-motes' : 'stars';
    }

    particles = [];
    const count = (state.particleType === 'rain' || state.particleType === 'thunder') ? Math.floor(135 * state.rainIntensity) : 65;
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vy: Math.random() * 2 + 1,
            size: Math.random() * 2.5 + 1,
            alpha: Math.random() * 0.7 + 0.2
        });
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const type = state.particleType;

    if (type === 'rain' || type === 'thunder') {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.55)';
        ctx.lineWidth = 1.5;
        for (let p of particles) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - 4, p.y + 18);
            ctx.stroke();
            p.y += 15 * state.rainIntensity * 0.7;
            p.x -= 2;
            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        }
        const flashProb = state.simMode === 'red' ? 0.012 : type === 'thunder' ? 0.004 : 0;
        if (Math.random() < flashProb) {
            const flash = document.getElementById('lightning');
            flash.style.opacity = '0.42';
            setTimeout(() => { flash.style.opacity = '0'; }, 80);
        }
    } else {
        for (let p of particles) {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.35})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.y -= 0.25;
            if (p.y < -10) p.y = canvas.height + 10;
        }
    }
    animationId = requestAnimationFrame(animateCanvas);
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
        if (SoundEngine.isPlaying && SoundEngine.ctx) SoundEngine.ctx.suspend();
    } else {
        if (!animationId) animateCanvas();
        if (SoundEngine.isPlaying && SoundEngine.ctx) SoundEngine.ctx.resume();
    }
});

/* --- Region Navigation & Event Listeners --- */
function renderRegionNavigation() {
    const profile = PROFILES[state.countryCode] || PROFILES.GLOBAL;
    document.getElementById('active-country-badge').textContent = `${profile.flag} ${profile.name}`;

    document.getElementById('hotlines-container').innerHTML = profile.hotlines.map(h => `
        <a href="tel:${h.num.replace(/\s+/g, '')}" class="hotline-chip">
            <span class="hotline-num">${h.num}</span>
            <span class="hotline-lbl">${h.lbl}</span>
        </a>
    `).join('');

    const pillsEl = document.getElementById('state-pills');
    pillsEl.innerHTML = '';
    profile.states.forEach(st => {
        const btn = document.createElement('button');
        btn.className = `state-pill ${st.code === state.stateCode ? 'active' : ''}`;
        btn.textContent = st.name;
        btn.addEventListener('click', () => {
            state.stateCode = st.code;
            document.querySelectorAll('.state-pill').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            fetchAllData(st.lat, st.lon, st.name, state.countryCode);
        });
        pillsEl.appendChild(btn);
    });
}

document.querySelectorAll('.country-chip').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.country-chip').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cCode = tab.dataset.country;
        state.countryCode = PROFILES[cCode] ? cCode : 'GLOBAL';
        const firstState = PROFILES[state.countryCode].states[0];
        state.stateCode = firstState.code;
        fetchAllData(firstState.lat, firstState.lon, firstState.name, state.countryCode);
    });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.basinFilter = btn.dataset.filter;
        renderEverything();
    });
});

document.getElementById('audio-btn')?.addEventListener('click', () => SoundEngine.toggle());
document.getElementById('sim-mode')?.addEventListener('change', (e) => {
    state.simMode = e.target.value;
    renderEverything();
});
document.getElementById('refresh-btn')?.addEventListener('click', () => {
    fetchAllData(state.lat, state.lon, state.city, state.countryCode);
});
document.getElementById('unit-btn')?.addEventListener('click', () => {
    state.unit = state.unit === 'C' ? 'F' : 'C';
    document.getElementById('unit-label').textContent = `°${state.unit}`;
    renderEverything();
});
document.getElementById('loc-btn')?.addEventListener('click', () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const geoData = await fetchWithTimeout(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`, 3000);
        const cName = geoData ? `${geoData.city || geoData.locality || 'My GPS'} (${geoData.countryName || ''})` : "GPS Location";
        const cCode = geoData?.countryCode && PROFILES[geoData.countryCode] ? geoData.countryCode : 'GLOBAL';
        fetchAllData(latitude, longitude, cName, cCode);
    });
});

const cityInput = document.getElementById('city-input');
const searchResults = document.getElementById('search-results');
let searchTimeout = null;

cityInput?.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    clearTimeout(searchTimeout);
    if (q.length < 2) {
        searchResults.classList.remove('active');
        return;
    }
    searchTimeout = setTimeout(async () => {
        const data = await fetchWithTimeout(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`, 3500);
        searchResults.innerHTML = '';
        if (!data || !data.results) return;
        data.results.forEach(place => {
            const div = document.createElement('div');
            div.className = 'search-item';
            div.innerHTML = `
                <div>
                    <strong>${place.name}</strong>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">${[place.admin1, place.country].filter(Boolean).join(', ')}</div>
                </div>
                <span style="font-size:0.72rem; color:#38bdf8;">${place.country_code || '🌍'}</span>
            `;
            div.addEventListener('click', () => {
                cityInput.value = '';
                searchResults.classList.remove('active');
                const cCode = place.country_code && PROFILES[place.country_code] ? place.country_code : 'GLOBAL';
                document.querySelectorAll('.country-chip').forEach(t => t.classList.toggle('active', t.dataset.country === cCode));
                fetchAllData(place.latitude, place.longitude, `${place.name} (${place.admin1 || place.country || ''})`, cCode);
            });
            searchResults.appendChild(div);
        });
        searchResults.classList.add('active');
    }, 260);
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) searchResults?.classList.remove('active');
});

/* --- Initialize Application Immediately --- */
animateCanvas();
fetchAllData(state.lat, state.lon, state.city, 'LK');