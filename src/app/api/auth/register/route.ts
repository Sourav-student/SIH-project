import dbConnect from "@/lib/db_conn";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user_model";
import argon from 'argon2';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { email, user_name, password } = await req.json();
    const hash_password = await argon.hash(password);
    // const hash_email = await argon.hash(email);
    // Check if email exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json({
        success: false,
        message: "User already exists, please login"
      }, { status: 400 });
    }

    // Check if username exists
    const existingUserByUsername = await User.findOne({ user_name });
    if (existingUserByUsername) {
      return NextResponse.json({
        success: false,
        message: "Username is already taken"
      }, { status: 400 });
    }

    // Create new user
    await User.create({ email, user_name, password : hash_password});

    return NextResponse.json({
      success: true,
      message: "Registered successfully!"
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Try again later!"
    }, { status: 500 });
  }
}