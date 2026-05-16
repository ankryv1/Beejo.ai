import connectDB from "@/lib/mongodb";
import userModel from "@/models/user.model";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req){

    await connectDB();
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if(!token){
            return NextResponse.json({message:"Not Authenticated ,Login again", success: false}, {status:404})
        }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({_id: decoded.userId}).select("-password");
    return NextResponse.json({message:"got me successful", user: user, success: true}, {status:200});
    } catch (error) {
        return NextResponse.json({message:"Session Expired", success: false}, {status: 401})
    }
    
}
