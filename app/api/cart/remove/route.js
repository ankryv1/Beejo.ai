import { getUserFromToken } from "@/lib/getUserFromToken";
import Cart from "@/models/cart.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {

  try {

    await connectDB();

    const { id } =
      await req.json();

    const userId =
      await getUserFromToken();

    if (!userId) {

      return NextResponse.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 }
      );
    }

    const updatedCart =
      await Cart.findOneAndUpdate(
        {
          user: userId,
        },
        {
          $pull: {
            items: {
              _id: id,
            },
          },
        },

        { new: true }
      );

    if (!updatedCart) {

      return NextResponse.json(
        {
          message: "Cart not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Product removed from cart",

        success: true,
      },
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};