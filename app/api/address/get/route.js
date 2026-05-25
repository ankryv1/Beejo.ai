import connectDB from "@/lib/mongodb";
import Address from "@/models/address.model";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    await connectDB();

    const userId =
      await getUserFromToken();

    if (!userId) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const addresses =
      await Address.find({
        user: userId,
      });

    return NextResponse.json({
      success: true,
      addresses,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}