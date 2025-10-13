import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type CardEntry = {
  sno: string;
  card: string;
  type: string;
  subcollection: string;
  rarity: string;
  image?: string;
};

// In-memory cache with proper type
const collectionsCache: Record<string, CardEntry[]> = {};

export async function GET(
  req: Request,
  context: { params: Promise<{ collection: string; cardId: string }> }
) {
  try {
    const { collection, cardId } = await context.params;

    // Check cache first
    if (!collectionsCache[collection]) {
      const filePath = path.join(process.cwd(), "images", collection, `${collection}.json`);
      const fileData = await fs.readFile(filePath, "utf-8");
      collectionsCache[collection] = JSON.parse(fileData) as CardEntry[];
    }

    const items = collectionsCache[collection];

    // Find the requested card
    const card = items.find(
      (c) => c.card.toLowerCase() === decodeURIComponent(cardId).toLowerCase()
    );

    if (!card) return NextResponse.json({ message: "Card not found" }, { status: 404 });

    return NextResponse.json(card);
  } catch (err) {
    console.error("Failed to fetch card:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
