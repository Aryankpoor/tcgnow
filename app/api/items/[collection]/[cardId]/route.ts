import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ collection: string; cardId: string }> }
) {
  try {
    const { collection, cardId } = await context.params;
    const client = await clientPromise;
    const db = client.db("cards");

    // Decode the card name from URL encoding (spaces, etc.)
    const decodedCardId = decodeURIComponent(cardId);

    const item = await db.collection("topps").findOne({
      collection,
      card: decodedCardId,
    });

    if (!item) {
      console.log(`Card not found for ${decodedCardId} in ${collection}`);
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (err) {
    console.error("Failed to fetch card:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
