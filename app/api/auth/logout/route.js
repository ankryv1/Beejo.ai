import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json({message: "Successfully Logged Out",  success: true}, {status: 200})
}
