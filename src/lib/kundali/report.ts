/**
 * Kundali Match — Report Generator
 * -------------------------------------------------------------
 * Ties the astronomy core and the Ashtakoota engine into a single,
 * fully-sourced compatibility report. No interpretive text is invented:
 * every statement traces to the koota engine's cited output.
 */

import { computeMoonFromDOB, MoonResult, RASHI_ENGLISH } from "./astronomy";
import { computeAshtakoota, AshtakootaResult, Source } from "./ashtakoota";

export interface PersonInput {
  name: string;
  dob: string; // YYYY-MM-DD
}

export interface PersonProfile {
  name: string;
  dob: string;
  nakshatra: string;
  pada: number;
  rashi: string;
  rashiEnglish: string;
  moon: MoonResult;
}

export type VerdictBand = "excellent" | "good" | "acceptable" | "caution" | "not_advised";

export interface MatchReport {
  boy: PersonProfile;
  girl: PersonProfile;
  ashtakoota: AshtakootaResult;
  verdict: {
    band: VerdictBand;
    label: string;
    summary: string;
    percentage: number;
  };
  doshas: {
    nadiDosha: boolean;
    bhakootDosha: boolean;
    notes: string[];
  };
  dataQuality: {
    hasUncertainty: boolean;
    warnings: string[];
  };
  sources: Source[];
  disclaimer: string;
}

function toProfile(name: string, dob: string, moon: MoonResult): PersonProfile {
  return {
    name: name.trim(),
    dob,
    nakshatra: moon.nakshatra,
    pada: moon.pada,
    rashi: moon.rashi,
    rashiEnglish: RASHI_ENGLISH[moon.rashi],
    moon,
  };
}

function verdictFor(score: number, nadiDosha: boolean): MatchReport["verdict"] {
  const percentage = Math.round((score / 36) * 100);
  // Classical bands (Guna Milan):
  //   >= 32  Excellent | 25-31 Good | 18-24 Acceptable | <18 not advised.
  // Nadi Dosha present forces a caution regardless of raw score.
  let band: VerdictBand;
  let label: string;
  let summary: string;

  if (score >= 32) {
    band = "excellent"; label = "Excellent Match";
    summary = `A ${score} out of 36 score falls in the highest classical band. The ancient texts consider such a union highly auspicious.`;
  } else if (score >= 25) {
    band = "good"; label = "Good Match";
    summary = `A ${score} out of 36 score is classically regarded as a good, harmonious match well above the acceptable threshold.`;
  } else if (score >= 18) {
    band = "acceptable"; label = "Acceptable Match";
    summary = `A ${score} out of 36 crosses the classical minimum of 18 that traditional families consider acceptable to proceed.`;
  } else {
    band = "not_advised"; label = "Below Classical Threshold";
    summary = `A ${score} out of 36 falls below the classical minimum of 18 gunas that families traditionally look for before proceeding.`;
  }

  if (nadiDosha && band !== "not_advised") {
    band = "caution"; label = `${label} — with Nadi Dosha`;
    summary += ` However, Nadi Dosha is present, which the texts treat as a serious caution that a full-chart astrologer should review for possible cancellation (parihara).`;
  }

  return { band, label, summary, percentage };
}

export function generateMatchReport(boyIn: PersonInput, girlIn: PersonInput): MatchReport {
  const boyMoon = computeMoonFromDOB(boyIn.dob);
  const girlMoon = computeMoonFromDOB(girlIn.dob);

  const boy = toProfile(boyIn.name, boyIn.dob, boyMoon);
  const girl = toProfile(girlIn.name, girlIn.dob, girlMoon);

  const ashtakoota = computeAshtakoota(boyMoon, girlMoon);

  const nadiKoota = ashtakoota.kootas.find((k) => k.key === "nadi");
  const bhakootKoota = ashtakoota.kootas.find((k) => k.key === "bhakoot");
  const nadiDosha = Boolean(nadiKoota?.isDosha);
  const bhakootDosha = Boolean(bhakootKoota?.isDosha);

  const doshaNotes: string[] = [];
  if (nadiDosha) doshaNotes.push(nadiKoota!.explanation);
  if (bhakootDosha) doshaNotes.push(bhakootKoota!.explanation);
  if (!nadiDosha && !bhakootDosha) {
    doshaNotes.push("No Nadi Dosha or Bhakoot Dosha detected — the two doshas families most commonly check are both clear.");
  }

  const verdict = verdictFor(ashtakoota.totalScore, nadiDosha);

  // Data-quality warnings (the honest DOB-only caveats).
  const warnings: string[] = [];
  const dq = (m: MoonResult, who: string) => {
    if (m.nakshatraUncertain) {
      warnings.push(
        `For ${who}, the Moon changed Nakshatra during the birth date (between ${m.nakshatra} and ${m.alternateNakshatra}). Without birth time we used the noon position; the exact Nakshatra needs the time of birth for certainty.`
      );
    }
    if (m.rashiUncertain) {
      warnings.push(
        `For ${who}, the Moon changed Rashi (Moon sign) during the birth date (between ${m.rashi} and ${m.alternateRashi}). Birth time is needed to be certain.`
      );
    }
  };
  dq(boyMoon, boy.name || "the groom");
  dq(girlMoon, girl.name || "the bride");

  // Collect unique sources.
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const k of ashtakoota.kootas) {
    const id = `${k.source.text}|${k.source.reference}`;
    if (!seen.has(id)) {
      seen.add(id);
      sources.push(k.source);
    }
  }

  return {
    boy,
    girl,
    ashtakoota,
    verdict,
    doshas: { nadiDosha, bhakootDosha, notes: doshaNotes },
    dataQuality: { hasUncertainty: warnings.length > 0, warnings },
    sources,
    disclaimer:
      "This report is generated from classical Vedic astrology (Jyotish) texts and traditional Ashtakoota Guna Milan, computed from the Moon's sidereal position. It is provided for cultural, educational and reflective purposes. It is based on date of birth only; for Mangal Dosha, marriage-timing and full-chart analysis, the exact time and place of birth are required. Astrological compatibility is a matter of tradition and belief, not scientific prediction — please treat it as one input among many in a life decision.",
  };
}
