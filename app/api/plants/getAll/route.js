import connectDB from "@/lib/mongodb";
import plantModel from "@/models/plant.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const query = {};

    if (category) {
      query.category = category;
    }
    const allPlants = await plantModel.find(query);
    if (allPlants.length == 0) {
      return NextResponse.json(
          {message: "No palnts found", success: true, plants:[]}, {status: 200}
      )
    }
    return NextResponse.json(
      {
        message: "Plants Fetched Successfully",
        success: true,
        plants: allPlants,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({message: error.message, success: false}, {status: 500})
  }
}
