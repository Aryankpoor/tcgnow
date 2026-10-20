import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type CardEntry = {
  sno: number;
  card: string;
  type: string;
  subcollection: string;
  rarity: string;
  image?: string;
};

const cache: Record<string, CardEntry[]> = {};

export async function GET(
  req: Request,
  context: { params: Promise<{ collection: string; cardId: string }> }
) {
  try {
    const { collection, cardId } = await context.params;

    if (!cache[collection]) {
      const filePath = path.join(process.cwd(), "public", "data", collection, `${collection.toUpperCase()}.json`);
      const fileData = await fs.readFile(filePath, "utf-8");
      cache[collection] = JSON.parse(fileData) as CardEntry[];
    }

    const card = cache[collection].find(
      (c) => c.card.toLowerCase() === decodeURIComponent(cardId).toLowerCase()
    );

    if (!card) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (err) {
    console.error("Failed to fetch card:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
