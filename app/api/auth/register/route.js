import connectDB from "@/lib/mongodb";
import userModel from "@/models/user.model.js";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){

    await connectDB();
    const {email, password, name} = await req.json();
    const checkIfExisting = await userModel.findOne({email});
    if(checkIfExisting){
        return NextResponse.json({message:"User exists with this email"}, {status:400});
    }
    
    const newUser = await userModel.create({email, password, name});
    const token =  jwt.sign({userId: newUser._id}, process.env.JWT_SECRET,{expiresIn:'5d'});
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true, path: "/"
    })
    return NextResponse.json({message:"Account created successfully" ,user: {name:newUser.name, email: newUser.email, role: newUser.role}}, {status:201})

}