export const adsConfig = {
  enabled: false,
  showPlaceholders: false,
  clientId: "",
} as const;

export type AdFormat = "banner" | "in-article" | "sidebar" | "mobile";

export const adSizes: Record<
  AdFormat,
  { width: number; height: number; label: string }
> = {
  banner: { width: 728, height: 90, label: "Leaderboard" },
  "in-article": { width: 300, height: 250, label: "In-article" },
  sidebar: { width: 300, height: 250, label: "Sidebar" },
  mobile: { width: 320, height: 100, label: "Mobile" },
};
