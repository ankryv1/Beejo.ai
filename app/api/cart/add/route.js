import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Cart from "@/models/cart.model";
import Plant from "@/models/plant.model";
import { SHIPPING_DIMENSIONS } from "@/utils/shippingDimentions";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    const { userId, plantId, size, color, qty } = body;

    // Find plant
    const plant = await Plant.findById(plantId);

    if (!plant) {
      return NextResponse.json({ message: "Plant not found" }, { status: 404 });
    }

    // Find or create cart
    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    // Match same variant
    const existingPlant = cart.items.find(
      (item) =>
        item.plant.toString() === plantId &&
        item.size === size &&
        item.color === color,
    );

    if (existingPlant) {
      existingPlant.quantity += qty;
    } else {
      cart.items.push({
        plant: plant._id,

        plantSnapshot: {
          plantName: plant.name,
          image: plant.images[0],
        },

        size,
        color,

        quantity: qty,

        originalPrice: plant.originalPrice,

        discountedPrice: plant.discountedPrice,

        shipping: 
          SHIPPING_DIMENSIONS[size]
        
      });
    }

    await cart.save();

    return NextResponse.json(
      {
        message: "Plant added to cart successfully",
        cart,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
