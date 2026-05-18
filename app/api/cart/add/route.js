import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Cart from "@/models/cart.model";
import Plant from "@/models/plant.model";
import { SHIPPING_DIMENSIONS } from "@/utils/shippingDimentions";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function POST(req) {
  

  try {
    await connectDB();
    const userId = await getUserFromToken();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized",success: false }, { status: 401 });
    }
    const body = await req.json();

    const { plantId, size, color, qty } = body;

    if (!plantId || !size || !qty || qty < 1) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // 2. No enum check — someone could send size: "XXXL"
    const VALID_SIZES = ["SMALL", "MEDIUM", "LARGE"];
    if (!VALID_SIZES.includes(size)) {
      return NextResponse.json({ message: "Invalid size" }, { status: 400 });
    }

    const plant = await Plant.findById(plantId);

    if (!plant) {
      return NextResponse.json({ message: "Plant not found" }, { status: 404 });
    }

    const selectedVariant = plant.variants.find(
      (variant) => variant.size === size,
    );
      if (!selectedVariant) { 
        return NextResponse.json({ message: "Selected variant not available" }, { status: 400 });
      } 
      if(selectedVariant.stock < qty){
        return NextResponse.json({ message: "Insufficient stock" }, { status: 400 });
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

  const totalQty =
    existingPlant.quantity + qty;

  if (
    totalQty >
    selectedVariant.stock
  ) {
    return NextResponse.json(
      {
        message:
          "Cannot add more than available stock",
      },
      { status: 400 }
    );
  }

  existingPlant.quantity = totalQty;

}
     else {
      cart.items.push({
        plant: plant._id,

        plantSnapshot: {
          plantName: plant.plantName,
          image: plant.images[0],
        },

        size,
        color,

        quantity: qty,

        originalPrice: selectedVariant.originalPrice,
        discountedPrice: selectedVariant.discountedPrice,

        shipping: SHIPPING_DIMENSIONS[size],
      });
    }

    await cart.save();

    return NextResponse.json(
      {
        message: "Plant added to cart successfully",
        success: true,
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
