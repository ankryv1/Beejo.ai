import connectDB from "@/lib/mongodb";
import Cart from "@/models/cart.model";
import plantModel from "@/models/plant.model";
import { NextResponse } from "next/server";

export async function POST(req) {

  await connectDB();

  try {

    const body = await req.json();

    const { userId, plantId } = body;
    if (!userId || !plantId) {
      return NextResponse.json(
        { message: "userId and plantId are required" },
        { status: 400 }
      );
    }

    const plantExists = await plantModel.findById(plantId);
    if (!plantExists) {
      return NextResponse.json(
        { message: "Plant not found" },
        { status: 404 }
      );
    }

    const cart = await Cart.findOne({
      user: userId
    });

    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    const existingPlant = cart.items.find(item => item.plant.toString() === plantId);

    if (existingPlant) {
      existingPlant.quantity += 1;
    } else {
      cart.items.push({ plant: plantId, quantity: 1 });
    }

    await cart.save();

    return NextResponse.json(
      { message: "Plant added to cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}