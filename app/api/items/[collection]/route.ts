import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(
  req: Request,
  context: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await context.params;
    const filePath = path.join(process.cwd(), "public", "data", collection, `${collection.toUpperCase()}.json`);
    const fileData = await fs.readFile(filePath, "utf-8");
    const items = JSON.parse(fileData);
    return NextResponse.json(items);
  } catch (err) {
    console.error("Failed to fetch items:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
