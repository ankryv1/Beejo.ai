import connectDB from "@/lib/mongodb";
import userModel from "@/models/user.model";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import {   NextResponse } from "next/server";

export async function POST(req){

    await connectDB();
    const {email, password, name} = await req.json();
    const checkIfExisting = await userModel.findOne({email});
    if(checkIfExisting){
        return NextResponse.json({message:"User exists with this email"}, {status:400})
    }
    
    const newUser = await userModel.create({email, password, name});
    const token =  jwt.sign({userId: newUser._id}, process.env.JWT_SECRET,{expiresIn:'5d'});
    cookies().set("token", token)
    return NextResponse.json({message:"Account created successfully"}, {status:201})

}