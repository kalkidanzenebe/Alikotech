export const offices = [
  {
    label: "United States",
    address: "19550 International Blvd Suite STE 301, SeaTac, WA 98188",
  },
  {
    label: "Ethiopia",
    address: "Addis Ababa, Bole Dembel, Tigi's Building, 12th Floor",
  },
];

// Placeholder social links. Replace the URLs once the official profiles are live.
export const socials = [
  { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/company/alikotech" },
  { name: "X", icon: "x", url: "https://x.com/alikotech" },
  { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/alikotech" },
  { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/alikotech" },
  { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@alikotech" },
] as const;

// Placeholder LinkedIn profile URL used until each person's real profile is provided.
export const linkedinPlaceholder = (name: string) =>
  `https://www.linkedin.com/in/${name
    .toLowerCase()
    .replace(/,.*$/, "")
    .replace(/[^a-z\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")}`;
