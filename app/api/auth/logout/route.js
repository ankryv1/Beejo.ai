import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const cookieStore = await cookies();
    cookieStore.set(null);
    return NextResponse.json({message: "Successfully Logged Out"}, {status: 200})
}
