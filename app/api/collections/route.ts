
import { NextResponse } from "next/server";
import { driver, database } from "@/lib/neo4j";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = driver.session({ database });

  try {
    const result = await session.executeRead((tx) =>
      tx.run(`
        MATCH (collection:Collection)-[:CONTAINS]->(card:Card)
        RETURN collection.code AS code, count(card) AS cardCount
        ORDER BY code
      `)
    );

    const collections = result.records.map((record) => {
      const code = String(record.get("code"));

      return {
        code,
        cardCount: record.get("cardCount").toNumber(),
      };
    });

    return NextResponse.json({ collections });
  } catch (error) {
    console.error("Failed to retrieve collections:", error);

    return NextResponse.json(
      { error: "Unable to retrieve collections." },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}
