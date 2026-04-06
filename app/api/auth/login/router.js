import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user.model";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const checkUser = await userModel.findOne({ email });
    if (!checkUser) {
      return NextRequest.json({ message: "User not found" }, { status: 400 });
    }
    const checkPass = await checkUser.checkPassword(password);
    if (!checkPass) {
      return NextRequest({ message: "Password is wrong" }, { status: 400 });
    }
    return NextResponse(
      { message: "User logged in successfully" },
      { status: 200 },
    );
  } catch (error) {
    req.NextResponse({ message: "Internal server Error" }, { status: 500 });
  }
}
