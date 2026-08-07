/**
 * Kundali Match — Astronomy Core
 * -------------------------------------------------------------
 * Computes the sidereal Moon position for a given date of birth and
 * derives the Nakshatra (lunar mansion) and Rashi (moon sign).
 *
 * This is REAL astronomical math (Meeus/ELP-2000 via the `astronomia`
 * library), converted from the tropical to the SIDEREAL zodiac using the
 * Lahiri (Chitrapaksha) ayanamsa — the standard used in Vedic astrology
 * and by the Government of India's calendar (Rashtriya Panchang).
 *
 * IMPORTANT — DOB-only limitation:
 * The Moon moves ~13.2°/day and crosses a nakshatra boundary (13°20')
 * roughly once per day. Without a birth TIME we compute the Moon at a
 * reference instant and flag when the nakshatra/rashi is uncertain
 * because the Moon changed sign/nakshatra during that day. We never
 * silently guess.
 */

// astronomia has no bundled types; require at runtime.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { moonposition, julian } = require("astronomia");

// The 27 Nakshatras in order (index 0 = Ashwini).
export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
] as const;

// The 12 Rashis (moon signs), index 0 = Mesha (Aries).
export const RASHIS = [
  "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya",
  "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena",
] as const;

export const RASHI_ENGLISH: Record<string, string> = {
  Mesha: "Aries", Vrishabha: "Taurus", Mithuna: "Gemini", Karka: "Cancer",
  Simha: "Leo", Kanya: "Virgo", Tula: "Libra", Vrishchika: "Scorpio",
  Dhanu: "Sagittarius", Makara: "Capricorn", Kumbha: "Aquarius", Meena: "Pisces",
};

const NAKSHATRA_ARC = 360 / 27; // 13.3333° (13°20')
const RASHI_ARC = 30; // degrees

export interface MoonResult {
  siderealLongitude: number; // 0..360
  nakshatraIndex: number; // 0..26
  nakshatra: string;
  pada: 1 | 2 | 3 | 4; // quarter within the nakshatra
  rashiIndex: number; // 0..11
  rashi: string;
  rashiEnglish: string;
  /** true when the nakshatra changed during the birth day → needs birth time */
  nakshatraUncertain: boolean;
  /** true when the rashi changed during the birth day → needs birth time */
  rashiUncertain: boolean;
  /** the alternate nakshatra the Moon was in at the other end of the day */
  alternateNakshatra?: string;
  /** the alternate rashi the Moon was in at the other end of the day */
  alternateRashi?: string;
}

/**
 * Lahiri ayanamsa (degrees) for a given Julian Day.
 * Linear approximation anchored at J2000: ayanamsa(2000-01-01) ≈ 23.853°,
 * precessing ~50.29" per year. Accurate to well within a nakshatra for
 * any modern birth date, which is all DOB-only matching requires.
 */
function lahiriAyanamsa(jd: number): number {
  const J2000 = 2451545.0;
  const yearsFromJ2000 = (jd - J2000) / 365.25;
  const ayanamsaAtJ2000 = 23.853; // degrees
  const precessionPerYear = 50.2909 / 3600; // degrees/year
  return ayanamsaAtJ2000 + yearsFromJ2000 * precessionPerYear;
}

/** Sidereal Moon longitude (0..360) at a given Julian Day (UT). */
function siderealMoonLongitude(jd: number): number {
  const pos = moonposition.position(jd); // { lon, lat, range } in radians
  const tropical = (pos.lon * 180) / Math.PI;
  let sidereal = tropical - lahiriAyanamsa(jd);
  sidereal = ((sidereal % 360) + 360) % 360;
  return sidereal;
}

function nakshatraOf(longitude: number): { index: number; pada: 1 | 2 | 3 | 4 } {
  const index = Math.floor(longitude / NAKSHATRA_ARC) % 27;
  const within = longitude - index * NAKSHATRA_ARC;
  const pada = (Math.floor(within / (NAKSHATRA_ARC / 4)) + 1) as 1 | 2 | 3 | 4;
  return { index, pada };
}

function rashiOf(longitude: number): number {
  return Math.floor(longitude / RASHI_ARC) % 12;
}

/**
 * Compute Moon-based nakshatra & rashi from a date of birth (no time).
 *
 * We evaluate the Moon at local noon (12:00) of the birth date, treated as
 * IST (India Standard Time, UTC+5:30) since the target audience is Indian
 * families. We also sample the start and end of the day to detect whether
 * the nakshatra or rashi changed within the day — if so we flag it as
 * uncertain and expose the alternate value.
 *
 * @param dateISO "YYYY-MM-DD"
 */
export function computeMoonFromDOB(dateISO: string): MoonResult {
  const [y, m, d] = dateISO.split("-").map(Number);
  if (!y || !m || !d) {
    throw new Error(`Invalid date of birth: "${dateISO}" (expected YYYY-MM-DD)`);
  }

  // IST is UTC+5:30. Local noon = 06:30 UT. Local 00:00 = previous 18:30 UT.
  const IST_OFFSET_HOURS = 5.5;
  const localHourToUT = (h: number) => (h - IST_OFFSET_HOURS) / 24; // day fraction

  const jdNoon = julian.CalendarGregorianToJD(y, m, d + 0.5 + localHourToUT(12) - 0.5);
  // Sample local start (00:00) and end (23:59) of the birth day.
  const jdStart = julian.CalendarGregorianToJD(y, m, d) + localHourToUT(0);
  const jdEnd = julian.CalendarGregorianToJD(y, m, d) + localHourToUT(24);

  const lonNoon = siderealMoonLongitude(jdNoon);
  const lonStart = siderealMoonLongitude(jdStart);
  const lonEnd = siderealMoonLongitude(jdEnd);

  const { index: nakIndex, pada } = nakshatraOf(lonNoon);
  const rashiIndex = rashiOf(lonNoon);

  const nakStart = nakshatraOf(lonStart).index;
  const nakEnd = nakshatraOf(lonEnd).index;
  const rashiStart = rashiOf(lonStart);
  const rashiEnd = rashiOf(lonEnd);

  const nakshatraUncertain = nakStart !== nakEnd;
  const rashiUncertain = rashiStart !== rashiEnd;

  const result: MoonResult = {
    siderealLongitude: Number(lonNoon.toFixed(4)),
    nakshatraIndex: nakIndex,
    nakshatra: NAKSHATRAS[nakIndex],
    pada,
    rashiIndex,
    rashi: RASHIS[rashiIndex],
    rashiEnglish: RASHI_ENGLISH[RASHIS[rashiIndex]],
    nakshatraUncertain,
    rashiUncertain,
  };

  if (nakshatraUncertain) {
    const other = nakEnd === nakIndex ? nakStart : nakEnd;
    result.alternateNakshatra = NAKSHATRAS[other];
  }
  if (rashiUncertain) {
    const other = rashiEnd === rashiIndex ? rashiStart : rashiEnd;
    result.alternateRashi = RASHIS[other];
  }

  return result;
}
