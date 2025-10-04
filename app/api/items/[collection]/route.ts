import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params; // ✅ must await here

  const client = await clientPromise;
  const db = client.db("cards");

  const items = await db
    .collection("topps")
    .find({ collection })
    .sort({ sno: 1 })
    .toArray();

  return NextResponse.json(items);
}
