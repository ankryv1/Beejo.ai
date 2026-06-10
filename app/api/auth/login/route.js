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
      return NextResponse.json({ message: "User not found" , success:false}, { status: 400 });
    }
    if (checkUser.provider === "google") {
  return NextResponse.json(
    {
      success: false,
      message: "This account uses Google Sign-In. Please continue with Google."
    },
    { status: 400 }
  );
}
    const checkPass = await checkUser.comparePassword(password);
    if (!checkPass) {
      return NextResponse.json({ message: "Password is wrong" , success: false}, { status: 400 });
    }
    const token = jwt.sign({userId: checkUser._id}, process.env.JWT_SECRET,{expiresIn:'5d'});
    const cookieStore = await cookies();
    cookieStore.set("token", token, {httpOnly: true, path:"/", maxAge: 60 * 60 * 24 * 7});
    return NextResponse.json(
      { message: "User logged in successfully" ,user: {name:checkUser.name, email: checkUser.email, role: checkUser.role}, success: true},
      { status: 200 }
    );
  } catch (error) {
   return NextResponse.json({ message: "Internal server Error" , success: false}, { status: 500 });
  }
}

