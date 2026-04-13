import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import connectDB from "./mongodb";
import userModel from "@/models/user.model";
import { NextResponse } from "next/server";
  
async function verifyUser() {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const decoded = await jwt.verify(token.value, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if(user.role=="USER")
         throw new Error("You are not an admin");
    return user;
}

export default verifyUser;