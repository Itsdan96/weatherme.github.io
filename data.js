/* ==========================================================================
DATA CONFIGURATION: COUNTRY PROFILES, OFFICIAL GAUGE THRESHOLDS & WMO CODES
Sri Lanka upgraded to 39-station RiverNet registry across 18 basins.
Official stations are verified. Provisional stations are model-assisted and
must be confirmed with Irrigation Department / RiverNet.lk before emergency use.
========================================================================== */

const COUNTRY_PROFILES = {
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
      { code: "SG", name: "Ratnapura (Kalu / We Ganga)", lat: 6.6828, lon: 80.3992 },
      { code: "KL", name: "Kalawana / Millakanda (Kukule)", lat: 6.6280, lon: 80.1720 },
      { code: "WP", name: "Colombo / Nugegoda (Kelani Basin)", lat: 6.8729, lon: 79.8899 },
      { code: "CP", name: "Kandy (Mahaweli Basin)", lat: 7.2906, lon: 80.6337 },
      { code: "SP", name: "Galle / Matara (Nilwala & Gin)", lat: 6.0535, lon: 80.2210 },
      { code: "NE", name: "Nuwara Eliya (Hill Country)", lat: 6.9497, lon: 80.7891 },
      { code: "NW", name: "Kurunegala (Deduru / Maha Oya)", lat: 7.4818, lon: 80.3609 }
    ],
    basins: {
      kalu: "Kalu Ganga Basin",
      kelani: "Kelani Ganga Basin",
      attenagalu: "Attanagalu Oya Basin",
      nilwala: "Nilwala Ganga Basin",
      gin: "Gin Ganga Basin",
      mahaweli: "Mahaweli Ganga Basin",
      mahaoya: "Maha Oya Basin",
      deduru: "Deduru Oya Basin",
      kalaoya: "Kala Oya Basin",
      malwathu: "Malwathu Oya Basin",
      amban: "Amban Ganga Basin",
      menik: "Menik Ganga Basin",
      maduru: "Maduru Oya Basin",
      kotmale: "Kotmale Ganga Basin",
      walawe: "Walawe Ganga Basin",
      kirindi: "Kirindi Oya Basin",
      hurulu: "Hurulu Ganga Basin",
      ruwanveli: "Ruwanveli Ganga Basin"
    },
    rivers: [
      /* =============================== */
      /* OFFICIAL / VERIFIED STATIONS    */
      /* =============================== */
      { id: "ratnapura", apiMatch: ["ratnapura", "rathnapura"], name: "Kalu Ganga (Ratnapura) ⭐", station: "Ratnapura Main Gauge", basinGroup: "kalu", subTag: "Official Irrigation Dept & RiverNet.lk/ratnapura", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.6828, lon: 80.3992, unit: "m", normalLvl: 1.95, alertLvl: 5.20, minorLvl: 7.50, majorLvl: 9.50, maxScale: 11.5, thresholdSource: "official", official: true },
      { id: "ellagawa", apiMatch: ["ellagawa"], name: "Kalu Ganga (Ellagawa) ⭐", station: "Ellagawa (Kiriella / Horana)", basinGroup: "kalu", subTag: "Mid-Basin Kalu Gauge", rivernetUrl: "https://rivernet.lk/_kaluganga-overview/", lat: 6.7310, lon: 80.2150, unit: "m", normalLvl: 5.46, alertLvl: 10.00, minorLvl: 10.70, majorLvl: 12.20, maxScale: 14.5, thresholdSource: "official", official: true },
      { id: "weganga", apiMatch: ["kahawatta", "we ganga", "weganga", "dela"], name: "We Ganga (Kahawatta) ⭐", station: "Kahawatta / Pelmadulla", basinGroup: "kalu", subTag: "Upper Tributary • Joins Kalu Ganga", rivernetUrl: "https://rivernet.lk/ratnapura", lat: 6.5980, lon: 80.5750, unit: "m", normalLvl: 1.45, alertLvl: 3.40, minorLvl: 4.20, majorLvl: 5.50, maxScale: 7.2, thresholdSource: "official", official: true },
      { id: "millakanda", apiMatch: ["millakanda", "kalawellawa"], name: "Kuda Ganga / Kukule (Millakanda) ⭐", station: "Kalawellawa (Millakanda)", basinGroup: "kalu", subTag: "Direct Gauge for Kukule Ganga Spill", rivernetUrl: "https://rivernet.lk/_kaluganga-overview/", lat: 6.6280, lon: 80.1720, unit: "m", normalLvl: 3.26, alertLvl: 5.00, minorLvl: 6.50, majorLvl: 8.00, maxScale: 10.0, thresholdSource: "official", official: true },
      { id: "magura", apiMatch: ["magura"], name: "Maguru Ganga (Magura)", station: "Magura (Baduraliya / Kalawana)", basinGroup: "kalu", subTag: "Kukule / Kuda Ganga Tributary Gauge", rivernetUrl: "https://rivernet.lk/_kaluganga-overview/", lat: 6.5350, lon: 80.2150, unit: "m", normalLvl: 2.69, alertLvl: 4.00, minorLvl: 6.00, majorLvl: 7.50, maxScale: 9.0, thresholdSource: "official", official: true },
      { id: "puttupaula", apiMatch: ["puttupaula", "putupaula"], name: "Kalu Ganga (Puttupaula)", station: "Puttupaula (Kalutara / Dodangoda)", basinGroup: "kalu", subTag: "Lower Kalu Basin Estuary Gauge", rivernetUrl: "https://rivernet.lk/_kaluganga-overview/", lat: 6.6120, lon: 80.0650, unit: "m", normalLvl: 0.61, alertLvl: 3.00, minorLvl: 4.00, majorLvl: 5.00, maxScale: 6.5, thresholdSource: "official", official: true },
      { id: "nagalagam", apiMatch: ["nagalagam"], name: "Kelani Ganga (Nagalagam St)", station: "Nagalagam Street (Colombo)", basinGroup: "kelani", subTag: "Official Colombo Flood Gauge", rivernetUrl: "https://rivernet.lk/kelaniya", lat: 6.9535, lon: 79.8780, unit: "ft", normalLvl: 2.10, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 7.00, maxScale: 9.0, thresholdSource: "official", official: true },
      { id: "hanwella", apiMatch: ["hanwella"], name: "Kelani Ganga (Hanwella)", station: "Hanwella / Seethawaka", basinGroup: "kelani", subTag: "Upper Kelani Flood Gauge", rivernetUrl: "https://rivernet.lk/kelaniya", lat: 6.9090, lon: 80.0820, unit: "m", normalLvl: 2.80, alertLvl: 7.00, minorLvl: 8.00, majorLvl: 10.00, maxScale: 12.5, thresholdSource: "official", official: true },
      { id: "dunamale", apiMatch: ["dunamale"], name: "Attanagalu Oya (Dunamale)", station: "Dunamale (Gampaha)", basinGroup: "attenagalu", subTag: "Attanagalu Oya Basin Gauge", rivernetUrl: "https://rivernet.lk/", lat: 7.1160, lon: 80.0320, unit: "m", normalLvl: 1.65, alertLvl: 3.30, minorLvl: 4.40, majorLvl: 5.50, maxScale: 7.0, thresholdSource: "official", official: true },
      { id: "panadugama", apiMatch: ["panadugama"], name: "Nilwala Ganga (Panadugama)", station: "Panadugama (Akuressa / Matara)", basinGroup: "nilwala", subTag: "Main Nilwala Flood Gauge", rivernetUrl: "https://rivernet.lk/nilwala", lat: 6.0830, lon: 80.5170, unit: "m", normalLvl: 2.75, alertLvl: 5.00, minorLvl: 6.00, majorLvl: 7.50, maxScale: 9.5, thresholdSource: "official", official: true },
      { id: "baddegama", apiMatch: ["baddegama"], name: "Gin Ganga (Baddegama)", station: "Baddegama (Galle)", basinGroup: "gin", subTag: "Main Gin Ganga Flood Gauge", rivernetUrl: "https://rivernet.lk/", lat: 6.1830, lon: 80.1980, unit: "m", normalLvl: 1.85, alertLvl: 3.50, minorLvl: 4.00, majorLvl: 5.00, maxScale: 6.8, thresholdSource: "official", official: true },
      { id: "peradeniya", apiMatch: ["peradeniya", "manampitiya"], name: "Mahaweli Ganga (Peradeniya)", station: "Peradeniya / Kandy", basinGroup: "mahaweli", subTag: "Central Hill Country Mahaweli Gauge", rivernetUrl: "https://rivernet.lk/", lat: 7.2690, lon: 80.5960, unit: "m", normalLvl: 2.30, alertLvl: 5.00, minorLvl: 7.00, majorLvl: 9.00, maxScale: 11.5, thresholdSource: "official", official: true },

      /* =============================== */
      /* PROVISIONAL MODEL-STATION SLOTS */
      /* Replace thresholds with official values when available. */
      /* =============================== */
      { id: "minnipe", apiMatch: ["minnipe"], name: "Kelani Ganga (Minnipe)", station: "Minnipe", basinGroup: "kelani", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.9800, lon: 80.1500, unit: "m", normalLvl: 2.20, alertLvl: 5.50, minorLvl: 6.50, majorLvl: 8.50, maxScale: 11.0, thresholdSource: "provisional", official: false },
      { id: "jaela", apiMatch: ["ja-ela", "jaela"], name: "Attanagalu Oya (Ja-Ela)", station: "Ja-Ela", basinGroup: "attenagalu", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.1200, lon: 79.9950, unit: "m", normalLvl: 1.40, alertLvl: 3.00, minorLvl: 3.80, majorLvl: 5.00, maxScale: 6.5, thresholdSource: "provisional", official: false },
      { id: "kamburugamuwa", apiMatch: ["kamburugamuwa"], name: "Nilwala Ganga (Kamburugamuwa)", station: "Kamburugamuwa", basinGroup: "nilwala", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.0000, lon: 80.6400, unit: "m", normalLvl: 2.00, alertLvl: 4.50, minorLvl: 5.50, majorLvl: 7.00, maxScale: 9.0, thresholdSource: "provisional", official: false },
      { id: "ambalangoda", apiMatch: ["ambalangoda"], name: "Gin Ganga (Ambalangoda)", station: "Ambalangoda", basinGroup: "gin", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.2000, lon: 80.1000, unit: "m", normalLvl: 1.50, alertLvl: 3.20, minorLvl: 4.00, majorLvl: 5.20, maxScale: 7.0, thresholdSource: "provisional", official: false },
      { id: "polgolla", apiMatch: ["polgolla"], name: "Mahaweli Ganga (Polgolla)", station: "Polgolla (Kandy)", basinGroup: "mahaweli", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.3167, lon: 80.6167, unit: "m", normalLvl: 2.40, alertLvl: 5.00, minorLvl: 6.50, majorLvl: 8.50, maxScale: 11.0, thresholdSource: "provisional", official: false },
      { id: "manampitiya", apiMatch: ["manampitiya"], name: "Mahaweli Ganga (Manampitiya)", station: "Manampitiya", basinGroup: "mahaweli", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.8830, lon: 80.8000, unit: "m", normalLvl: 2.80, alertLvl: 5.50, minorLvl: 7.00, majorLvl: 9.00, maxScale: 12.0, thresholdSource: "provisional", official: false },
      { id: "victoria", apiMatch: ["victoria"], name: "Mahaweli Ganga (Victoria)", station: "Victoria Reservoir / Randeniya", basinGroup: "mahaweli", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.0010, lon: 80.9990, unit: "m", normalLvl: 3.00, alertLvl: 6.00, minorLvl: 7.50, majorLvl: 9.50, maxScale: 12.0, thresholdSource: "provisional", official: false },
      { id: "rantembe", apiMatch: ["rantembe"], name: "Mahaweli Ganga (Rantembe)", station: "Rantembe", basinGroup: "mahaweli", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.2330, lon: 80.9830, unit: "m", normalLvl: 2.20, alertLvl: 5.00, minorLvl: 6.50, majorLvl: 8.50, maxScale: 11.0, thresholdSource: "provisional", official: false },
      { id: "mawanella", apiMatch: ["mawanella"], name: "Maha Oya (Mawanella)", station: "Mawanella", basinGroup: "mahaoya", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.1330, lon: 80.6330, unit: "m", normalLvl: 1.80, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 6.50, maxScale: 8.5, thresholdSource: "provisional", official: false },
      { id: "kurunegala-mahaoya", apiMatch: ["kurunegala", "maha oya"], name: "Maha Oya (Kurunegala)", station: "Kurunegala", basinGroup: "mahaoya", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.4870, lon: 80.3630, unit: "m", normalLvl: 1.60, alertLvl: 3.80, minorLvl: 4.80, majorLvl: 6.20, maxScale: 8.0, thresholdSource: "provisional", official: false },
      { id: "nikaweratiya", apiMatch: ["nikaweratiya"], name: "Deduru Oya (Nikaweratiya)", station: "Nikaweratiya", basinGroup: "deduru", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.5660, lon: 80.2830, unit: "m", normalLvl: 1.50, alertLvl: 3.50, minorLvl: 4.50, majorLvl: 5.80, maxScale: 7.5, thresholdSource: "provisional", official: false },
      { id: "wirata", apiMatch: ["wirata"], name: "Deduru Oya (Wirata)", station: "Wirata", basinGroup: "deduru", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.8330, lon: 80.4160, unit: "m", normalLvl: 1.40, alertLvl: 3.20, minorLvl: 4.00, majorLvl: 5.20, maxScale: 6.8, thresholdSource: "provisional", official: false },
      { id: "anuradhapura", apiMatch: ["anuradhapura", "kala oya"], name: "Kala Oya (Anuradhapura)", station: "Anuradhapura", basinGroup: "kalaoya", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 8.3110, lon: 80.4030, unit: "m", normalLvl: 2.00, alertLvl: 4.50, minorLvl: 5.50, majorLvl: 7.00, maxScale: 9.0, thresholdSource: "provisional", official: false },
      { id: "palugaswewa", apiMatch: ["palugaswewa"], name: "Kala Oya (Palugaswewa)", station: "Palugaswewa", basinGroup: "kalaoya", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 8.2500, lon: 80.5500, unit: "m", normalLvl: 1.80, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 6.50, maxScale: 8.5, thresholdSource: "provisional", official: false },
      { id: "vavuniya", apiMatch: ["vavuniya", "malwathu"], name: "Malwathu Oya (Vavuniya)", station: "Vavuniya", basinGroup: "malwathu", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 8.7500, lon: 80.5000, unit: "m", normalLvl: 1.50, alertLvl: 3.50, minorLvl: 4.50, majorLvl: 5.80, maxScale: 7.5, thresholdSource: "provisional", official: false },
      { id: "murunkan", apiMatch: ["murunkan"], name: "Malwathu Oya (Murunkan)", station: "Murunkan", basinGroup: "malwathu", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 8.8300, lon: 80.7200, unit: "m", normalLvl: 1.40, alertLvl: 3.20, minorLvl: 4.00, majorLvl: 5.20, maxScale: 6.8, thresholdSource: "provisional", official: false },
      { id: "trincomalee", apiMatch: ["trincomalee", "amban"], name: "Amban Ganga (Trincomalee)", station: "Trincomalee", basinGroup: "amban", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 8.5870, lon: 81.2150, unit: "m", normalLvl: 1.80, alertLvl: 4.00, minorLvl: 5.00, majorLvl: 6.50, maxScale: 8.5, thresholdSource: "provisional", official: false },
      { id: "kantalai", apiMatch: ["kantalai"], name: "Amban Ganga (Kantalai)", station: "Kantalai", basinGroup: "amban", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 8.6500, lon: 81.1000, unit: "m", normalLvl: 1.60, alertLvl: 3.60, minorLvl: 4.50, majorLvl: 5.80, maxScale: 7.5, thresholdSource: "provisional", official: false },
      { id: "badulla", apiMatch: ["badulla", "menik"], name: "Menik Ganga (Badulla)", station: "Badulla", basinGroup: "menik", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.9890, lon: 81.0550, unit: "m", normalLvl: 1.50, alertLvl: 3.50, minorLvl: 4.30, majorLvl: 5.50, maxScale: 7.2, thresholdSource: "provisional", official: false },
      { id: "bandarawela", apiMatch: ["bandarawela"], name: "Menik Ganga (Bandarawela)", station: "Bandarawela", basinGroup: "menik", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.8000, lon: 80.9800, unit: "m", normalLvl: 1.40, alertLvl: 3.20, minorLvl: 4.00, majorLvl: 5.20, maxScale: 6.8, thresholdSource: "provisional", official: false },
      { id: "medirigiriya", apiMatch: ["medirigiriya", "maduru"], name: "Maduru Oya (Medirigiriya)", station: "Medirigiriya", basinGroup: "maduru", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 8.1800, lon: 81.0300, unit: "m", normalLvl: 1.70, alertLvl: 3.80, minorLvl: 4.80, majorLvl: 6.00, maxScale: 8.0, thresholdSource: "provisional", official: false },
      { id: "kotmale", apiMatch: ["kotmale"], name: "Kotmale Ganga (Kotmale)", station: "Kotmale", basinGroup: "kotmale", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.9300, lon: 80.7000, unit: "m", normalLvl: 2.00, alertLvl: 4.50, minorLvl: 5.50, majorLvl: 7.00, maxScale: 9.0, thresholdSource: "provisional", official: false },
      { id: "polonnaruwa", apiMatch: ["polonnaruwa", "ruwanveli"], name: "Ruwanveli Ganga (Polonnaruwa)", station: "Polonnaruwa", basinGroup: "ruwanveli", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 7.9400, lon: 81.0000, unit: "m", normalLvl: 2.20, alertLvl: 4.80, minorLvl: 6.00, majorLvl: 7.80, maxScale: 10.0, thresholdSource: "provisional", official: false },
      { id: "beliatta", apiMatch: ["beliatta", "walawe"], name: "Walawe Ganga (Beliatta)", station: "Beliatta", basinGroup: "walawe", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.2000, lon: 81.0000, unit: "m", normalLvl: 1.60, alertLvl: 3.60, minorLvl: 4.50, majorLvl: 5.80, maxScale: 7.5, thresholdSource: "provisional", official: false },
      { id: "hambantota", apiMatch: ["hambantota"], name: "Walawe Ganga (Hambantota)", station: "Hambantota", basinGroup: "walawe", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.1200, lon: 81.1200, unit: "m", normalLvl: 1.40, alertLvl: 3.20, minorLvl: 4.00, majorLvl: 5.20, maxScale: 6.8, thresholdSource: "provisional", official: false },
      { id: "belihuloya", apiMatch: ["belihuloya", "kirindi"], name: "Kirindi Oya (Belihuloya)", station: "Belihuloya", basinGroup: "kirindi", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 6.8500, lon: 80.7800, unit: "m", normalLvl: 1.50, alertLvl: 3.40, minorLvl: 4.20, majorLvl: 5.50, maxScale: 7.2, thresholdSource: "provisional", official: false },
      { id: "hingurakgoda", apiMatch: ["hingurakgoda", "hurulu"], name: "Hurulu Ganga (Hingurakgoda)", station: "Hingurakgoda", basinGroup: "hurulu", subTag: "Provisional threshold — verify with Irrigation Dept", rivernetUrl: "https://rivernet.lk/", lat: 8.0300, lon: 81.0400, unit: "m", normalLvl: 1.70, alertLvl: 3.80, minorLvl: 4.80, majorLvl: 6.20, maxScale: 8.0, thresholdSource: "provisional", official: false }
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
    flag: "🇬",
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
/* ==========================================================================
   SRI LANKA 39-STATION RIVERNET SMART EXPANSION
   Paste this at the bottom of data.js
   ========================================================================== */

(function () {
  if (typeof COUNTRY_PROFILES === "undefined" || !COUNTRY_PROFILES.LK) return;

  const lk = COUNTRY_PROFILES.LK;

  lk.basins = {
    kalu: "Kalu Ganga Basin",
    kelani: "Kelani Ganga Basin",
    attenagalu: "Attanagalu Oya Basin",
    nilwala: "Nilwala Ganga Basin",
    gin: "Gin Ganga Basin",
    mahaweli: "Mahaweli Ganga Basin",
    mahaoya: "Maha Oya Basin",
    deduru: "Deduru Oya Basin",
    kalaoya: "Kala Oya Basin",
    malwathu: "Malwathu Oya Basin",
    amban: "Amban Ganga Basin",
    menik: "Menik Ganga Basin",
    maduru: "Maduru Oya Basin",
    kotmale: "Kotmale Ganga Basin",
    walawe: "Walawe Ganga Basin",
    kirindi: "Kirindi Oya Basin",
    hurulu: "Hurulu Ganga Basin",
    ruwanveli: "Ruwanveli Ganga Basin"
  };

  // Fix old basin grouping in existing 12 stations
  const basinFix = {
    panadugama: "nilwala",
    baddegama: "gin",
    peradeniya: "mahaweli",
    dunamale: "attenagalu"
  };

  lk.rivers.forEach((r) => {
    if (basinFix[r.id]) r.basinGroup = basinFix[r.id];
    if (!r.thresholdSource) r.thresholdSource = "official";
    if (r.official === undefined) r.official = true;
  });

  // Add 27 provisional/model-assisted stations to make total 39
  const extraStations = [
    {
      id: "minnipe",
      apiMatch: ["minnipe"],
      name: "Kelani Ganga (Minnipe)",
      station: "Minnipe",
      basinGroup: "kelani",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.9800,
      lon: 80.1500,
      unit: "m",
      normalLvl: 2.20,
      alertLvl: 5.50,
      minorLvl: 6.50,
      majorLvl: 8.50,
      maxScale: 11.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "jaela",
      apiMatch: ["ja-ela", "jaela"],
      name: "Attanagalu Oya (Ja-Ela)",
      station: "Ja-Ela",
      basinGroup: "attenagalu",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.1200,
      lon: 79.9950,
      unit: "m",
      normalLvl: 1.40,
      alertLvl: 3.00,
      minorLvl: 3.80,
      majorLvl: 5.00,
      maxScale: 6.5,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "kamburugamuwa",
      apiMatch: ["kamburugamuwa"],
      name: "Nilwala Ganga (Kamburugamuwa)",
      station: "Kamburugamuwa",
      basinGroup: "nilwala",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.0000,
      lon: 80.6400,
      unit: "m",
      normalLvl: 2.00,
      alertLvl: 4.50,
      minorLvl: 5.50,
      majorLvl: 7.00,
      maxScale: 9.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "ambalangoda",
      apiMatch: ["ambalangoda"],
      name: "Gin Ganga (Ambalangoda)",
      station: "Ambalangoda",
      basinGroup: "gin",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.2000,
      lon: 80.1000,
      unit: "m",
      normalLvl: 1.50,
      alertLvl: 3.20,
      minorLvl: 4.00,
      majorLvl: 5.20,
      maxScale: 7.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "polgolla",
      apiMatch: ["polgolla"],
      name: "Mahaweli Ganga (Polgolla)",
      station: "Polgolla (Kandy)",
      basinGroup: "mahaweli",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.3167,
      lon: 80.6167,
      unit: "m",
      normalLvl: 2.40,
      alertLvl: 5.00,
      minorLvl: 6.50,
      majorLvl: 8.50,
      maxScale: 11.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "manampitiya",
      apiMatch: ["manampitiya"],
      name: "Mahaweli Ganga (Manampitiya)",
      station: "Manampitiya",
      basinGroup: "mahaweli",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.8830,
      lon: 80.8000,
      unit: "m",
      normalLvl: 2.80,
      alertLvl: 5.50,
      minorLvl: 7.00,
      majorLvl: 9.00,
      maxScale: 12.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "victoria",
      apiMatch: ["victoria"],
      name: "Mahaweli Ganga (Victoria)",
      station: "Victoria Reservoir / Randeniya",
      basinGroup: "mahaweli",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.0010,
      lon: 80.9990,
      unit: "m",
      normalLvl: 3.00,
      alertLvl: 6.00,
      minorLvl: 7.50,
      majorLvl: 9.50,
      maxScale: 12.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "rantembe",
      apiMatch: ["rantembe"],
      name: "Mahaweli Ganga (Rantembe)",
      station: "Rantembe",
      basinGroup: "mahaweli",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.2330,
      lon: 80.9830,
      unit: "m",
      normalLvl: 2.20,
      alertLvl: 5.00,
      minorLvl: 6.50,
      majorLvl: 8.50,
      maxScale: 11.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "mawanella",
      apiMatch: ["mawanella"],
      name: "Maha Oya (Mawanella)",
      station: "Mawanella",
      basinGroup: "mahaoya",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.1330,
      lon: 80.6330,
      unit: "m",
      normalLvl: 1.80,
      alertLvl: 4.00,
      minorLvl: 5.00,
      majorLvl: 6.50,
      maxScale: 8.5,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "kurunegala-mahaoya",
      apiMatch: ["kurunegala", "maha oya"],
      name: "Maha Oya (Kurunegala)",
      station: "Kurunegala",
      basinGroup: "mahaoya",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.4870,
      lon: 80.3630,
      unit: "m",
      normalLvl: 1.60,
      alertLvl: 3.80,
      minorLvl: 4.80,
      majorLvl: 6.20,
      maxScale: 8.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "nikaweratiya",
      apiMatch: ["nikaweratiya"],
      name: "Deduru Oya (Nikaweratiya)",
      station: "Nikaweratiya",
      basinGroup: "deduru",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.5660,
      lon: 80.2830,
      unit: "m",
      normalLvl: 1.50,
      alertLvl: 3.50,
      minorLvl: 4.50,
      majorLvl: 5.80,
      maxScale: 7.5,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "wirata",
      apiMatch: ["wirata"],
      name: "Deduru Oya (Wirata)",
      station: "Wirata",
      basinGroup: "deduru",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.8330,
      lon: 80.4160,
      unit: "m",
      normalLvl: 1.40,
      alertLvl: 3.20,
      minorLvl: 4.00,
      majorLvl: 5.20,
      maxScale: 6.8,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "anuradhapura",
      apiMatch: ["anuradhapura", "kala oya"],
      name: "Kala Oya (Anuradhapura)",
      station: "Anuradhapura",
      basinGroup: "kalaoya",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 8.3110,
      lon: 80.4030,
      unit: "m",
      normalLvl: 2.00,
      alertLvl: 4.50,
      minorLvl: 5.50,
      majorLvl: 7.00,
      maxScale: 9.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "palugaswewa",
      apiMatch: ["palugaswewa"],
      name: "Kala Oya (Palugaswewa)",
      station: "Palugaswewa",
      basinGroup: "kalaoya",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 8.2500,
      lon: 80.5500,
      unit: "m",
      normalLvl: 1.80,
      alertLvl: 4.00,
      minorLvl: 5.00,
      majorLvl: 6.50,
      maxScale: 8.5,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "vavuniya",
      apiMatch: ["vavuniya", "malwathu"],
      name: "Malwathu Oya (Vavuniya)",
      station: "Vavuniya",
      basinGroup: "malwathu",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 8.7500,
      lon: 80.5000,
      unit: "m",
      normalLvl: 1.50,
      alertLvl: 3.50,
      minorLvl: 4.50,
      majorLvl: 5.80,
      maxScale: 7.5,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "murunkan",
      apiMatch: ["murunkan"],
      name: "Malwathu Oya (Murunkan)",
      station: "Murunkan",
      basinGroup: "malwathu",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 8.8300,
      lon: 80.7200,
      unit: "m",
      normalLvl: 1.40,
      alertLvl: 3.20,
      minorLvl: 4.00,
      majorLvl: 5.20,
      maxScale: 6.8,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "trincomalee",
      apiMatch: ["trincomalee", "amban"],
      name: "Amban Ganga (Trincomalee)",
      station: "Trincomalee",
      basinGroup: "amban",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 8.5870,
      lon: 81.2150,
      unit: "m",
      normalLvl: 1.80,
      alertLvl: 4.00,
      minorLvl: 5.00,
      majorLvl: 6.50,
      maxScale: 8.5,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "kantalai",
      apiMatch: ["kantalai"],
      name: "Amban Ganga (Kantalai)",
      station: "Kantalai",
      basinGroup: "amban",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 8.6500,
      lon: 81.1000,
      unit: "m",
      normalLvl: 1.60,
      alertLvl: 3.60,
      minorLvl: 4.50,
      majorLvl: 5.80,
      maxScale: 7.5,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "badulla",
      apiMatch: ["badulla", "menik"],
      name: "Menik Ganga (Badulla)",
      station: "Badulla",
      basinGroup: "menik",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.9890,
      lon: 81.0550,
      unit: "m",
      normalLvl: 1.50,
      alertLvl: 3.50,
      minorLvl: 4.30,
      majorLvl: 5.50,
      maxScale: 7.2,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "bandarawela",
      apiMatch: ["bandarawela"],
      name: "Menik Ganga (Bandarawela)",
      station: "Bandarawela",
      basinGroup: "menik",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.8000,
      lon: 80.9800,
      unit: "m",
      normalLvl: 1.40,
      alertLvl: 3.20,
      minorLvl: 4.00,
      majorLvl: 5.20,
      maxScale: 6.8,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "medirigiriya",
      apiMatch: ["medirigiriya", "maduru"],
      name: "Maduru Oya (Medirigiriya)",
      station: "Medirigiriya",
      basinGroup: "maduru",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 8.1800,
      lon: 81.0300,
      unit: "m",
      normalLvl: 1.70,
      alertLvl: 3.80,
      minorLvl: 4.80,
      majorLvl: 6.00,
      maxScale: 8.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "kotmale",
      apiMatch: ["kotmale"],
      name: "Kotmale Ganga (Kotmale)",
      station: "Kotmale",
      basinGroup: "kotmale",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.9300,
      lon: 80.7000,
      unit: "m",
      normalLvl: 2.00,
      alertLvl: 4.50,
      minorLvl: 5.50,
      majorLvl: 7.00,
      maxScale: 9.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "polonnaruwa",
      apiMatch: ["polonnaruwa", "ruwanveli"],
      name: "Ruwanveli Ganga (Polonnaruwa)",
      station: "Polonnaruwa",
      basinGroup: "ruwanveli",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 7.9400,
      lon: 81.0000,
      unit: "m",
      normalLvl: 2.20,
      alertLvl: 4.80,
      minorLvl: 6.00,
      majorLvl: 7.80,
      maxScale: 10.0,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "beliatta",
      apiMatch: ["beliatta", "walawe"],
      name: "Walawe Ganga (Beliatta)",
      station: "Beliatta",
      basinGroup: "walawe",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.2000,
      lon: 81.0000,
      unit: "m",
      normalLvl: 1.60,
      alertLvl: 3.60,
      minorLvl: 4.50,
      majorLvl: 5.80,
      maxScale: 7.5,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "hambantota",
      apiMatch: ["hambantota"],
      name: "Walawe Ganga (Hambantota)",
      station: "Hambantota",
      basinGroup: "walawe",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.1200,
      lon: 81.1200,
      unit: "m",
      normalLvl: 1.40,
      alertLvl: 3.20,
      minorLvl: 4.00,
      majorLvl: 5.20,
      maxScale: 6.8,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "belihuloya",
      apiMatch: ["belihuloya", "kirindi"],
      name: "Kirindi Oya (Belihuloya)",
      station: "Belihuloya",
      basinGroup: "kirindi",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 6.8500,
      lon: 80.7800,
      unit: "m",
      normalLvl: 1.50,
      alertLvl: 3.40,
      minorLvl: 4.20,
      majorLvl: 5.50,
      maxScale: 7.2,
      thresholdSource: "provisional",
      official: false
    },
    {
      id: "hingurakgoda",
      apiMatch: ["hingurakgoda", "hurulu"],
      name: "Hurulu Ganga (Hingurakgoda)",
      station: "Hingurakgoda",
      basinGroup: "hurulu",
      subTag: "Provisional threshold — verify with Irrigation Dept",
      rivernetUrl: "https://rivernet.lk/",
      lat: 8.0300,
      lon: 81.0400,
      unit: "m",
      normalLvl: 1.70,
      alertLvl: 3.80,
      minorLvl: 4.80,
      majorLvl: 6.20,
      maxScale: 8.0,
      thresholdSource: "provisional",
      official: false
    }
  ];

  const existingIds = new Set(lk.rivers.map((r) => r.id));

  extraStations.forEach((station) => {
    if (!existingIds.has(station.id)) {
      lk.rivers.push(station);
    }
  });
})();
