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
    const { name, crowd, info } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Place name is required" },
        { status: 400 }
      );
    }

    const newPlace = await Place.create({
      name,
      crowd: crowd || "Low",
      info: {
        placeInfo: info?.placeInfo || "",
        hospitals: info?.hospitals || [],
        temperature: info?.temperature || "",
        aqi: info?.aqi || "",
        hotels: info?.hotels || [],
        feedbacks: info?.feedbacks || [],
      },
    });

    console.log(newPlace);

    return NextResponse.json({ success: true, place: newPlace });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add place" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  await dbConnect();
  const { id, crowd, info } = await req.json();

  if (!id) {
    return NextResponse.json({ success: false, error: "Place ID is required" }, { status: 400 });
  }

  const place = await Place.findById(id);
  if (!place) {
    return NextResponse.json({ success: false, error: "Place not found" }, { status: 404 });
  }

  // Merge feedbacks if provided
  const updatedFeedbacks = info?.feedbacks
    ? [...place.info.feedbacks, ...info.feedbacks]
    : place.info.feedbacks;

  const updated = await Place.findByIdAndUpdate(
    id,
    {
      crowd: crowd || place.crowd,
      info: {
        placeInfo: info?.placeInfo || place.info.placeInfo,
        hospitals: info?.hospitals || place.info.hospitals,
        temperature: info?.temperature || place.info.temperature,
        aqi: info?.aqi || place.info.aqi,
        hotels: info?.hotels || place.info.hotels,
        feedbacks: updatedFeedbacks,
      },
    },
    { new: true }
  );

  return NextResponse.json({ success: true, place: updated });
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const { id } = await req.json();
    const deleted = await Place.findByIdAndDelete(id);

    if (!deleted) return NextResponse.json({ success: false, error: "Place not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Place deleted successfully" });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}