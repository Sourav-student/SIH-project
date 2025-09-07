import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Place name required" },
        { status: 400 }
      );
    }

    const query = encodeURIComponent(name);

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    return NextResponse.json({ success: true, url: mapsUrl });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
