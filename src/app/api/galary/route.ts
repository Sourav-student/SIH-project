import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db_conn";
import cloudinary from "@/lib/cloudinary_conn";
import Galary from "@/models/galary_model";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";


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

    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "gallery" },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
              if (error) {
                reject(error);
              } else if (result) {
                resolve(result);
              } else {
                reject(new Error("Unknown Cloudinary upload error"));
              }
            }
          )
          .end(buffer);
      }
    );

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
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    console.error(err);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }

}

export async function GET() {
  try {
    await dbConnect();

    const data = await Galary.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: data.length,
      images: data,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    console.error(err);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    console.error(err);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}