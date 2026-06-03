import connectDB from "@/lib/mongodb";
import Address from "@/models/address.model";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { NextResponse } from "next/server";

export async function POST(req) {

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

    const body = await req.json();
    const {form} = body;

    const newAddress =
      await Address.create({
        user: userId,
        fullName: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      });

    return NextResponse.json({
      success: true,
      address: newAddress,
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
