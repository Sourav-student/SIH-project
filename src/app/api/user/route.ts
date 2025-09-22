import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user_model";
import dbConnect from "@/lib/db_conn";
import cloudinary from "@/lib/cloudinary_conn";
import { UploadApiResponse } from "cloudinary";

//patch data
export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const user_name = formData.get("user_name") as string;
    const name = formData.get("name") as string;
    const phone_no = formData.get("phone_no") as string;
    const file = formData.get("file") as File | null;

    if (!user_name) {
      return NextResponse.json({ error: "user_name is required" }, { status: 400 });
    }

    let imageUrl: string | undefined;

    if (file) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const upload = await new Promise<UploadApiResponse>((resolve, reject) =>
        cloudinary.uploader
          .upload_stream({ folder: "gallery" }, (err, result) => {
            if (err || !result) return reject(err);
            resolve(result);
          })
          .end(buffer)
      );
      imageUrl = upload.secure_url;
    }

    const updated = await User.findOneAndUpdate(
      { user_name },
      {
        ...(name && { name }),
        ...(phone_no && { phone_no }),
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    ).select("user_name name phone_no image email");

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

//get user info
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_name = searchParams.get("user_name");

    if (!user_name) {
      return NextResponse.json(
        { error: "user_name is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ user_name }).select(
      "user_name email phone_no image name role"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile fetched successfully", data: user },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}