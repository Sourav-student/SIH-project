import dbConnect from "@/lib/db_conn";
import User from "@/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import argon from "argon2";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { user_name, password } = await req.json();
    const user = await User.findOne({ user_name });

    //if user is not register even try to login
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email not found! Register first..."
      }, { status: 400 })
    }

    // register 
    if (!(await argon.verify(user.password, password))) {
      return NextResponse.json({
        success: false,
        message: "Password not matched!"
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Login successfully!",
      user_info: {
        user_name: user.user_name,
      }
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Try again later!"
    }, { status: 500 })
  }
}