import "server-only";
import neo4j from "neo4j-driver";

const uri = process.env.NEO4J_URI;
const username = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

if (!uri || !username || !password) {
  throw new Error("Missing Neo4j environment variables.");
}

const globalForNeo4j = globalThis as typeof globalThis & {
  neo4jDriver?: ReturnType<typeof neo4j.driver>;
};

export const driver =
  globalForNeo4j.neo4jDriver ??
  neo4j.driver(uri, neo4j.auth.basic(username, password));

if (process.env.NODE_ENV !== "production") {
  globalForNeo4j.neo4jDriver = driver;
}

export const database = process.env.NEO4J_DATABASE || "neo4j";