import connectDB from "@/lib/mongodb";
import {NextResponse } from "next/server";
import userModel from "@/models/user.model";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const checkUser = await userModel.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const checkPass = await checkUser.comparePassword(password);
    if (!checkPass) {
      return NextResponse.json({ message: "Password is wrong" }, { status: 400 });
    }
    const token = jwt.sign({userId: checkUser._id}, process.env.JWT_SECRET,{expiresIn:'5d'});
    const cookieStore = await cookies();
    cookieStore.set("token", token, {httpOnly: true, path:"/"});
    return NextResponse.json(
      { message: "User logged in successfully" ,user: {name:checkUser.name, email: checkUser.email, role: checkUser.role}},
      { status: 200 }
    );
  } catch (error) {
   return NextResponse.json({ message: "Internal server Error" }, { status: 500 });
  }
}

