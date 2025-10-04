// lib/collections.ts
export type Collection = {
  name: string;
  slug: string;
  group: "Topps UCC" | "Topps Match Attax" | "Topps Cricket Attax";
  comingSoon?: boolean;
};

export const collections: Collection[] = [
  // ✅ Topps UCC
  { name: "Match Attax 24/25 Extra", slug: "match-attax-24-25-extra", group: "Topps UCC" },
  { name: "Match Attax 24/25", slug: "match-attax-24-25", group: "Topps UCC" },
  { name: "Match Attax 23/24 Extra", slug: "match-attax-23-24-extra", group: "Topps UCC" },
  { name: "Match Attax 23/24", slug: "match-attax-23-24", group: "Topps UCC" },
  { name: "Match Attax 22/23 Extra", slug: "match-attax-22-23-extra", group: "Topps UCC" },
  { name: "Match Attax 22/23", slug: "match-attax-22-23", group: "Topps UCC" },
  { name: "Match Attax 21/22", slug: "match-attax-21-22", group: "Topps UCC", comingSoon: true },

  // ✅ Topps Match Attax
  { name: "Match Attax 20/21", slug: "match-attax-20-21", group: "Topps Match Attax", comingSoon: true },
  { name: "Match Attax 19/20", slug: "match-attax-19-20", group: "Topps Match Attax" },
  { name: "Match Attax 18/19", slug: "match-attax-18-19", group: "Topps Match Attax", comingSoon: true },
  { name: "Match Attax 16/17 UCL", slug: "match-attax-16-17-ucl", group: "Topps Match Attax" },

  // ✅ Topps Cricket Attax
  { name: "Cricket Attax 2011", slug: "cricket-attax-2011", group: "Topps Cricket Attax", comingSoon: true },
];
