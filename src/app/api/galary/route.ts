import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db_conn";
import cloudinary from "@/lib/cloudinary_conn";
import Galary from "@/models/galary_model";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const privacy = formData.get("privacy") as string;
    const user_name = formData.get("user_name") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }


    // Convert File -> Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "gallery" }, // folder in Cloudinary
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // Save only useful info to MongoDB
    const newImage = await Galary.create({
      image: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      privacy,
      user_name
    });

    return NextResponse.json({
      success: true,
      uploadResult,
      saved: newImage,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const data = await Galary.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: data.length,
      images: data,
    });
  } catch (error: any) {
    // console.error("GET /api/galary error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await Galary.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Delete image successfully"
    });
  } catch (error: any) {
    // console.error("GET /api/galary error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}