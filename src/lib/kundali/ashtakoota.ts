/**
 * Kundali Match — Ashtakoota (Guna Milan) Rule Engine
 * -------------------------------------------------------------
 * Computes the classical 36-point (Ashtakoota) compatibility score between
 * two people from their Moon nakshatra + rashi. Every koota returns its
 * score, max, a plain-language explanation, AND the classical source it
 * derives from — so nothing in the final report is invented.
 *
 * The 8 kootas and their maximum points (total 36):
 *   1. Varna        1   — spiritual/ego compatibility
 *   2. Vashya       2   — mutual attraction / control
 *   3. Tara (Dina)  3   — birth-star fortune / health
 *   4. Yoni         4   — instinctual & physical compatibility
 *   5. Graha Maitri 5   — mental & intellectual friendship
 *   6. Gana         6   — temperament
 *   7. Bhakoot      7   — love, family welfare, prosperity
 *   8. Nadi         8   — health & progeny (genetic)
 */

import { MoonResult } from "./astronomy";
import {
  RASHI_VARNA, VARNA_RANK, RASHI_VASHYA, NAKSHATRA_YONI, YONI_ENEMIES,
  YONI_FRIENDS, RASHI_LORD, PLANET_RELATIONS, NAKSHATRA_GANA, NAKSHATRA_NADI,
} from "./data";

export interface Source {
  text: string; // name of the classical text
  reference: string; // chapter / section
}

export interface KootaResult {
  key: string;
  name: string;
  score: number;
  max: number;
  boy: string; // the boy's attribute (e.g. "Deva")
  girl: string; // the girl's attribute
  explanation: string;
  source: Source;
  isDosha?: boolean; // true if this koota flags a classical dosha (Nadi/Bhakoot)
}

const SRC_BPHS: Source = {
  text: "Brihat Parashara Hora Shastra",
  reference: "Strī-Jātaka Adhyāya (chapter on marriage compatibility)",
};
const SRC_MUHURTA: Source = {
  text: "Muhurta Chintamani (Ramadaivajna)",
  reference: "Vivaha Prakarana — Ashtakoota Milan",
};

// 1. VARNA — 1 point
function varnaKoota(boy: MoonResult, girl: MoonResult): KootaResult {
  const boyVarna = RASHI_VARNA[boy.rashiIndex];
  const girlVarna = RASHI_VARNA[girl.rashiIndex];
  // Rule: full point if boy's varna >= girl's varna; else 0.
  const score = VARNA_RANK[boyVarna] >= VARNA_RANK[girlVarna] ? 1 : 0;
  return {
    key: "varna", name: "Varna", score, max: 1, boy: boyVarna, girl: girlVarna,
    explanation:
      score === 1
        ? `The groom's Varna (${boyVarna}) is equal to or higher than the bride's (${girlVarna}), indicating harmonious spiritual ego. Full point awarded.`
        : `The groom's Varna (${boyVarna}) is lower than the bride's (${girlVarna}). Classically this scores 0, though it is the mildest koota and rarely a deal-breaker.`,
    source: SRC_BPHS,
  };
}

// 2. VASHYA — 2 points
function vashyaKoota(boy: MoonResult, girl: MoonResult): KootaResult {
  const b = RASHI_VASHYA[boy.rashiIndex];
  const g = RASHI_VASHYA[girl.rashiIndex];
  // Same class = 2; specific friendly cross-class combos = 1; else varies.
  let score = 2;
  if (b !== g) {
    // Simplified classical scoring for DOB-only: same group 2, otherwise 1,
    // with Chatushpada–Vanachar (prey/predator) reduced to 0.
    const predatorPrey =
      (b === "Chatushpada" && g === "Vanachar") ||
      (b === "Vanachar" && g === "Chatushpada");
    score = predatorPrey ? 0 : 1;
  }
  return {
    key: "vashya", name: "Vashya", score, max: 2, boy: b, girl: g,
    explanation:
      score === 2
        ? `Both belong to the same Vashya group (${b}), giving natural mutual attraction and balance of control. Full 2 points.`
        : score === 1
        ? `Vashya groups (${b} & ${g}) are compatible but not identical — moderate mutual magnetism. 1 point.`
        : `Vashya groups (${b} & ${g}) form a predator–prey pair, indicating an imbalance of control. 0 points.`,
    source: SRC_MUHURTA,
  };
}

// 3. TARA / DINA — 3 points (based on nakshatra counting)
function taraKoota(boy: MoonResult, girl: MoonResult): KootaResult {
  // Count from one nakshatra to the other, take remainder mod 9.
  const countBG = ((girl.nakshatraIndex - boy.nakshatraIndex + 27) % 27) + 1;
  const countGB = ((boy.nakshatraIndex - girl.nakshatraIndex + 27) % 27) + 1;
  const taraBG = countBG % 9;
  const taraGB = countGB % 9;
  // Inauspicious taras: 3 (Vipat), 5 (Pratyak), 7 (Naidhana) → remainder 3,5,7,0.
  const bad = (t: number) => t === 3 || t === 5 || t === 7 || t === 0;
  const boyOK = !bad(taraBG);
  const girlOK = !bad(taraGB);
  let score = 3;
  if (!boyOK && !girlOK) score = 0;
  else if (!boyOK || !girlOK) score = 1.5;
  return {
    key: "tara", name: "Tara (Dina)", score, max: 3,
    boy: `count ${countBG}`, girl: `count ${countGB}`,
    explanation:
      score === 3
        ? `Both birth-star counts fall in auspicious Taras, indicating good fortune, health and longevity for the couple. Full 3 points.`
        : score === 1.5
        ? `One partner's Tara count is inauspicious while the other's is favourable — partial harmony. 1.5 points.`
        : `Both Tara counts fall in inauspicious groups (Vipat/Pratyak/Naidhana), a classical caution on health/fortune. 0 points.`,
    source: SRC_BPHS,
  };
}

// 4. YONI — 4 points
function yoniKoota(boy: MoonResult, girl: MoonResult): KootaResult {
  const b = NAKSHATRA_YONI[boy.nakshatraIndex];
  const g = NAKSHATRA_YONI[girl.nakshatraIndex];
  let score = 2; // neutral default
  if (b === g) score = 4;
  else if (YONI_FRIENDS[b]?.includes(g)) score = 3;
  else if (YONI_ENEMIES[b]?.includes(g)) score = 0;
  else score = 2;
  return {
    key: "yoni", name: "Yoni", score, max: 4, boy: b, girl: g,
    explanation:
      score === 4
        ? `Both share the same Yoni (${b}), indicating strong instinctual and physical compatibility. Full 4 points.`
        : score === 3
        ? `Yonis (${b} & ${g}) are classically friendly, indicating good physical harmony. 3 points.`
        : score === 0
        ? `Yonis (${b} & ${g}) are classical adversaries, cautioning against instinctual friction. 0 points.`
        : `Yonis (${b} & ${g}) are neutral to each other — steady but not intense physical compatibility. 2 points.`,
    source: SRC_MUHURTA,
  };
}

// 5. GRAHA MAITRI — 5 points
function grahaMaitriKoota(boy: MoonResult, girl: MoonResult): KootaResult {
  const bl = RASHI_LORD[boy.rashiIndex];
  const gl = RASHI_LORD[girl.rashiIndex];
  const rel = (a: string, b: string): "friend" | "enemy" | "neutral" => {
    if (a === b) return "friend";
    if (PLANET_RELATIONS[a]?.friends.includes(b)) return "friend";
    if (PLANET_RELATIONS[a]?.enemies.includes(b)) return "enemy";
    return "neutral";
  };
  const r1 = rel(bl, gl);
  const r2 = rel(gl, bl);
  // Classical scoring grid:
  let score = 0;
  if (r1 === "friend" && r2 === "friend") score = 5;
  else if ((r1 === "friend" && r2 === "neutral") || (r1 === "neutral" && r2 === "friend")) score = 4;
  else if (r1 === "neutral" && r2 === "neutral") score = 3;
  else if ((r1 === "friend" && r2 === "enemy") || (r1 === "enemy" && r2 === "friend")) score = 1;
  else if ((r1 === "neutral" && r2 === "enemy") || (r1 === "enemy" && r2 === "neutral")) score = 0.5;
  else score = 0; // both enemies
  return {
    key: "graha_maitri", name: "Graha Maitri", score, max: 5,
    boy: bl, girl: gl,
    explanation:
      score >= 4
        ? `The Moon-sign lords (${bl} & ${gl}) are mutual friends, indicating strong mental, intellectual and emotional rapport. ${score} of 5 points.`
        : score >= 3
        ? `The Moon-sign lords (${bl} & ${gl}) are neutral to each other — a workable, steady mental connection. ${score} of 5 points.`
        : `The Moon-sign lords (${bl} & ${gl}) share some enmity, cautioning on differing mindsets that need conscious effort. ${score} of 5 points.`,
    source: SRC_BPHS,
  };
}

// 6. GANA — 6 points
function ganaKoota(boy: MoonResult, girl: MoonResult): KootaResult {
  const b = NAKSHATRA_GANA[boy.nakshatraIndex];
  const g = NAKSHATRA_GANA[girl.nakshatraIndex];
  let score = 6;
  if (b === g) score = 6;
  else if (
    (b === "Deva" && g === "Manushya") || (b === "Manushya" && g === "Deva")
  ) score = 5;
  else if (
    (b === "Manushya" && g === "Rakshasa") || (b === "Rakshasa" && g === "Manushya")
  ) score = 0;
  else if (b === "Deva" && g === "Rakshasa") score = 1; // boy Deva, girl Rakshasa: 1
  else if (b === "Rakshasa" && g === "Deva") score = 0; // boy Rakshasa, girl Deva: 0
  return {
    key: "gana", name: "Gana", score, max: 6, boy: b, girl: g,
    explanation:
      score === 6
        ? `Both share the ${b} Gana (temperament), indicating naturally aligned nature and values. Full 6 points.`
        : score === 5
        ? `Ganas (${b} & ${g}) are largely compatible with only mild temperamental differences. 5 points.`
        : `Ganas (${b} & ${g}) differ sharply in temperament — a classical caution requiring mutual understanding. ${score} of 6 points.`,
    source: SRC_MUHURTA,
  };
}

// 7. BHAKOOT — 7 points (rashi distance) — a DOSHA koota
function bhakootKoota(boy: MoonResult, girl: MoonResult): KootaResult {
  const b = boy.rashiIndex;
  const g = girl.rashiIndex;
  const d1 = ((g - b + 12) % 12) + 1; // 1..12 from boy to girl
  const d2 = ((b - g + 12) % 12) + 1;
  const pair = [d1, d2].sort((x, y) => x - y).join("-");
  // Inauspicious (Bhakoot Dosha): 6-8 (Shadashtak), 5-9 (Nav-Pancham), 2-12 (Dwir-Dwadash).
  const doshaPairs = ["6-8", "5-9", "2-12"];
  const isDosha = doshaPairs.includes(pair);
  const score = isDosha ? 0 : 7;
  return {
    key: "bhakoot", name: "Bhakoot", score, max: 7, isDosha,
    boy: `Rashi ${b + 1}`, girl: `Rashi ${g + 1}`,
    explanation: isDosha
      ? `The Moon signs form a ${pair} relationship (Bhakoot Dosha), a classical caution on family welfare, finances and emotional flow. 0 points. Note: this dosha is often cancelled when the sign-lords are friends or identical — a full-chart astrologer should confirm.`
      : `The Moon signs form a mutually supportive ${pair} relationship, favouring love, prosperity and family welfare. Full 7 points.`,
    source: SRC_BPHS,
  };
}

// 8. NADI — 8 points — the most important DOSHA koota
function nadiKoota(boy: MoonResult, girl: MoonResult): KootaResult {
  const b = NAKSHATRA_NADI[boy.nakshatraIndex];
  const g = NAKSHATRA_NADI[girl.nakshatraIndex];
  const isDosha = b === g;
  const score = isDosha ? 0 : 8;
  return {
    key: "nadi", name: "Nadi", score, max: 8, isDosha, boy: b, girl: g,
    explanation: isDosha
      ? `Both share the same Nadi (${b}) — this is Nadi Dosha, the most serious of the eight kootas, classically associated with health and progeny concerns. 0 points. Note: Nadi Dosha is considered cancelled if both share the same Rashi but different nakshatras, or the same nakshatra but different padas — a full-chart review is advised.`
      : `The partners have different Nadis (${b} & ${g}), indicating strong compatibility of constitution and healthy progeny. Full 8 points — the single most important koota.`,
    source: SRC_BPHS,
  };
}

export interface AshtakootaResult {
  kootas: KootaResult[];
  totalScore: number;
  maxScore: 36;
}

export function computeAshtakoota(boy: MoonResult, girl: MoonResult): AshtakootaResult {
  const kootas = [
    varnaKoota(boy, girl),
    vashyaKoota(boy, girl),
    taraKoota(boy, girl),
    yoniKoota(boy, girl),
    grahaMaitriKoota(boy, girl),
    ganaKoota(boy, girl),
    bhakootKoota(boy, girl),
    nadiKoota(boy, girl),
  ];
  const totalScore = kootas.reduce((s, k) => s + k.score, 0);
  return { kootas, totalScore, maxScore: 36 };
}
