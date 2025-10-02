import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ collection: string }> }
) {
  try {
    const params = await context.params; // await the promise
    const client = await clientPromise;
    const db = client.db("cards");

    // Use the dynamic collection parameter
    const items = await db
      .collection("topps")
      .find({ collection: params.collection })
      .sort({ sno: 1 })
      .toArray();

    console.log("Items fetched:", items.length);

    return NextResponse.json(items);
  } catch (err) {
    console.error("Failed to fetch items:", err);
    return NextResponse.json([], { status: 500 });
  }
}
