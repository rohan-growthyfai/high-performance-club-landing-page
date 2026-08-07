/**
 * Kundali Match — Classical reference data
 * -------------------------------------------------------------
 * All tables below are drawn from classical Jyotish texts, primarily:
 *   - Brihat Parashara Hora Shastra (BPHS), Ch. on Strī-Jātaka / Vivaha
 *   - Muhurta Chintamani (Ramadaivajna), Vivaha Prakarana
 *   - Jataka Parijata, Prashna Marga
 *
 * Each koota below carries its source in the engine (see ashtakoota.ts).
 * These arrays are indexed by nakshatra index 0..26 (Ashwini..Revati)
 * or rashi index 0..11 (Mesha..Meena) to match astronomy.ts.
 */

// ---- Varna (caste/spiritual class), by RASHI ----
// Brahmin > Kshatriya > Vaishya > Shudra (spiritual order for this koota).
// Mapping per BPHS: water signs=Brahmin, fire=Kshatriya, earth=Vaishya, air=Shudra.
export const RASHI_VARNA: Record<number, "Brahmin" | "Kshatriya" | "Vaishya" | "Shudra"> = {
  3: "Brahmin", 7: "Brahmin", 11: "Brahmin", // Karka, Vrishchika, Meena (water)
  0: "Kshatriya", 4: "Kshatriya", 8: "Kshatriya", // Mesha, Simha, Dhanu (fire)
  1: "Vaishya", 5: "Vaishya", 9: "Vaishya", // Vrishabha, Kanya, Makara (earth)
  2: "Shudra", 6: "Shudra", 10: "Shudra", // Mithuna, Tula, Kumbha (air)
};
export const VARNA_RANK: Record<string, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };

// ---- Vashya (dominance/magnetism), by RASHI ----
// Classes: Chatushpada (quadruped), Manav (human), Jalachar (aquatic),
// Vanachar (wild), Keeta (insect).
export const RASHI_VASHYA: Record<number, string> = {
  0: "Chatushpada", // Mesha
  1: "Chatushpada", // Vrishabha
  2: "Manav", // Mithuna
  3: "Jalachar", // Karka
  4: "Vanachar", // Simha
  5: "Manav", // Kanya
  6: "Manav", // Tula
  7: "Keeta", // Vrishchika
  8: "Manav", // Dhanu (first half human) — simplified to Manav for DOB-only
  9: "Jalachar", // Makara (aquatic/quadruped) — simplified
  10: "Manav", // Kumbha
  11: "Jalachar", // Meena
};

// ---- Tara / Dina (birth-star fortune) uses nakshatra counting (see engine). ----

// ---- Yoni (sexual/instinctual compatibility), animal per NAKSHATRA ----
export const NAKSHATRA_YONI: Record<number, string> = {
  0: "Horse", 1: "Elephant", 2: "Sheep", 3: "Serpent", 4: "Serpent", 5: "Dog",
  6: "Cat", 7: "Sheep", 8: "Cat", 9: "Rat", 10: "Rat", 11: "Cow",
  12: "Buffalo", 13: "Tiger", 14: "Buffalo", 15: "Tiger", 16: "Deer", 17: "Deer",
  18: "Dog", 19: "Monkey", 20: "Mongoose", 21: "Monkey", 22: "Lion", 23: "Horse",
  24: "Lion", 25: "Cow", 26: "Elephant",
};

// Yoni compatibility matrix (points out of 4). Symmetric.
// 4 = same yoni, 3 = friendly, 2 = neutral, 1 = enemy-ish, 0 = mortal enemy.
// Condensed from the classical Yoni Koota table (Muhurta Chintamani).
export const YONI_ANIMALS = [
  "Horse", "Elephant", "Sheep", "Serpent", "Dog", "Cat", "Rat", "Cow",
  "Buffalo", "Tiger", "Deer", "Monkey", "Mongoose", "Lion",
];
// Pairs that are mortal enemies (0 points):
export const YONI_ENEMIES: Record<string, string[]> = {
  Horse: ["Buffalo"], Buffalo: ["Horse"],
  Elephant: ["Lion"], Lion: ["Elephant"],
  Sheep: ["Monkey"], Monkey: ["Sheep"],
  Serpent: ["Mongoose"], Mongoose: ["Serpent"],
  Dog: ["Deer"], Deer: ["Dog"],
  Cat: ["Rat"], Rat: ["Cat"],
  Cow: ["Tiger"], Tiger: ["Cow"],
};
// Pairs that are friendly (3 points):
export const YONI_FRIENDS: Record<string, string[]> = {
  Horse: ["Sheep"], Sheep: ["Horse"],
  Elephant: ["Cow"], Cow: ["Elephant"],
  Serpent: ["Cat"], Cat: ["Serpent"],
  Dog: ["Monkey"], Monkey: ["Dog"],
  Tiger: ["Deer"], Deer: ["Tiger"],
  Lion: ["Buffalo"], Buffalo: ["Lion"],
};

// ---- Graha Maitri (planetary friendship) — lord of each RASHI ----
export const RASHI_LORD: Record<number, string> = {
  0: "Mars", 1: "Venus", 2: "Mercury", 3: "Moon", 4: "Sun", 5: "Mercury",
  6: "Venus", 7: "Mars", 8: "Jupiter", 9: "Saturn", 10: "Saturn", 11: "Jupiter",
};
// Natural friendship (Naisargika Maitri) per BPHS.
// friends / neutral / enemies for each planet.
export const PLANET_RELATIONS: Record<string, { friends: string[]; enemies: string[] }> = {
  Sun: { friends: ["Moon", "Mars", "Jupiter"], enemies: ["Venus", "Saturn"] },
  Moon: { friends: ["Sun", "Mercury"], enemies: [] },
  Mars: { friends: ["Sun", "Moon", "Jupiter"], enemies: ["Mercury"] },
  Mercury: { friends: ["Sun", "Venus"], enemies: ["Moon"] },
  Jupiter: { friends: ["Sun", "Moon", "Mars"], enemies: ["Mercury", "Venus"] },
  Venus: { friends: ["Mercury", "Saturn"], enemies: ["Sun", "Moon"] },
  Saturn: { friends: ["Mercury", "Venus"], enemies: ["Sun", "Moon", "Mars"] },
};

// ---- Gana (temperament), by NAKSHATRA ----
// Deva (divine), Manushya (human), Rakshasa (demonic).
export const NAKSHATRA_GANA: Record<number, "Deva" | "Manushya" | "Rakshasa"> = {
  0: "Deva", 1: "Manushya", 2: "Rakshasa", 3: "Manushya", 4: "Deva", 5: "Manushya",
  6: "Deva", 7: "Deva", 8: "Rakshasa", 9: "Rakshasa", 10: "Manushya", 11: "Manushya",
  12: "Deva", 13: "Rakshasa", 14: "Deva", 15: "Rakshasa", 16: "Deva", 17: "Rakshasa",
  18: "Rakshasa", 19: "Manushya", 20: "Manushya", 21: "Deva", 22: "Rakshasa", 23: "Rakshasa",
  24: "Manushya", 25: "Manushya", 26: "Deva",
};

// ---- Nadi (constitution / genetic-health koota), by NAKSHATRA ----
// Aadi (Vata), Madhya (Pitta), Antya (Kapha). Same Nadi = Nadi Dosha (0 pts).
export const NAKSHATRA_NADI: Record<number, "Aadi" | "Madhya" | "Antya"> = {
  0: "Aadi", 1: "Madhya", 2: "Antya", 3: "Antya", 4: "Madhya", 5: "Aadi",
  6: "Aadi", 7: "Madhya", 8: "Antya", 9: "Antya", 10: "Madhya", 11: "Aadi",
  12: "Aadi", 13: "Madhya", 14: "Antya", 15: "Antya", 16: "Madhya", 17: "Aadi",
  18: "Aadi", 19: "Madhya", 20: "Antya", 21: "Antya", 22: "Madhya", 23: "Aadi",
  24: "Aadi", 25: "Madhya", 26: "Antya",
};
