import connectDB from "@/lib/mongodb";
import plantModel from "@/models/plant.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { plantId } =await params;

    await connectDB();
    const getPlant = await plantModel.findById( plantId );
    if(!getPlant){
        return NextResponse.json({ message: "plant did not found", success: true },
      { status: 404 },)
    }
    return NextResponse.json(
      { message: "plant fetched successfully", success: true, plant: getPlant },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 },
    );
  }
}
