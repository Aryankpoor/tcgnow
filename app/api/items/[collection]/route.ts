import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ collection: string }> } 
) {
  try {
    const params = await context.params;
    const collectionName = params.collection;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("cards");

    const items = await db
      .collection("topps")      
      .find({ collection: collectionName }) 
      .sort({ sno: 1 })         
      .toArray();

    console.log(`Items fetched for ${collectionName}:`, items.length);

    return NextResponse.json(items);
  } catch (err) {
    console.error("Failed to fetch items:", err);
    return NextResponse.json([], { status: 500 });
  }
}
