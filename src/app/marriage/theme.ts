/**
 * Marriage Intelligence Platform — shared inline design tokens.
 * Warm archival paper + botanical teal-green accent + muted plum for the
 * second person. Reused across landing, questionnaire, and report.
 * (Inline-style tokens so the pages stay self-contained and match the
 * approved report mockup without touching global CSS.)
 */
export const T = {
  paper: "#f6f2ea",
  paper2: "#efe9dd",
  card: "#fffdf8",
  ink: "#211d17",
  inkSoft: "#4a453b",
  inkFaint: "#8b8477",
  rule: "#d9d0be",
  accent: "#1f6f5c",
  accentSoft: "#e3efe9",
  accentDeep: "#144a3d",
  a: "#1f6f5c", // person A — teal-green
  b: "#9a5b8f", // person B — muted plum
  strong: "#2f7d54",
  strongBg: "#e6f1e8",
  medium: "#b7822a",
  mediumBg: "#f6ecd6",
  discuss: "#b4552e",
  discussBg: "#f7e6dc",
  shadow: "0 1px 2px rgba(33,29,23,.06), 0 12px 32px rgba(33,29,23,.10)",
  serif: 'ui-serif, Georgia, "Iowan Old Style", "Palatino Linotype", serif',
  sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
} as const;

export const BRAND = "Before You Say Yes"; // placeholder product name
