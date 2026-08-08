/**
 * Marriage Intelligence Platform — dimension registry
 * Metadata for the 15 dimensions: display name, report grouping, blurb.
 */
import { DimensionKey, DimensionMeta } from "./types";

export const DIMENSIONS: Record<DimensionKey, DimensionMeta> = {
  // Part I — who each person is
  big5: { key: "big5", name: "Personality", part: "portrait", blurb: "Core temperament across the Big Five traits." },
  character: { key: "character", name: "Character & Integrity", part: "portrait", blurb: "Who each person is when it costs something — honesty, humility, how they treat others." },
  attachment: { key: "attachment", name: "Attachment Style", part: "portrait", blurb: "How each person bonds and seeks security." },
  communication: { key: "communication", name: "Communication & EQ", part: "portrait", blurb: "How each expresses, listens, and regulates emotion." },
  conflict: { key: "conflict", name: "Conflict & Repair", part: "portrait", blurb: "What each does when you disagree." },

  // Part II — what each person wants
  values: { key: "values", name: "Core Values", part: "life", blurb: "What each person builds a life around." },
  money: { key: "money", name: "Money Mindset", part: "life", blurb: "Spending, saving, risk, and financial goals." },
  family: { key: "family", name: "Family & In-Laws", part: "life", blurb: "Parents, joint family, boundaries, obligations." },
  children: { key: "children", name: "Children & Parenting", part: "life", blurb: "Whether, when, and how to raise children." },
  career: { key: "career", name: "Career & Ambition", part: "life", blurb: "Drive, relocation, and work-life balance." },
  lifestyle: { key: "lifestyle", name: "Lifestyle", part: "life", blurb: "Health, daily rhythm, social life, and habits." },
  religion: { key: "religion", name: "Religion & Tradition", part: "life", blurb: "Faith, rituals, festivals, and community." },
  roles: { key: "roles", name: "Gender Roles & Household", part: "life", blurb: "How you'd divide home and money-earning." },
  intimacy: { key: "intimacy", name: "Intimacy & Affection", part: "life", blurb: "Closeness, affection, and how love is shown." },
  lifevision: { key: "lifevision", name: "Long-Term Vision", part: "life", blurb: "Where life is headed over 5–10 years." },
};

export const DIMENSION_ORDER: DimensionKey[] = [
  "big5", "character", "attachment", "communication", "conflict",
  "values", "money", "family", "children", "career",
  "lifestyle", "religion", "roles", "intimacy", "lifevision",
];
