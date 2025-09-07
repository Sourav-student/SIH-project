import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db_conn";
import Place from "@/models/place_model";

export async function GET() {
  await dbConnect();
  const places = await Place.find();
  return NextResponse.json({ success: true, places });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { name, crowd } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Place name is required" },
        { status: 400 }
      );
    }

    const newPlace = await Place.create({
      name,
      crowd: crowd,
    });

    return NextResponse.json({ success: true, place: newPlace });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add place" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const { id, crowd } = await req.json();

  if (!id || !crowd) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const updated = await Place.findByIdAndUpdate(id, { crowd }, { new: true });
  return NextResponse.json({ success: true, place: updated });
}
