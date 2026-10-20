import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
import fs from "node:fs";
import path from "node:path";
import neo4j from "neo4j-driver";

type CardRecord = {
  sno: number;
  card: string;
  type?: string;
  subcollection?: string;
  rarity?: string;
  position?: string;
  image?: string;
  collection: string;
  "collection-sno"?: number;
};


const uri = process.env.NEO4J_URI;
const username = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;
const database = process.env.NEO4J_DATABASE || "neo4j";

if (!uri || !username || !password) {
  throw new Error("Missing Neo4j environment variables.");
}

const filePath = path.join(
  process.cwd(),
  "public",
  "data",
  "dataset.json"
);

const data: unknown = JSON.parse(
  fs.readFileSync(filePath, "utf8")
);

const cards: CardRecord[] = Array.isArray(data)
  ? data as CardRecord[]
  : [];

if (cards.length === 0) {
  throw new Error("No card records found in public/data/dataset.json");
}

const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);

async function main() {
  const session = driver.session({ database });

  try {
    await session.run(`
      CREATE CONSTRAINT card_id_unique IF NOT EXISTS
      FOR (c:Card) REQUIRE c.id IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT collection_code_unique IF NOT EXISTS
      FOR (c:Collection) REQUIRE c.code IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT subcollection_name_unique IF NOT EXISTS
      FOR (s:Subcollection) REQUIRE s.name IS UNIQUE
    `);

    
  const records = cards.map((card) => ({
    id: `${card.collection}:${card.sno}`,
    sno: card.sno,
    card: card.card,
    type: card.type ?? null,
    subcollection: card.subcollection ?? "Uncategorized",
    rarity: card.rarity ?? null,
    position: card.position ?? null,
    image: card.image ?? null,
    collection: card.collection,
    collectionSno: card["collection-sno"] ?? null,
  }));


    const result = await session.executeWrite((tx) =>
      tx.run(
        `
        UNWIND $cards AS data

        MERGE (collection:Collection {code: data.collection})

        MERGE (subcollection:Subcollection {
          name: data.subcollection
        })

        MERGE (card:Card {id: data.id})
        SET card.sno = data.sno,
            card.name = data.card,
            card.type = data.type,
            card.rarity = data.rarity,
            card.position = data.position,
            card.image = data.image,
            card.collectionSno = data.collectionSno

        MERGE (collection)-[:CONTAINS]->(card)
        MERGE (card)-[:IN_SUBCOLLECTION]->(subcollection)

        RETURN count(card) AS processed
        `,
        { cards: records }
      )
    );

    console.log(
      `Successfully processed ${result.records[0].get("processed")} cards.`
    );
  } finally {
    await session.close();
    await driver.close();
  }
}

main().catch((error) => {
  console.error("Card import failed:", error);
  process.exitCode = 1;
});