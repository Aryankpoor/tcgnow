
import { NextRequest, NextResponse } from "next/server";
import { driver, database } from "@/lib/neo4j";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toSafeNumber(value: unknown): number | null {
  if (value == null) return null;

  if (
    typeof value === "object" &&
    "toNumber" in value &&
    typeof value.toNumber === "function"
  ) {
    return value.toNumber();
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export async function POST(request: NextRequest) {
  
let collections: string[];

try {
  const body: unknown = await request.json();

  if (
    typeof body !== "object" ||
    body === null ||
    !("collections" in body) ||
    !Array.isArray(body.collections)
  ) {
    return NextResponse.json(
      { error: "Provide an array of collection codes." },
      { status: 400 }
    );
  }

  collections = [
    ...new Set(
      body.collections
        .filter(
          (code: unknown): code is string =>
            typeof code === "string"
        )
        .map((code: string) => code.trim())
        .filter(Boolean)
    ),
  ];
} catch {
  return NextResponse.json(
    { error: "Invalid JSON request." },
    { status: 400 }
  );
}


  if (collections.length < 2) {
    return NextResponse.json(
      { error: "Select at least two collections to compare." },
      { status: 400 }
    );
  }

  if (collections.length > 20) {
    return NextResponse.json(
      { error: "You can compare up to 20 collections at once." },
      { status: 400 }
    );
  }

  const session = driver.session({ database });

  try {
    const result = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (collection:Collection)-[:CONTAINS]->(card:Card)
        WHERE collection.code IN $collections

        WITH
          toLower(trim(card.name)) AS matchKey,
          card.name AS cardName,
          collection.code AS collectionCode,
          collect({
            id: card.id,
            sno: card.sno,
            collectionSno: card.collectionSno,
            type: card.type,
            rarity: card.rarity,
            position: card.position,
            image: card.image
          }) AS cardDetails

        WITH
          matchKey,
          collect(DISTINCT cardName) AS names,
          collect({
            collection: collectionCode,
            cards: cardDetails
          }) AS appearances,
          collect(DISTINCT collectionCode) AS matchedCollections

        WHERE size(matchedCollections) = size($collections)

        RETURN
          head(names) AS card,
          appearances

        ORDER BY toLower(head(names))
        `,
        { collections }
      )
    );

    const commonCards = result.records.map((record) => {
      const appearances = record.get("appearances") as Array<{
        collection: string;
        cards: Array<Record<string, unknown>>;
      }>;

      return {
        card: String(record.get("card") ?? ""),
        appearances: appearances.map((appearance) => ({
          collection: appearance.collection,
          cards: appearance.cards.map((item) => ({
            id: String(item.id ?? ""),
            sno: toSafeNumber(item.sno),
            collectionSno: toSafeNumber(item.collectionSno),
            type: String(item.type ?? "—"),
            rarity: String(item.rarity ?? "—"),
            position: String(item.position ?? "—"),
            image: String(item.image ?? ""),
          })),
        })),
      };
    });

    return NextResponse.json({
      collections,
      total: commonCards.length,
      commonCards,
    });
  } catch (error) {
    console.error("Collection comparison failed:", error);

    return NextResponse.json(
      { error: "Unable to compare collections." },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}
