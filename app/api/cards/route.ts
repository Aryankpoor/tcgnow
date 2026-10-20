import { NextRequest, NextResponse } from "next/server";
import { driver, database } from "@/lib/neo4j";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = driver.session({ database });

  try {
    const params = request.nextUrl.searchParams;

    const collection = params.get("collection")?.trim() ?? "";
    const subcollection = params.get("subcollection")?.trim() ?? "";
    const search = params.get("search")?.trim() ?? "";

    const rawLimit = Number(params.get("limit") ?? 100);
    const rawOffset = Number(params.get("offset") ?? 0);

    const limit = Number.isFinite(rawLimit)
      ? Math.min(200, Math.max(1, Math.floor(rawLimit)))
      : 100;

    const offset = Number.isFinite(rawOffset)
      ? Math.max(0, Math.floor(rawOffset))
      : 0;

    const result = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (collection:Collection)-[:CONTAINS]->(card:Card)
        MATCH (card)-[:IN_SUBCOLLECTION]->(sub:Subcollection)

        WHERE ($collection = '' OR collection.code = $collection)
          AND ($subcollection = '' OR sub.name = $subcollection)
          AND (
            $search = ''
            OR toLower(card.name) CONTAINS toLower($search)
            OR toLower(card.type) CONTAINS toLower($search)
            OR toLower(card.rarity) CONTAINS toLower($search)
          )

        RETURN
          card.id AS id,
          card.sno AS sno,
          card.name AS card,
          card.type AS type,
          sub.name AS subcollection,
          card.rarity AS rarity,
          card.position AS position,
          card.image AS image,
          collection.code AS collection,
          card.collectionSno AS collectionSno

        ORDER BY card.sno, card.name
        SKIP $offset
        LIMIT $limit
        `,
        { collection, subcollection, search, limit, offset }
      )
    );

    const cards = result.records.map((record) => ({
      id: record.get("id"),
      sno: record.get("sno"),
      card: record.get("card"),
      type: record.get("type"),
      subcollection: record.get("subcollection"),
      rarity: record.get("rarity"),
      position: record.get("position"),
      image: record.get("image"),
      collection: record.get("collection"),
      "collection-sno": record.get("collectionSno"),
    }));

    return NextResponse.json({ cards });
  } catch (error) {
    console.error("Failed to retrieve cards:", error);

    return NextResponse.json(
      { error: "Unable to retrieve cards." },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}