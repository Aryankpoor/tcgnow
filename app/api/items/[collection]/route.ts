import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { collection: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("cards");

    // ✅ Fetch only docs where collection matches the route param
    const items = await db
      .collection("topps")
      .find({ collection: params.collection })
      .sort({ sno: 1 })
      .toArray();

    return NextResponse.json(items);
  } catch (err) {
    console.error("Failed to fetch items:", err);
    return NextResponse.json([], { status: 500 });
  }
}
