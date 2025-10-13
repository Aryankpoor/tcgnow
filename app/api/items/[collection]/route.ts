import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(
  req: Request,
  context: { params: Promise<{ collection: string }> } // note: params is a Promise
) {
  try {
    // await the params promise
    const { collection } = await context.params;

    // build path to your JSON file
    const filePath = path.join(process.cwd(), "images", collection, `${collection}.json`);

    // read the JSON file
    const fileData = await fs.readFile(filePath, "utf-8");
    const items = JSON.parse(fileData);

    return NextResponse.json(items);
  } catch (err) {
    console.error("Failed to fetch items:", err);
    return NextResponse.json([], { status: 500 });
  }
}
