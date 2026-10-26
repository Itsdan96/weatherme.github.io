/* ==========================================================================
DATA CONFIGURATION: COUNTRY PROFILES, OFFICIAL GAUGE THRESHOLDS & WMO CODES
Sri Lanka: Complete 79-Station Real-Time Hydrological Registry across 23 Basins.
Dual-Synced Live with:
  1) Irrigation Dept API (https://sl-water-levels.vercel.app/api/levels) — 42 stations
  2) RiverNet.lk 5-Min IoT Sensor API (https://api.rivernet.lk/api/overview/latest-status-paginated) — 39 stations
Includes We Ganga (Kahawatta), Kukule Ganga (Kalawana), Kuru Ganga (Kuruwita),
Niriella Ganga (Elapatha), Denawaka Ganga (Pelmadulla), Galathura Oya (Ayagama),
Kelani (Mapitigama, Pugoda, Hanwella, Glencourse, Nagalagam St), Nilwala, Gin, Mahaweli & all basins.
========================================================================== */

const COUNTRY_PROFILES = {
  LK: {
    name: "Sri Lanka",
    flag: "🇱🇰",
    agency: "Irrigation Dept & RiverNet.lk 5-Min Live Telemetry",
    sunPriority: "conditional",
    primaryFocus: "Real-Time Monsoon Flood & NBRO Landslide Watch",
    hotlines: [
      { num: "117", lbl: "DMC Emergency" },
      { num: "1990", lbl: "Suwa Seriya" },
      { num: "011-2686686", lbl: "Met Dept" }
    ],
    states: [
      { code: "WP", name: "Colombo / Nugegoda (Kelani Basin)", lat: 6.8729, lon: 79.8899 },
      { code: "SG", name: "Ratnapura (Kalu / We Ganga)", lat: 6.6828, lon: 80.3992 },
      { code: "KL", name: "Kalawana / Millakanda (Kukule)", lat: 6.6312, lon: 80.1607 },
      { code: "CP", name: "Kandy / Peradeniya (Mahaweli Basin)", lat: 7.2906, lon: 80.6337 },
      { code: "SP", name: "Galle / Matara (Nilwala & Gin)", lat: 6.0535, lon: 80.2210 },
      { code: "NE", name: "Nuwara Eliya (Hill Country)", lat: 6.9497, lon: 80.7891 },
      { code: "NW", name: "Kurunegala (Deduru / Maha Oya)", lat: 7.4818, lon: 80.3609 },
      { code: "EP", name: "Batticaloa / Ampara (Eastern Basins)", lat: 7.7170, lon: 81.7000 }
    ],
    basins: {
      kalu: "Kalu Ganga & We Ganga Basin",
      kelani: "Kelani Ganga Basin",
      mahaweli: "Mahaweli & Badulu Oya Basin",
      nilwala: "Nilwala Ganga Basin",
      gin: "Gin Ganga Basin",
      mahaoya: "Maha Oya Basin",
      attenagalu: "Attanagalu & Gampaha Basin",
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
      mundeni: "Mundeni Aru Basin (Batticaloa)",
      andella: "Andella Oya Basin (Batticaloa)",
      magalawattuwan: "Magalawattuwan & Batticaloa Lagoon"
    },
    rivers: [
      /* =========================================================================
         1. KALU GANGA, WE GANGA & RATNAPURA TRIBUTARIES (11 Live Gauges)
         ========================================================================= */
      { id: "ratnapura", apiId: "kalu-ganga/rathnapura", rivernetUnitId: "I97", apiMatch: ["kalu-ganga/rathnapura", "ratnapura", "rathnapura"], name: "Kalu Ganga (Ratnapura) ⭐", station: "Ratnapura Main Gauge", basinGroup: "kalu", subTag: "Irrigation Dept + RiverNet.lk 5-Min Sensor", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.679067, lon: 80.397235, unit: "m", normalLvl: 1.95, alertLvl: 5.20, minorLvl: 7.50, majorLvl: 9.50, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "weganga", rivernetUnitId: "ID7", apiMatch: ["wey ganga", "we ganga", "kahawaththa", "kahawatta"], name: "We Ganga (Kahawatta) ⭐", station: "Kahawatta / Pelmadulla (ID7)", basinGroup: "kalu", subTag: "RiverNet.lk 5-Min Live Ultrasonic Gauge • Joins Kalu Ganga", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.581725, lon: 80.573609, unit: "m", normalLvl: 2.50, alertLvl: 7.80, minorLvl: 9.20, majorLvl: 10.50, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "kukuleganga", rivernetUnitId: "ID6", apiMatch: ["kukule ganga", "kalawana"], name: "Kukule Ganga (Kalawana) ⭐", station: "Kalawana Bridge Gauge (ID6)", basinGroup: "kalu", subTag: "RiverNet.lk 5-Min Live Ultrasonic Gauge • Kukule Spillway", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.580192, lon: 80.327008, unit: "m", normalLvl: 2.40, alertLvl: 7.50, minorLvl: 9.00, majorLvl: 10.50, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "millakanda", apiId: "kalu-ganga/kalawellawa-millakanda", apiMatch: ["kalu-ganga/kalawellawa-millakanda", "millakanda", "kalawellawa"], name: "Kuda Ganga / Kukule (Millakanda) ⭐", station: "Kalawellawa / Millakanda", basinGroup: "kalu", subTag: "Official Irrigation Dept • Downstream Kukule Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kalu-ganga/kalawellawa-millakanda", lat: 6.631166, lon: 80.16069, unit: "m", normalLvl: 3.26, alertLvl: 5.00, minorLvl: 6.50, majorLvl: 8.00, maxScale: 10.0, thresholdSource: "official", official: true },
      { id: "ellagawa", apiId: "kalu-ganga/ellagawa", apiMatch: ["kalu-ganga/ellagawa", "ellagawa"], name: "Kalu Ganga (Ellagawa) ⭐", station: "Ellagawa (Kiriella / Horana)", basinGroup: "kalu", subTag: "Official Irrigation Dept • Mid-Basin Kalu Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kalu-ganga/ellagawa", lat: 6.731554, lon: 80.218254, unit: "m", normalLvl: 5.46, alertLvl: 10.00, minorLvl: 10.70, majorLvl: 12.20, maxScale: 14.5, thresholdSource: "official", official: true },
      { id: "kuruganga", rivernetUnitId: "ID3", apiMatch: ["kuru ganga", "kuruvita", "kuruwita"], name: "Kuru Ganga (Kuruwita) ⭐", station: "Kuruwita Bridge Gauge (ID3)", basinGroup: "kalu", subTag: "RiverNet.lk 5-Min Live Ultrasonic Gauge • Upper Kalu Tributary", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.798743, lon: 80.368428, unit: "m", normalLvl: 1.80, alertLvl: 7.50, minorLvl: 9.00, majorLvl: 10.50, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "niriellaganga", rivernetUnitId: "ID8", apiMatch: ["niriella ganga", "elapatha"], name: "Niriella Ganga (Elapatha) ⭐", station: "Elapatha Bridge Gauge (ID8)", basinGroup: "kalu", subTag: "RiverNet.lk 5-Min Live Ultrasonic Gauge • Joins Hangomuwa/Kalu", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.631629, lon: 80.365602, unit: "m", normalLvl: 2.10, alertLvl: 7.50, minorLvl: 9.00, majorLvl: 10.50, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "denawakaganga", rivernetUnitId: "ID5", apiMatch: ["denawaka ganga", "pelmadulla"], name: "Denawaka Ganga (Pelmadulla) ⭐", station: "Pelmadulla Gauge (ID5)", basinGroup: "kalu", subTag: "RiverNet.lk 5-Min Live Ultrasonic Gauge • Pelmadulla Valley", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.709264, lon: 80.290918, unit: "m", normalLvl: 1.90, alertLvl: 7.50, minorLvl: 9.00, majorLvl: 10.50, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "galathuraoya", rivernetUnitId: "ID4", apiMatch: ["galathura oya", "ayagama"], name: "Galathura Oya (Ayagama)", station: "Ayagama Bridge Gauge (ID4)", basinGroup: "kalu", subTag: "RiverNet.lk 5-Min Live Ultrasonic Gauge • Kalu Tributary", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.695000, lon: 80.385000, unit: "m", normalLvl: 1.50, alertLvl: 7.50, minorLvl: 9.00, majorLvl: 10.50, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "magura", apiId: "kalu-ganga/magura", apiMatch: ["kalu-ganga/magura", "magura"], name: "Maguru Ganga (Magura)", station: "Magura (Baduraliya / Kalawana)", basinGroup: "kalu", subTag: "Official Irrigation Dept • Kalu Tributary Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kalu-ganga/magura", lat: 6.513727, lon: 80.243935, unit: "m", normalLvl: 2.69, alertLvl: 4.00, minorLvl: 6.00, majorLvl: 7.50, maxScale: 9.0, thresholdSource: "official", official: true },
      { id: "puttupaula", apiId: "kalu-ganga/putupaula", apiMatch: ["kalu-ganga/putupaula", "putupaula", "puttupaula"], name: "Kalu Ganga (Putupaula)", station: "Putupaula (Kalutara / Dodangoda)", basinGroup: "kalu", subTag: "Official Irrigation Dept • Lower Kalu Estuary Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kalu-ganga/putupaula", lat: 6.614324, lon: 80.061511, unit: "m", normalLvl: 0.61, alertLvl: 3.00, minorLvl: 4.00, majorLvl: 5.00, maxScale: 6.5, thresholdSource: "official", official: true },

      /* =========================================================================
         2. KELANI GANGA BASIN (9 Live Gauges: 7 Irrigation Dept + 2 RiverNet.lk)
         ========================================================================= */
      { id: "nagalagam", apiId: "kelani-ganga/nagalagam-street", apiMatch: ["kelani-ganga/nagalagam-street", "nagalagam"], name: "Kelani Ganga (Nagalagam St) ⭐", station: "Nagalagam Street (Colombo)", basinGroup: "kelani", subTag: "Official Colombo Estuary Flood Gauge", rivernetUrl: "https://rivernet.lk/kelaniya", lat: 6.958265, lon: 79.878642, unit: "ft", normalLvl: 2.10, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 7.00, maxScale: 9.0, thresholdSource: "official", official: true },
      { id: "hanwella", apiId: "kelani-ganga/hanwella", apiMatch: ["kelani-ganga/hanwella", "hanwella"], name: "Kelani Ganga (Hanwella) ⭐", station: "Hanwella (Seethawaka)", basinGroup: "kelani", subTag: "Official Lower-Mid Kelani Flood Gauge", rivernetUrl: "https://rivernet.lk/kelaniya", lat: 6.909700, lon: 80.083126, unit: "m", normalLvl: 2.80, alertLvl: 6.50, minorLvl: 7.50, majorLvl: 9.50, maxScale: 11.5, thresholdSource: "official", official: true },
      { id: "pugoda", rivernetUnitId: "ID2", apiMatch: ["pugoda"], name: "Kelani Ganga (Pugoda) ⭐", station: "Pugoda Ferry / Bridge (ID2)", basinGroup: "kelani", subTag: "RiverNet.lk 5-Min Live Sensor • Mid-Kelani Floodplain", rivernetUrl: "https://rivernet.lk/kelaniya", lat: 6.974205, lon: 80.123279, unit: "m", normalLvl: 3.50, alertLvl: 8.00, minorLvl: 10.00, majorLvl: 11.50, maxScale: 13.0, thresholdSource: "official", official: true },
      { id: "mapitigama", rivernetUnitId: "ID1", apiMatch: ["mapitigama"], name: "Kelani Ganga (Mapitigama) ⭐", station: "Mapitigama (Ruwanwella / Dompe ID1)", basinGroup: "kelani", subTag: "RiverNet.lk 5-Min Live Sensor • Upper-Mid Kelani", rivernetUrl: "https://rivernet.lk/kelaniya", lat: 7.003153, lon: 80.221806, unit: "m", normalLvl: 2.60, alertLvl: 6.00, minorLvl: 7.00, majorLvl: 8.50, maxScale: 10.5, thresholdSource: "official", official: true },
      { id: "glencourse", apiId: "kelani-ganga/glencourse", apiMatch: ["kelani-ganga/glencourse", "glencourse"], name: "Kelani Ganga (Glencourse) ⭐", station: "Glencourse (Avissawella)", basinGroup: "kelani", subTag: "Official Mid-Basin Kelani Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kelani-ganga/glencourse", lat: 6.976981, lon: 80.194247, unit: "m", normalLvl: 9.50, alertLvl: 15.00, minorLvl: 15.50, majorLvl: 19.00, maxScale: 22.0, thresholdSource: "official", official: true },
      { id: "holombuwa", apiId: "kelani-ganga/holombuwa", apiMatch: ["kelani-ganga/holombuwa", "holombuwa"], name: "Gurugoda Oya / Kelani (Holombuwa)", station: "Holombuwa (Kegalle)", basinGroup: "kelani", subTag: "Official Northern Kelani Tributary Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kelani-ganga/holombuwa", lat: 7.188201, lon: 80.266331, unit: "m", normalLvl: 1.40, alertLvl: 3.00, minorLvl: 4.00, majorLvl: 6.00, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "deraniyagala", apiId: "kelani-ganga/deraniyagala", apiMatch: ["kelani-ganga/deraniyagala", "deraniyagala"], name: "Seethawaka Ganga (Deraniyagala)", station: "Deraniyagala", basinGroup: "kelani", subTag: "Official Upper Kelani Tributary Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kelani-ganga/deraniyagala", lat: 6.925934, lon: 80.339212, unit: "m", normalLvl: 1.80, alertLvl: 4.80, minorLvl: 5.80, majorLvl: 7.00, maxScale: 8.5, thresholdSource: "official", official: true },
      { id: "kithulgala", apiId: "kelani-ganga/kithulgala", apiMatch: ["kelani-ganga/kithulgala", "kithulgala"], name: "Kelani Ganga (Kithulgala)", station: "Kithulgala", basinGroup: "kelani", subTag: "Official Upper Kelani Canyon Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kelani-ganga/kithulgala", lat: 6.991259, lon: 80.419213, unit: "m", normalLvl: 1.60, alertLvl: 3.00, minorLvl: 4.00, majorLvl: 6.00, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "norwood", apiId: "kelani-ganga/norwood", apiMatch: ["kelani-ganga/norwood", "norwood"], name: "Kehelgamu Oya (Norwood)", station: "Norwood (Hatton)", basinGroup: "kelani", subTag: "Official Kelani Headwaters Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kelani-ganga/norwood", lat: 6.840145, lon: 80.611301, unit: "m", normalLvl: 0.80, alertLvl: 1.50, minorLvl: 3.00, majorLvl: 4.50, maxScale: 6.0, thresholdSource: "official", official: true },

      /* =========================================================================
         3. ATTANAGALU OYA & GAMPAHA / MUTHURAJAWELA BASIN (3 Live Gauges)
         ========================================================================= */
      { id: "dunamale", apiId: "aththanagalu-oya/dunamale", apiMatch: ["aththanagalu-oya/dunamale", "dunamale"], name: "Attanagalu Oya (Dunamale) ⭐", station: "Dunamale (Gampaha)", basinGroup: "attenagalu", subTag: "Official Attanagalu Oya Flood Gauge", rivernetUrl: "https://rivernet.lk/gampaha", lat: 7.116416, lon: 80.084085, unit: "m", normalLvl: 1.65, alertLvl: 3.30, minorLvl: 4.40, majorLvl: 5.50, maxScale: 7.0, thresholdSource: "official", official: true },
      { id: "uruwaloya", rivernetUnitId: "IG1", apiMatch: ["miriswatta", "uruwal oya"], name: "Uruwal Oya (Miriswatta - Gampaha)", station: "Miriswatta Bridge (IG1)", basinGroup: "attenagalu", subTag: "RiverNet.lk 5-Min Live Sensor • Gampaha Flood Basin", rivernetUrl: "https://rivernet.lk/gampaha", lat: 7.083204, lon: 79.986287, unit: "m", normalLvl: 1.20, alertLvl: 6.00, minorLvl: 7.50, majorLvl: 9.00, maxScale: 10.0, thresholdSource: "official", official: true },
      { id: "wattala-kaluela", rivernetUnitId: "IG2", apiMatch: ["wattala", "kalu ela"], name: "Kalu Ela (Wattala - Ja-Ela)", station: "Wattala Canal Gauge (IG2)", basinGroup: "attenagalu", subTag: "RiverNet.lk 5-Min Live Sensor • Lower Muthurajawela Outfall", rivernetUrl: "https://rivernet.lk/gampaha", lat: 6.991185, lon: 79.892191, unit: "m", normalLvl: 1.50, alertLvl: 7.50, minorLvl: 9.00, majorLvl: 10.50, maxScale: 12.0, thresholdSource: "official", official: true },

      /* =========================================================================
         4. NILWALA GANGA BASIN (9 Live Gauges: 4 Irrigation Dept + 5 RiverNet.lk)
         ========================================================================= */
      { id: "panadugama", apiId: "nilwala-ganga/panadugama", apiMatch: ["nilwala-ganga/panadugama", "panadugama"], name: "Nilwala Ganga (Panadugama) ⭐", station: "Panadugama (Akuressa)", basinGroup: "nilwala", subTag: "Official Main Nilwala Flood Gauge", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.111780, lon: 80.482384, unit: "m", normalLvl: 2.75, alertLvl: 5.00, minorLvl: 6.00, majorLvl: 7.50, maxScale: 9.5, thresholdSource: "official", official: true },
      { id: "pitabeddara", apiId: "nilwala-ganga/pitabeddara", apiMatch: ["nilwala-ganga/pitabeddara", "pitabeddara"], name: "Nilwala Ganga (Pitabeddara)", station: "Pitabeddara", basinGroup: "nilwala", subTag: "Official Upper-Mid Nilwala Gauge", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.213746, lon: 80.476604, unit: "m", normalLvl: 2.00, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 6.50, maxScale: 8.0, thresholdSource: "official", official: true },
      { id: "thalgahagoda", apiId: "nilwala-ganga/thalgahagoda", apiMatch: ["nilwala-ganga/thalgahagoda", "thalgahagoda"], name: "Nilwala Ganga (Thalgahagoda)", station: "Thalgahagoda (Matara)", basinGroup: "nilwala", subTag: "Official Lower Nilwala Basin Gauge", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.010300, lon: 80.532930, unit: "m", normalLvl: 0.80, alertLvl: 1.40, minorLvl: 1.70, majorLvl: 2.80, maxScale: 3.6, thresholdSource: "official", official: true },
      { id: "urawa", apiId: "nilwala-ganga/urawa", apiMatch: ["nilwala-ganga/urawa", "urawa"], name: "Nilwala Ganga (Urawa)", station: "Urawa", basinGroup: "nilwala", subTag: "Official Upper Nilwala Tributary Gauge", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.236730, lon: 80.572011, unit: "m", normalLvl: 1.30, alertLvl: 2.50, minorLvl: 4.00, majorLvl: 6.00, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "bangama", rivernetUnitId: "IDY", apiMatch: ["bangama"], name: "Nilwala Ganga (Bangama Bridge)", station: "Bangama Bridge (Akuressa IDY)", basinGroup: "nilwala", subTag: "RiverNet.lk 5-Min Live Sensor • Nilwala Basin", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.142000, lon: 80.491000, unit: "m", normalLvl: 1.20, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "polothugama", rivernetUnitId: "IDZ", apiMatch: ["polothugama"], name: "Nilwala Ganga (Polothugama Bridge)", station: "Polothugama Bridge (IDZ)", basinGroup: "nilwala", subTag: "RiverNet.lk 5-Min Live Sensor • Nilwala Basin", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.085000, lon: 80.525000, unit: "m", normalLvl: 1.80, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "hulandawa", rivernetUnitId: "IEX", apiMatch: ["hulandawa"], name: "Hulandawa Oya (Hulandawa Bridge)", station: "Hulandawa Bridge (Akuressa IEX)", basinGroup: "nilwala", subTag: "RiverNet.lk 5-Min Live Sensor • Nilwala Tributary", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.172000, lon: 80.478000, unit: "m", normalLvl: 2.20, alertLvl: 4.50, minorLvl: 5.00, majorLvl: 5.50, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "kirama-warapitiya", rivernetUnitId: "IFL", apiMatch: ["kirama", "warapitiya"], name: "Kirama Oya (Warapitiya)", station: "Kirama Tank / Warapitiya (IFL)", basinGroup: "nilwala", subTag: "RiverNet.lk 5-Min Live Sensor • Kirama / Nilwala Basin", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.135000, lon: 80.625000, unit: "m", normalLvl: 2.00, alertLvl: 4.50, minorLvl: 5.00, majorLvl: 5.50, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "kekiriobada", rivernetUnitId: "IFM", apiMatch: ["kekiriobada"], name: "Kekiriobada (Kirama / Nilwala)", station: "Kekiriobada Reservoir Gauge (IFM)", basinGroup: "nilwala", subTag: "RiverNet.lk 5-Min Live Sensor • Southern Catchment", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.158000, lon: 80.642000, unit: "m", normalLvl: 8.00, alertLvl: 14.50, minorLvl: 15.50, majorLvl: 16.50, maxScale: 18.0, thresholdSource: "official", official: true },

      /* =========================================================================
         5. GIN GANGA BASIN (2 Live Gauges)
         ========================================================================= */
      { id: "baddegama", apiId: "gin-ganga/baddegama", apiMatch: ["gin-ganga/baddegama", "baddegama"], name: "Gin Ganga (Baddegama) ⭐", station: "Baddegama (Galle)", basinGroup: "gin", subTag: "Official Lower Gin Ganga Flood Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/gin-ganga/baddegama", lat: 6.173806, lon: 80.175381, unit: "m", normalLvl: 1.85, alertLvl: 3.50, minorLvl: 4.00, majorLvl: 5.00, maxScale: 6.8, thresholdSource: "official", official: true },
      { id: "thawalama", apiId: "gin-ganga/thawalama", apiMatch: ["gin-ganga/thawalama", "thawalama"], name: "Gin Ganga (Thawalama) ⭐", station: "Thawalama (Neluwa / Hiniduma)", basinGroup: "gin", subTag: "Official Upper Gin Ganga Flood Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/gin-ganga/thawalama", lat: 6.341776, lon: 80.330616, unit: "m", normalLvl: 2.10, alertLvl: 4.00, minorLvl: 6.00, majorLvl: 7.50, maxScale: 9.0, thresholdSource: "official", official: true },

      /* =========================================================================
         6. MAHAWELI GANGA & BADULU OYA BASIN (8 Live Gauges)
         ========================================================================= */
      { id: "peradeniya", apiId: "mahaweli-ganga/peradeniya", apiMatch: ["mahaweli-ganga/peradeniya", "peradeniya"], name: "Mahaweli Ganga (Peradeniya) ⭐", station: "Peradeniya (Kandy)", basinGroup: "mahaweli", subTag: "Official Irrigation Dept • Central Hill Country Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/mahaweli-ganga/peradeniya", lat: 7.269059, lon: 80.593005, unit: "m", normalLvl: 2.30, alertLvl: 5.00, minorLvl: 7.00, majorLvl: 9.00, maxScale: 11.5, thresholdSource: "official", official: true },
      { id: "peradeniya-rivernet", rivernetUnitId: "KAC", apiMatch: ["mahaweli river peradeniya"], name: "Mahaweli Ganga (Kandy / Katugastota) ⭐", station: "Peradeniya / Kandy RiverNet (KAC)", basinGroup: "mahaweli", subTag: "RiverNet.lk 5-Min Live Ultrasonic Gauge", rivernetUrl: "https://rivernet.lk/mahaweli", lat: 7.293609, lon: 80.641335, unit: "m", normalLvl: 2.20, alertLvl: 5.00, minorLvl: 6.00, majorLvl: 8.00, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "nawalapitiya", apiId: "mahaweli-ganga/nawalapitiya", apiMatch: ["mahaweli-ganga/nawalapitiya", "nawalapitiya"], name: "Mahaweli Ganga (Nawalapitiya)", station: "Nawalapitiya", basinGroup: "mahaweli", subTag: "Official Upper Mahaweli Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/mahaweli-ganga/nawalapitiya", lat: 7.048945, lon: 80.536162, unit: "m", normalLvl: 1.80, alertLvl: 3.50, minorLvl: 5.00, majorLvl: 6.00, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "manampitiya", apiId: "mahaweli-ganga/manampitiya", apiMatch: ["mahaweli-ganga/manampitiya", "manampitiya"], name: "Mahaweli Ganga (Manampitiya)", station: "Manampitiya (Polonnaruwa)", basinGroup: "mahaweli", subTag: "Official Lower Mahaweli Floodplain Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/mahaweli-ganga/manampitiya", lat: 7.912987, lon: 81.090594, unit: "m", normalLvl: 1.20, alertLvl: 3.00, minorLvl: 4.30, majorLvl: 6.00, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "thaldena", apiId: "mahaweli-ganga/thaldena", apiMatch: ["mahaweli-ganga/thaldena", "thaldena"], name: "Badulu Oya (Thaldena)", station: "Thaldena (Badulla)", basinGroup: "mahaweli", subTag: "Official Irrigation Dept • Badulu Oya Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/mahaweli-ganga/thaldena", lat: 7.090653, lon: 81.048886, unit: "m", normalLvl: 1.00, alertLvl: 3.00, minorLvl: 4.00, majorLvl: 5.00, maxScale: 6.5, thresholdSource: "official", official: true },
      { id: "haliela", rivernetUnitId: "IEY", apiMatch: ["hali-ela", "haliela"], name: "Badulu Oya (Hali-Ela Bridge)", station: "Hali-Ela Bridge (Badulla IEY)", basinGroup: "mahaweli", subTag: "RiverNet.lk 5-Min Live Sensor • Upper Badulu Oya", rivernetUrl: "https://rivernet.lk/baduluoya", lat: 6.953000, lon: 81.032000, unit: "m", normalLvl: 1.10, alertLvl: 4.00, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "weraganthota", apiId: "mahaweli-ganga/weraganthota", apiMatch: ["mahaweli-ganga/weraganthota", "weraganthota"], name: "Mahaweli Ganga (Weraganthota)", station: "Weraganthota (Mahiyanganaya)", basinGroup: "mahaweli", subTag: "Official Mid-Mahaweli Valley Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/mahaweli-ganga/weraganthota", lat: 7.316470, lon: 80.989110, unit: "m", normalLvl: 1.00, alertLvl: 5.00, minorLvl: 6.00, majorLvl: 8.00, maxScale: 10.0, thresholdSource: "official", official: true },
      { id: "calidonia", apiId: "mahaweli-ganga/calidonia", apiMatch: ["mahaweli-ganga/calidonia", "calidonia"], name: "Kotmale Oya (Calidonia)", station: "Calidonia (Lindula)", basinGroup: "mahaweli", subTag: "Official Upper Kotmale Tributary Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/mahaweli-ganga/calidonia", lat: 6.901996, lon: 80.697581, unit: "m", normalLvl: 1.50, alertLvl: null, minorLvl: null, majorLvl: null, maxScale: 8.0, thresholdSource: "official", official: true },

      /* =========================================================================
         7. MAHA OYA BASIN (2 Live Gauges)
         ========================================================================= */
      { id: "badalgama", apiId: "maha-oya/badalgama", apiMatch: ["maha-oya/badalgama", "badalgama"], name: "Maha Oya (Badalgama) ⭐", station: "Badalgama (Negombo / Gampaha)", basinGroup: "mahaoya", subTag: "Official Lower Maha Oya Flood Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/maha-oya/badalgama", lat: 7.300741, lon: 79.983916, unit: "m", normalLvl: 2.50, alertLvl: 5.00, minorLvl: 6.20, majorLvl: 9.60, maxScale: 11.5, thresholdSource: "official", official: true },
      { id: "giriulla", apiId: "maha-oya/giriulla", apiMatch: ["maha-oya/giriulla", "giriulla"], name: "Maha Oya (Giriulla) ⭐", station: "Giriulla (Kurunegala)", basinGroup: "mahaoya", subTag: "Official Mid-Maha Oya Flood Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/maha-oya/giriulla", lat: 7.330736, lon: 80.125095, unit: "m", normalLvl: 2.60, alertLvl: 5.50, minorLvl: 6.50, majorLvl: 7.50, maxScale: 9.5, thresholdSource: "official", official: true },

      /* =========================================================================
         8. DEDURU OYA BASIN (4 Live Gauges: 1 Irrigation Dept + 3 RiverNet.lk)
         ========================================================================= */
      { id: "moragaswewa", apiId: "deduru-oya/moragaswewa", apiMatch: ["deduru-oya/moragaswewa", "moragaswewa"], name: "Deduru Oya (Moragaswewa) ⭐", station: "Moragaswewa (Chilaw / Bingiriya)", basinGroup: "deduru", subTag: "Official Irrigation Dept Deduru Oya Gauge", rivernetUrl: "https://rivernet.lk/deduruoya", lat: 7.700000, lon: 79.990000, unit: "m", normalLvl: 2.20, alertLvl: 4.75, minorLvl: 6.00, majorLvl: 7.00, maxScale: 8.5, thresholdSource: "official", official: true },
      { id: "ridibendiella", rivernetUnitId: "I30", apiMatch: ["ridibendiella"], name: "Deduru Oya (Ridibendiella Bridge)", station: "Ridibendiella (Nikaweratiya I30)", basinGroup: "deduru", subTag: "RiverNet.lk 5-Min Live Sensor • Mid-Deduru Basin", rivernetUrl: "https://rivernet.lk/deduruoya", lat: 7.735000, lon: 80.135000, unit: "m", normalLvl: 2.00, alertLvl: 4.50, minorLvl: 5.00, majorLvl: 5.50, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "sengaloya", rivernetUnitId: "I33", apiMatch: ["sengaloya"], name: "Sengal Oya / Deduru (Sengaloya Anicut)", station: "Sengaloya Anicut Bridge (I33)", basinGroup: "deduru", subTag: "RiverNet.lk 5-Min Live Sensor • Lower Deduru Basin", rivernetUrl: "https://rivernet.lk/deduruoya", lat: 7.658000, lon: 79.912000, unit: "m", normalLvl: 2.00, alertLvl: 4.50, minorLvl: 5.00, majorLvl: 5.50, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "deduru-bridge", rivernetUnitId: "I34", apiMatch: ["deduru oya bridge"], name: "Deduru Oya (Chilaw Bridge)", station: "Deduru Oya Main Bridge (I34)", basinGroup: "deduru", subTag: "RiverNet.lk 5-Min Live Sensor • Deduru Estuary", rivernetUrl: "https://rivernet.lk/deduruoya", lat: 7.612000, lon: 79.825000, unit: "m", normalLvl: 1.80, alertLvl: 4.50, minorLvl: 5.00, majorLvl: 5.50, maxScale: 6.0, thresholdSource: "official", official: true },

      /* =========================================================================
         9. KIRINDI OYA BASIN (3 Live Gauges)
         ========================================================================= */
      { id: "wellawaya", apiId: "kirindi-oya/wellawaya", apiMatch: ["kirindi-oya/wellawaya", "wellawaya"], name: "Kirindi Oya (Wellawaya)", station: "Wellawaya", basinGroup: "kirindi", subTag: "Official Upper Kirindi Oya Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kirindi-oya/wellawaya", lat: 6.695760, lon: 81.112140, unit: "m", normalLvl: 1.50, alertLvl: 4.40, minorLvl: 5.40, majorLvl: 5.90, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "thanamalwila", apiId: "kirindi-oya/thanamalwila", apiMatch: ["kirindi-oya/thanamalwila", "thanamalwila"], name: "Kirindi Oya (Thanamalwila)", station: "Thanamalwila", basinGroup: "kirindi", subTag: "Official Lower Kirindi Oya Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kirindi-oya/thanamalwila", lat: 6.469050, lon: 81.133751, unit: "m", normalLvl: 1.40, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 5.50, maxScale: 7.0, thresholdSource: "official", official: true },
      { id: "kudaoya", apiId: "kirindi-oya/kuda-oya", apiMatch: ["kirindi-oya/kuda-oya", "kuda-oya", "kuda oya"], name: "Kirindi / Kuda Oya (Kuda Oya)", station: "Kuda Oya", basinGroup: "kirindi", subTag: "Official Kirindi Tributary Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kirindi-oya/kuda-oya", lat: 6.524746, lon: 81.123337, unit: "m", normalLvl: 1.60, alertLvl: 6.90, minorLvl: 8.40, majorLvl: 8.80, maxScale: 10.5, thresholdSource: "official", official: true },

      /* =========================================================================
         10. WALAWE GANGA BASIN (1 Live Gauge)
         ========================================================================= */
      { id: "moraketiya", apiId: "walawe-ganga/moraketiya", apiMatch: ["walawe-ganga/moraketiya", "moraketiya"], name: "Walawe Ganga (Moraketiya) ⭐", station: "Moraketiya (Embilipitiya)", basinGroup: "walawe", subTag: "Official Walawe Basin Flood Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/walawe-ganga/moraketiya", lat: 6.345339, lon: 80.901244, unit: "m", normalLvl: 1.50, alertLvl: 3.00, minorLvl: 5.00, majorLvl: 7.00, maxScale: 8.5, thresholdSource: "official", official: true },

      /* =========================================================================
         11. MALWATHU OYA, MEE OYA, YAN OYA, MA OYA & KALA OYA (5 Live Gauges)
         ========================================================================= */
      { id: "thanthirimale", apiId: "malwathu-oya/thanthirimale", apiMatch: ["malwathu-oya/thanthirimale", "thanthirimale"], name: "Malwathu Oya (Thanthirimale) ⭐", station: "Thanthirimale (Anuradhapura)", basinGroup: "malwathu", subTag: "Official Malwathu Oya Flood Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/malwathu-oya/thanthirimale", lat: 8.590081, lon: 80.278070, unit: "m", normalLvl: 2.20, alertLvl: 5.00, minorLvl: 6.80, majorLvl: 7.80, maxScale: 9.5, thresholdSource: "official", official: true },
      { id: "galgamuwa", apiId: "mee-oya/galgamuwa", apiMatch: ["mee-oya/galgamuwa", "galgamuwa"], name: "Mee Oya (Galgamuwa) ⭐", station: "Galgamuwa (Kurunegala / Puttalam)", basinGroup: "meeoya", subTag: "Official Mee Oya Basin Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/mee-oya/galgamuwa", lat: 7.969368, lon: 80.262322, unit: "m", normalLvl: 2.10, alertLvl: 4.84, minorLvl: 5.94, majorLvl: 8.00, maxScale: 9.5, thresholdSource: "official", official: true },
      { id: "horowpothana", apiId: "yan-oya/horowpothana", apiMatch: ["yan-oya/horowpothana", "horowpothana"], name: "Yan Oya (Horowpothana)", station: "Horowpothana (Trincomalee / Anuradhapura)", basinGroup: "yanoya", subTag: "Official Yan Oya Basin Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/yan-oya/horowpothana", lat: 8.576998, lon: 80.880815, unit: "m", normalLvl: 2.30, alertLvl: 6.00, minorLvl: 7.50, majorLvl: 10.50, maxScale: 12.5, thresholdSource: "official", official: true },
      { id: "yakawewa", apiId: "ma-oya/yaka-wewa", apiMatch: ["ma-oya/yaka-wewa", "yaka-wewa", "yaka wewa"], name: "Ma Oya (Yaka Wewa)", station: "Yaka Wewa (Kebithigollewa)", basinGroup: "maoya", subTag: "Official Ma Oya Basin Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/ma-oya/yaka-wewa", lat: 8.726031, lon: 80.674968, unit: "m", normalLvl: 1.20, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 6.00, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "thambuththegama", apiId: "kala-oya/thambuththegama", apiMatch: ["kala-oya/thambuththegama", "thambuththegama", "thabuththegama"], name: "Kala Oya (Thambuththegama)", station: "Thambuththegama (Anuradhapura)", basinGroup: "kalaoya", subTag: "Official Kala Oya Basin Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kala-oya/thambuththegama", lat: 8.121269, lon: 80.325558, unit: "m", normalLvl: 1.80, alertLvl: null, minorLvl: null, majorLvl: null, maxScale: 8.5, thresholdSource: "official", official: true },

      /* =========================================================================
         12. MENIK GANGA, KUMBUKKAN OYA & HEDA OYA (3 Live Gauges)
         ========================================================================= */
      { id: "katharagama", apiId: "menik-ganga/katharagama", apiMatch: ["menik-ganga/katharagama", "katharagama", "kataragama"], name: "Menik Ganga (Kataragama)", station: "Kataragama (Monaragala)", basinGroup: "menik", subTag: "Official Menik Ganga Basin Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/menik-ganga/katharagama", lat: 6.417705, lon: 81.332190, unit: "m", normalLvl: 1.00, alertLvl: 4.00, minorLvl: 4.60, majorLvl: 6.50, maxScale: 8.0, thresholdSource: "official", official: true },
      { id: "nakkala", apiId: "kumbukkan-oya/nakkala", apiMatch: ["kumbukkan-oya/nakkala", "nakkala"], name: "Kumbukkan Oya (Nakkala)", station: "Nakkala (Monaragala)", basinGroup: "kumbukkan", subTag: "Official Kumbukkan Oya Basin Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/kumbukkan-oya/nakkala", lat: 6.895362, lon: 81.297065, unit: "m", normalLvl: 1.20, alertLvl: 5.00, minorLvl: 6.00, majorLvl: 7.50, maxScale: 9.0, thresholdSource: "official", official: true },
      { id: "siyambalanduwa", apiId: "heda-oya/siyambalanduwa", apiMatch: ["heda-oya/siyambalanduwa", "siyambalanduwa"], name: "Heda Oya (Siyambalanduwa)", station: "Siyambalanduwa (Monaragala)", basinGroup: "hedaoya", subTag: "Official Heda Oya Basin Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/heda-oya/siyambalanduwa", lat: 6.905911, lon: 81.545410, unit: "m", normalLvl: 1.10, alertLvl: 4.50, minorLvl: 6.00, majorLvl: 7.00, maxScale: 8.5, thresholdSource: "official", official: true },

      /* =========================================================================
         13. MADURU OYA BASIN (3 Live Gauges: 1 Irrigation Dept + 2 RiverNet.lk)
         ========================================================================= */
      { id: "padiyathalawa", apiId: "maduru-oya/padiyathalawa", apiMatch: ["maduru-oya/padiyathalawa", "padiyathalawa"], name: "Maduru Oya (Padiyathalawa)", station: "Padiyathalawa (Ampara / Badulla)", basinGroup: "maduru", subTag: "Official Irrigation Dept Maduru Oya Gauge", rivernetUrl: "https://sl-water-levels.vercel.app/maduru-oya/padiyathalawa", lat: 7.382251, lon: 81.194637, unit: "m", normalLvl: 1.10, alertLvl: 4.00, minorLvl: 4.50, majorLvl: 6.00, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "vadamunai", rivernetUnitId: "IDS", apiMatch: ["vadamunai"], name: "Maduru Oya (Vadamunai Bridge)", station: "Vadamunai Bridge (Welikanda IDS)", basinGroup: "maduru", subTag: "RiverNet.lk 5-Min Live Sensor • Maduru Oya Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=maduru_oya_basin", lat: 7.938740, lon: 81.257170, unit: "m", normalLvl: 1.80, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "punani", rivernetUnitId: "IDR", apiMatch: ["punani"], name: "Maduru Oya (Punani Anicut)", station: "Punani Anicut (Batticaloa IDR)", basinGroup: "maduru", subTag: "RiverNet.lk 5-Min Live Sensor • Lower Maduru Oya", rivernetUrl: "https://rivernet.lk/batticaloa?basin=maduru_oya_basin", lat: 7.946360, lon: 81.397200, unit: "m", normalLvl: 0.90, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },

      /* =========================================================================
         14. GAL OYA BASIN (4 Live Gauges: 1 Irrigation Dept + 3 RiverNet.lk)
         ========================================================================= */
      { id: "wawinna", rivernetUnitId: "IEG", apiMatch: ["wawinna"], name: "Gal Oya (Wawinna Bridge)", station: "Wawinna Bridge (Inginiyagala IEG)", basinGroup: "galoya", subTag: "RiverNet.lk 5-Min Live Sensor • Upper Gal Oya", rivernetUrl: "https://rivernet.lk/galoya", lat: 7.245000, lon: 81.532000, unit: "m", normalLvl: 1.00, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "waripathanchena", rivernetUnitId: "IEI", apiMatch: ["waripathanchena"], name: "Gal Oya (Waripathanchena Bridge)", station: "Waripathanchena Bridge (Ampara IEI)", basinGroup: "galoya", subTag: "RiverNet.lk 5-Min Live Sensor • Mid-Gal Oya", rivernetUrl: "https://rivernet.lk/galoya", lat: 7.285000, lon: 81.695000, unit: "m", normalLvl: 0.90, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "galoya-bridge", rivernetUnitId: "IEH", apiMatch: ["gal oya bridge"], name: "Gal Oya (Gal Oya Main Bridge)", station: "Gal Oya Bridge (IEH)", basinGroup: "galoya", subTag: "RiverNet.lk Live Sensor • Lower Gal Oya", rivernetUrl: "https://rivernet.lk/galoya", lat: 7.302000, lon: 81.765000, unit: "m", normalLvl: 1.00, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "ampara", apiId: "gal-oya/ampara", apiMatch: ["gal-oya/ampara", "ampara"], name: "Gal Oya (Ampara Irrigation Station)", station: "Ampara", basinGroup: "galoya", subTag: "Official Irrigation Dept Gal Oya Station", rivernetUrl: "https://sl-water-levels.vercel.app/gal-oya/ampara", lat: 7.290711, lon: 81.670343, unit: "m", normalLvl: 1.20, alertLvl: null, minorLvl: null, majorLvl: null, maxScale: 7.5, thresholdSource: "official", official: true },

      /* =========================================================================
         15. BATTICALOA: MUNDENI ARU, ANDELLA OYA & MAGALAWATTUWAN (13 Live Gauges)
         ========================================================================= */
      { id: "pulipanchakal", rivernetUnitId: "IDT", apiMatch: ["pulipanchakal"], name: "Mundeni Aru (Pulipanchakal Bridge)", station: "Pulipanchakal Bridge (Kiran IDT)", basinGroup: "mundeni", subTag: "RiverNet.lk 5-Min Live Sensor • Mundeni Aru Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=mundeni_aru_basin", lat: 7.863400, lon: 81.506300, unit: "m", normalLvl: 1.20, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "rugam", rivernetUnitId: "IFP", apiMatch: ["rugam"], name: "Mundeni Aru (Rugam Tank)", station: "Rugam Tank Spillway (IFP)", basinGroup: "mundeni", subTag: "RiverNet.lk 5-Min Live Sensor • Mundeni Aru Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=mundeni_aru_basin", lat: 7.775000, lon: 81.482000, unit: "m", normalLvl: 2.20, alertLvl: 4.50, minorLvl: 5.00, majorLvl: 5.50, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "lavanai", rivernetUnitId: "IDW", apiMatch: ["lavanai"], name: "Mundeni Aru (Lavanai Aru Bridge)", station: "Lavanai Aru Bridge (Chenkalady IDW)", basinGroup: "mundeni", subTag: "RiverNet.lk 5-Min Live Sensor • Mundeni Aru Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=mundeni_aru_basin", lat: 7.717720, lon: 81.480000, unit: "m", normalLvl: 0.60, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "galodaya", rivernetUnitId: "IDX", apiMatch: ["galodaya"], name: "Mundeni Aru (Galodaya Bridge)", station: "Galodaya Bridge (Maha Oya IDX)", basinGroup: "mundeni", subTag: "RiverNet.lk 5-Min Live Sensor • Upper Mundeni Aru", rivernetUrl: "https://rivernet.lk/batticaloa?basin=mundeni_aru_basin", lat: 7.562190, lon: 81.333120, unit: "m", normalLvl: 0.50, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "mawadiodai", rivernetUnitId: "IFQ", apiMatch: ["mawadiodai"], name: "Mundeni Aru (Mawadiodai Anicut)", station: "Mawadiodai Anicut (IFQ)", basinGroup: "mundeni", subTag: "RiverNet.lk 5-Min Live Sensor • Mundeni Aru Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=mundeni_aru_basin", lat: 7.812000, lon: 81.495000, unit: "m", normalLvl: 0.80, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },

      { id: "navakiri", rivernetUnitId: "IDO", apiMatch: ["navakiri"], name: "Andella Oya (Navakiri Tank)", station: "Navakiri Tank (Vellavely IDO)", basinGroup: "andella", subTag: "RiverNet.lk 5-Min Live Sensor • Andella Oya Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=andella_oya_basin", lat: 7.467200, lon: 81.615510, unit: "m", normalLvl: 3.00, alertLvl: 7.00, minorLvl: 8.00, majorLvl: 9.00, maxScale: 10.0, thresholdSource: "official", official: true },
      { id: "rajagalathenna", rivernetUnitId: "IDQ", apiMatch: ["rajagalathenna"], name: "Andella Oya (Rajagalathenna Bridge)", station: "Rajagalathenna Bridge (IDQ)", basinGroup: "andella", subTag: "RiverNet.lk 5-Min Live Sensor • Andella Oya Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=andella_oya_basin", lat: 7.471360, lon: 81.633040, unit: "m", normalLvl: 1.50, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "maalayarkattu", rivernetUnitId: "IDP", apiMatch: ["maalayarkattu"], name: "Andella Oya (Maalayarkattu Bridge)", station: "Maalayarkattu Bridge (IDP)", basinGroup: "andella", subTag: "RiverNet.lk 5-Min Live Sensor • Lower Andella Oya", rivernetUrl: "https://rivernet.lk/batticaloa?basin=andella_oya_basin", lat: 7.434000, lon: 81.692270, unit: "m", normalLvl: 1.00, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },

      { id: "unnichchai", rivernetUnitId: "IDU", apiMatch: ["unnichchai"], name: "Magalawattuwan Oya (Unnichchai Tank)", station: "Unnichchai Tank (Batticaloa IDU)", basinGroup: "magalawattuwan", subTag: "RiverNet.lk 5-Min Live Sensor • Magalawattuwan Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=magalawattuwan_oya_basin", lat: 7.620110, lon: 81.548990, unit: "m", normalLvl: 3.00, alertLvl: 8.50, minorLvl: 9.80, majorLvl: 11.00, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "mullamunai", rivernetUnitId: "IDV", apiMatch: ["mullamunai"], name: "Magalawattuwan Oya (Mullamunai Bridge)", station: "Mullamunai Bridge (IDV)", basinGroup: "magalawattuwan", subTag: "RiverNet.lk 5-Min Live Sensor • Magalawattuwan Basin", rivernetUrl: "https://rivernet.lk/batticaloa?basin=magalawattuwan_oya_basin", lat: 7.679190, lon: 81.593340, unit: "m", normalLvl: 0.60, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true },
      { id: "kallady", rivernetUnitId: "IFR", apiMatch: ["kallady"], name: "Batticaloa Lagoon (Kallady Bridge)", station: "Kallady Lagoon (Batticaloa IFR)", basinGroup: "magalawattuwan", subTag: "RiverNet.lk 5-Min Live Estuary Sensor", rivernetUrl: "https://rivernet.lk/batticaloa", lat: 7.711500, lon: 81.708500, unit: "m", normalLvl: 0.25, alertLvl: 0.70, minorLvl: 0.85, majorLvl: 0.95, maxScale: 1.2, thresholdSource: "official", official: true },
      { id: "kallaru", rivernetUnitId: "IFS", apiMatch: ["kallaru"], name: "Periya Kallaru Lagoon (Kallaru)", station: "Kallaru Lagoon Outfall (IFS)", basinGroup: "magalawattuwan", subTag: "RiverNet.lk 5-Min Live Estuary Sensor", rivernetUrl: "https://rivernet.lk/batticaloa", lat: 7.456000, lon: 81.812000, unit: "m", normalLvl: 0.20, alertLvl: 0.70, minorLvl: 0.85, majorLvl: 0.95, maxScale: 1.2, thresholdSource: "official", official: true },
      { id: "kaddumurivu", rivernetUnitId: "IFO", apiMatch: ["kaddumurivu"], name: "Mahakarachchi Basin (Kaddumurivu)", station: "Kaddumurivu Tank (Vakarai IFO)", basinGroup: "magalawattuwan", subTag: "RiverNet.lk Live Sensor • Mahakarachchi Basin", rivernetUrl: "https://rivernet.lk/mahakarachchi", lat: 8.112000, lon: 81.365000, unit: "m", normalLvl: 1.20, alertLvl: 4.20, minorLvl: 4.80, majorLvl: 5.40, maxScale: 6.0, thresholdSource: "official", official: true }
    ]
  },

  AU: {
    name: "Australia",
    flag: "🇦🇺",
    agency: "BOM / ARPANSA UV / State SES & RFS",
    sunPriority: "high",
    primaryFocus: "ARPANSA UV Skin Protection, Coastal Swell & Bushfire Danger",
    hotlines: [
      { num: "000", lbl: "Emergency" },
      { num: "132 500", lbl: "SES Flood" },
      { num: "1800 679 737", lbl: "Bushfire" }
    ],
    states: [
      { code: "TAS", name: "Hobart (TAS)", lat: -42.8821, lon: 147.3272 },
      { code: "NSW", name: "Sydney (NSW)", lat: -33.8688, lon: 151.2093 },
      { code: "VIC", name: "Melbourne (VIC)", lat: -37.8136, lon: 144.9631 },
      { code: "QLD", name: "Brisbane (QLD)", lat: -27.4705, lon: 153.0260 },
      { code: "WA", name: "Perth (WA)", lat: -31.9505, lon: 115.8605 }
    ],
    rivers: [
      { id: "au0", name: "River Derwent", station: "New Norfolk (TAS)", basinGroup: "all", subTag: "BOM Southern Tasmania Basin", rivernetUrl: "http://www.bom.gov.au/tas/flood/", lat: -42.7820, lon: 147.0590, unit: "m", normalLvl: 1.4, alertLvl: 3.0, minorLvl: 4.0, majorLvl: 5.5, maxScale: 7.5, thresholdSource: "official", official: true },
      { id: "au1", name: "Hawkesbury-Nepean", station: "Windsor (NSW)", basinGroup: "all", subTag: "BOM Western Sydney Gauge", rivernetUrl: "http://www.bom.gov.au/nsw/flood/", lat: -33.6050, lon: 150.8200, unit: "m", normalLvl: 2.1, alertLvl: 5.8, minorLvl: 7.0, majorLvl: 12.2, maxScale: 15.0, thresholdSource: "official", official: true },
      { id: "au2", name: "Brisbane River", station: "City Gauge (QLD)", basinGroup: "all", subTag: "SEQ Catchment", rivernetUrl: "http://www.bom.gov.au/qld/flood/", lat: -27.4705, lon: 153.0260, unit: "m", normalLvl: 1.2, alertLvl: 2.3, minorLvl: 2.6, majorLvl: 3.5, maxScale: 5.0, thresholdSource: "official", official: true },
      { id: "au3", name: "Yarra River", station: "Heidelberg (VIC)", basinGroup: "all", subTag: "Melbourne Basin", rivernetUrl: "http://www.bom.gov.au/vic/flood/", lat: -37.7550, lon: 145.0700, unit: "m", normalLvl: 1.6, alertLvl: 3.2, minorLvl: 4.1, majorLvl: 5.5, maxScale: 7.0, thresholdSource: "official", official: true }
    ]
  },

  US: {
    name: "United States",
    flag: "🇺🇸",
    agency: "NOAA / NWS / USGS",
    sunPriority: "conditional",
    primaryFocus: "NOAA Severe Storm, Hurricane & USGS Flood Watch",
    hotlines: [
      { num: "911", lbl: "Emergency" },
      { num: "211", lbl: "Shelter" }
    ],
    states: [
      { code: "NY", name: "New York (NY)", lat: 40.7128, lon: -74.0060 },
      { code: "FL", name: "Miami (FL)", lat: 25.7617, lon: -80.1918 },
      { code: "CA", name: "Los Angeles (CA)", lat: 34.0522, lon: -118.2437 }
    ],
    rivers: [
      { id: "us1", name: "Mississippi River", station: "Baton Rouge (LA)", basinGroup: "all", subTag: "USGS Main Gauge", rivernetUrl: "https://water.noaa.gov/", lat: 30.4515, lon: -91.1871, unit: "ft", normalLvl: 17.5, alertLvl: 30.0, minorLvl: 35.0, majorLvl: 43.0, maxScale: 52.0, thresholdSource: "official", official: true },
      { id: "us2", name: "Hudson River", station: "Battery (NY)", basinGroup: "all", subTag: "Tidal Surge Gauge", rivernetUrl: "https://water.noaa.gov/", lat: 40.7006, lon: -74.0142, unit: "ft", normalLvl: 3.1, alertLvl: 6.0, minorLvl: 7.5, majorLvl: 9.5, maxScale: 12.0, thresholdSource: "official", official: true },
      { id: "us3", name: "Potomac River", station: "Little Falls (DC)", basinGroup: "all", subTag: "Mid-Atlantic Basin", rivernetUrl: "https://water.noaa.gov/", lat: 38.9498, lon: -77.1276, unit: "ft", normalLvl: 3.6, alertLvl: 8.0, minorLvl: 10.0, majorLvl: 14.0, maxScale: 18.0, thresholdSource: "official", official: true }
    ]
  },

  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
    agency: "Met Office / Environment Agency",
    sunPriority: "low",
    primaryFocus: "Met Office Wind/Gale, Fog Visibility & Fluvial Flood",
    hotlines: [
      { num: "999", lbl: "Emergency" },
      { num: "0345 988 1188", lbl: "Floodline" }
    ],
    states: [
      { code: "ENG", name: "London (England)", lat: 51.5074, lon: -0.1278 },
      { code: "SCT", name: "Edinburgh (Scotland)", lat: 55.9533, lon: -3.1883 }
    ],
    rivers: [
      { id: "gb1", name: "River Thames", station: "Kingston (London)", basinGroup: "all", subTag: "EA Tidal & Fluvial", rivernetUrl: "https://check-for-flooding.service.gov.uk/", lat: 51.4110, lon: -0.3080, unit: "m", normalLvl: 2.0, alertLvl: 3.8, minorLvl: 4.5, majorLvl: 5.4, maxScale: 6.8, thresholdSource: "official", official: true },
      { id: "gb2", name: "River Severn", station: "Worcester", basinGroup: "all", subTag: "Midlands Basin", rivernetUrl: "https://check-for-flooding.service.gov.uk/", lat: 52.1920, lon: -2.2250, unit: "m", normalLvl: 1.8, alertLvl: 4.0, minorLvl: 4.8, majorLvl: 5.8, maxScale: 7.2, thresholdSource: "official", official: true }
    ]
  },

  JP: {
    name: "Japan",
    flag: "🇯🇵",
    agency: "JMA / MLIT River Bureau",
    sunPriority: "conditional",
    primaryFocus: "JMA Heavy Rain, Typhoon Wind, Seismic & Urban River Surge",
    hotlines: [
      { num: "119", lbl: "Emergency" },
      { num: "110", lbl: "Police" }
    ],
    states: [
      { code: "TYO", name: "Tokyo (Kanto)", lat: 35.6762, lon: 139.6503 },
      { code: "OSA", name: "Osaka (Kansai)", lat: 34.6937, lon: 135.5023 }
    ],
    rivers: [
      { id: "jp1", name: "Arakawa River", station: "Iwabuchi (Tokyo)", basinGroup: "all", subTag: "MLIT Flood Gate", rivernetUrl: "https://www.river.go.jp/", lat: 35.7840, lon: 139.7230, unit: "m", normalLvl: 2.1, alertLvl: 4.1, minorLvl: 5.5, majorLvl: 7.7, maxScale: 10.0, thresholdSource: "official", official: true },
      { id: "jp2", name: "Tone River", station: "Kurihashi", basinGroup: "all", subTag: "Kanto Plain", rivernetUrl: "https://www.river.go.jp/", lat: 36.1400, lon: 139.6980, unit: "m", normalLvl: 2.4, alertLvl: 5.0, minorLvl: 6.8, majorLvl: 8.9, maxScale: 11.5, thresholdSource: "official", official: true }
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
      { code: "DXB", name: "Dubai (UAE)", lat: 25.2048, lon: 55.2708 },
      { code: "SIN", name: "Singapore", lat: 1.3521, lon: 103.8198 },
      { code: "PAR", name: "Paris (France)", lat: 48.8566, lon: 2.3522 },
      { code: "BOM", name: "Mumbai (India)", lat: 19.0760, lon: 72.8777 },
      { code: "YYZ", name: "Toronto (Canada)", lat: 43.6532, lon: -79.3832 }
    ],
    rivers: [
      { id: "gl1", name: "Primary Local Watershed", station: "Satellite GloFAS Cell #1", basinGroup: "all", subTag: "Copernicus Global Flood Awareness", rivernetUrl: "https://www.globalfloods.eu/", lat: 25.2048, lon: 55.2708, unit: "m", normalLvl: 1.8, alertLvl: 3.8, minorLvl: 4.8, majorLvl: 6.2, maxScale: 8.0, thresholdSource: "official", official: true },
      { id: "gl2", name: "Secondary Regional Basin", station: "Downstream Catchment Cell #2", basinGroup: "all", subTag: "Real-Time Runoff Telemetry", rivernetUrl: "https://www.globalfloods.eu/", lat: 25.1000, lon: 55.1500, unit: "m", normalLvl: 1.5, alertLvl: 3.2, minorLvl: 4.1, majorLvl: 5.4, maxScale: 7.0, thresholdSource: "official", official: true },
      { id: "gl3", name: "Urban Flash-Runoff Channel", station: "Metro Storm Drain Index", basinGroup: "all", subTag: "Surface Precipitation Runoff", rivernetUrl: "https://www.globalfloods.eu/", lat: 25.2500, lon: 55.3000, unit: "m", normalLvl: 1.1, alertLvl: 2.5, minorLvl: 3.4, majorLvl: 4.5, maxScale: 6.0, thresholdSource: "official", official: true }
    ]
  }
};

const WMO_CODES = {
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
